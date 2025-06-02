interface connProps {
    DataSource: string;
    Catalog: string;
    Uid: string;
    Pwd: string;
    Projeto?: string;
    PastaFoto?: string;
    ExibeFoto?: string;
}

export function getServerConfig(server: string) {
  let config: connProps = {
    DataSource: "",
    Catalog: "",
    Uid: "",
    Pwd: "",
    Projeto: "",
    PastaFoto: "",
    ExibeFoto: ""
  };
  
    config = {
      DataSource: `${process.env.DB_HOST},${process.env.DB_PORT}`"177.136.205.57,2974",
      Catalog: process.env.DB_NAME,
      Uid: process.env.DB_USER,
      Pwd: process.env.DB_PSWD,
    };

  return config;
}
