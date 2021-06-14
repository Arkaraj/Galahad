module.exports = [
  {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: `${process.env.SQL_Username}`,
    password: `${process.env.SQL_Password}`,
    database: `${process.env.SQL_Database}`,
    synchronize: false,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];
