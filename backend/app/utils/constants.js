var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const dataToken = {
  signature: "Copywrite registered @2023",
};

const ERROR_LOGIN_RESPONSE = {
  access: false,
  error: "Usuario o contraseña incorrecto",
};

const DONE_LOGIN_RESPONSE = {
  access: true,
  data: "",
};

const ERROR_PROPS_RESPONSE = {
  error: true,
  message: "The required data has not been received o format is not valid",
};

const ERROR_QUERY_RESPONSE = {
  error: true,
  message: "Has been an error to execute the query.",
};

module.exports = {
  corsOptions,
  ERROR_LOGIN_RESPONSE,
  DONE_LOGIN_RESPONSE,
  ERROR_QUERY_RESPONSE,
  ERROR_PROPS_RESPONSE,
  dataToken,
};
