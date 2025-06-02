import knex from "knex";

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const getDBConnection = (config: DBConfig) => {
  return knex({
    client: "mssql",
    connection: {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      port: Number(config.port),
    },
  });
}

export default getDBConnection;
