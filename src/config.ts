import 'dotenv/config'

// Parsing the env file.

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all
console.log("env: ",process.env)
interface ENV {
    POSTGRES_PORT: number | undefined;
    POSTGRES_URI: string | undefined;
    POSTGRES_USER:string | undefined
    POSTGRES_USER_PASS:string | undefined
    POSTGRESS_DATABASE:string | undefined
    APP_PORT:number | undefined
    ADMIN_EMAIL:string | undefined
    ADMIN_PASSWORD:string | undefined
    ADMIN_NAME:string | undefined
    JWT_SECRECT:string | undefined
  }


interface Config {
  POSTGRES_PORT: number;
  POSTGRES_URI: string;
  POSTGRES_USER:string
  POSTGRES_USER_PASS:string
  POSTGRESS_DATABASE:string
  APP_PORT:number
  ADMIN_EMAIL:string
  ADMIN_PASSWORD:string
  JWT_SECRECT:string
  ADMIN_NAME:string 
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,
    POSTGRES_URI: process.env.POSTGRES_URI || "localhost",
    POSTGRES_USER: process.env.POSTGRES_USER || "eliran",
    POSTGRES_USER_PASS: process.env.POSTGRES_USER_PASS || "admin",
    POSTGRESS_DATABASE: process.env.POSTGRESS_DATABASE || "aradng",
    APP_PORT: Number(process.env.APP_PORT) || 3000,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@email.com",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "secretpass",
    JWT_SECRECT:process.env.JWT_SECRECT || "supersecrectssh" ,
    ADMIN_NAME:process.env.ADMIN_NAME || "admin"
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const AppConfig = getSanitzedConfig(config);

export default AppConfig;
