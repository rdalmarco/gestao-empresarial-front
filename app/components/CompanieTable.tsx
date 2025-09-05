"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { fetcher } from "../services/api";

type Companie = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  dataCriacao: string;
  dataAtualizacao: string;
  statusRegistro: string;
};

type Props = {
  companies: Companie[];
  onRefresh: () => void; 
};

export default function CompanieTable({ companies, onRefresh }: Props) {
  const [selectedCompany, setSelectedCompany] = useState<Companie | null>(null);
  const [formData, setFormData] = useState<Companie>({
    id: "",
    cnpj: "",
    razaoSocial: "",
    email: "",
    statusRegistro: "",
    dataCriacao: "",
    dataAtualizacao: "",
  });

  const handleClick = (company: Companie) => {
    setSelectedCompany(company);
    setFormData(company);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    if (!formData) return;
    try {
    const res = await fetcher("/companies", { method: "POST", body: formData });
      if (res.status !== 201) throw new Error("Erro ao criar empresa");
      alert("Empresa criada com sucesso!");
      onRefresh();
  } catch (err: any) {
    alert(`${err.detail}`);
  }
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const bodyToSend = {
      ...formData,
      statusRegistro: formData.statusRegistro === "Ativa" ? 1 : 0,
    };


    const res = await fetcher(`/companies/${formData.id}`, { method: "PUT", body: bodyToSend });
    if (res.status !== 200) throw new Error("Erro ao salvar empresa");
      alert("Empresa atualizada com sucesso!");
      setSelectedCompany(formData);
      onRefresh();
   } catch (err: any) {
    alert(`${err.detail}`);
   }
  };

  const handleDelete = async () => {
    if (!formData) return;
    try {
      const res = await fetcher(`/companies/${formData.id}`, { method: "DELETE" });
      if (res.status !== 200) throw new Error("Erro ao deletar empresa");
      alert("Empresa deletada com sucesso!");
      setSelectedCompany(null);
      handleClear();
      onRefresh();
    } catch (err: any) {
      alert(`${err.detail}`);
    }
  };

    const handleClear = () => {
    setSelectedCompany(null);
    setFormData({
      id: "",
      cnpj: "",
      razaoSocial: "",
      email: "",
      statusRegistro: "",
      dataCriacao: "",
      dataAtualizacao: "",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((companie) => (
              <tr
                key={companie.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(companie)}
              >
                <td>{companie.cnpj}</td>
                <td>{companie.razaoSocial}</td>
                <td>{companie.email}</td>
                <td>{companie.statusRegistro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.forms}>
          <h2>Editar Empresa</h2>

          <label>
            Razão Social:
            <input
              type="text"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleChange}
            />
          </label>

          <label>
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={handleCreate}>Criar</button>
            <button onClick={handleSave}>Salvar</button>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: "#f44336" }}
            >
              Deletar
            </button>
            <button onClick={handleClear} style={{ backgroundColor: "#9e9e9e" }}>
              Limpar
            </button>
          </div>
        </div>
    </div>
  );
}
