import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/publications`,
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

export const getPublicationsService = () => {
  return service.get("/getpublications");
};

export const addPublicationService = (data) => {
  return service.post("/addpublication", data);
};

export const deleteManyPublicationsService = (data) => {
  return service.post("/deletemanypublications", data);
};

export const getReadersService = () => {
  return service.get("/getreaders");
};

export const addReaderService = (data) => {
  return service.post("/addreader", data);
};
