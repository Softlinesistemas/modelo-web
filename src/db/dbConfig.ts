import { extractServer } from "@/helpers/extractServer";
import { getServerConfig } from "@/db/getServerConfig";

interface Connection {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const dbConfig = (email: string) => {
    const serverName = extractServer(email);
    const serverConfig = getServerConfig(serverName);

    const dbConfig: Connection = {
      host: serverConfig.DataSource.split(",")[0],
      user: serverConfig.Uid,
      password: serverConfig.Pwd,
      database: serverConfig.Catalog,
      port: Number(serverConfig.DataSource?.split(",")[1]),
    };

    return dbConfig
}

export default dbConfig;
