"use client"; 

import { useState } from "react";
import styles from "../page.module.css";

type Companie = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  dataCriacao: string;
  dataAtualizacao: string;
  statusRegistro: number;
};

type Props = {
  companies: Companie[];
};

export default function CompanieTable({ companies }: Props) {
  const [selectedCompany, setSelectedCompany] = useState<Companie | null>(null);
  const [formData, setFormData] = useState<Companie | null>(null);

  const handleClick = (company: Companie) => {
    setSelectedCompany(company);
    setFormData(company);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData) return;
    console.log("Dados salvos:", formData);
    setSelectedCompany(formData); 
    alert("Alterações salvas com sucesso!");
  };

  return (
    <div className={styles.container}>
        <div className={styles.tableContainer}>
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

      <div>
        {formData && (
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

            <label>
              Status:
              <input
                type="number"
                name="statusRegistro"
                value={formData.statusRegistro}
                onChange={handleChange}
              />
            </label>

            <button onClick={handleSave} style={{ marginTop: "1rem" }}>
              Salvar
            </button>
          </div>
        )}
        </div>
      </div>
  );
}
