import styles from "./page.module.css";
import CompanieTable from "./components/CompanieTable";
import { fetcher } from "./services/api";

type Companie = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  dataCriacao: string;
  dataAtualizacao: string;
  statusRegistro: number;
};

export default async function Home() {
  const companies = await fetcher("/companies");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <CompanieTable companies={companies} />
      </div>
    </main>
  );
}