"use client";
import styles from "./page.module.css";
import CompanieTable from "./components/CompanieTable";
import { fetcher } from "./services/api";
import { useState, useEffect } from "react";

type Companie = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  dataCriacao: string;
  dataAtualizacao: string;
  statusRegistro: string;
};

export default function Home() {
  const [companies, setCompanies] = useState<Companie[]>([]);

   const fetchCompanies = async () => {
    try {
      const data = await fetcher("/companies");
      setCompanies(data);
    } catch (err) {
      console.error(err);
      alert("Falha ao carregar empresas");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <CompanieTable companies={companies} onRefresh={fetchCompanies} />
      </div>
    </main>
  );
}