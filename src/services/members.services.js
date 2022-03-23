import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/members`,
});

service.interceptors.request.use((config) => {
  // aqui buscamos el token en localstorage
  const storedToken = localStorage.getItem("authToken");
  // si el toke existe lo agregamos a los headers del request
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  // el condicional abajo hace lo mismo que arriba
  // if (storedToken) {
  //   config.headers = { Authorization: `Bearer ${storedToken}` }
  // }
  return config;
});

export const getMembersFromUserService = () => {
  return service.get("/getmembers");
};
