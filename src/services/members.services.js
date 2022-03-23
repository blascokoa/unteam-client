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

export const addMemberFromUserService = (data) => {
  return service.post("/addmember", data);
};

export const deleteMemberFromUserService = (data) => {
  return service.delete("/deletemember", { data: { data } });
};

export const getMembersFromClubService = (data) => {
  console.log("requesting the list of club members");
  return service.get("/getmemberslcub", data);
};
