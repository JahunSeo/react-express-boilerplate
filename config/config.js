module.exports = {
  // development: {
  //   dialect: "sqlite",
  //   storage: "./db.development.sqlite"
  // },
  // test: {
  //   dialect: "sqlite",
  //   storage: ":memory:"
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOSTNAME,
  //   dialect: "mysql",
  //   use_env_variable: "DATABASE_URL"
  // }

  development: {
    db: {
      database: "",
      host: "",
      username: "",
      password: "",
      dialect: "mysql",
      forceSync: false,
      alter: false
    }
  },
  test: {
    db: {
      database: "",
      host: "",
      username: "",
      password: "",
      dialect: "mysql",
      forceSync: false,
      alter: false
    }
  },
  production: {
    db: {
      database: "",
      host: "",
      username: "",
      password: "",
      dialect: "mysql",
      forceSync: false,
      alter: false
    }
  }
};
