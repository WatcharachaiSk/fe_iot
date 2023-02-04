const REACT_ENVIRONMENT = "dev";
const APP_API_URL_DEV = "http://localhost:3200/api";
const APP_API_URL_PROD = "";
export const baseURL =
  REACT_ENVIRONMENT === "dev" ? APP_API_URL_DEV : APP_API_URL_PROD;

// TODO console.log(`*${env.REACT_ENVIRONMENT}* Environments\nBaseURL : ${baseURL}`);
