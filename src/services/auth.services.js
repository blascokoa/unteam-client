import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
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

// localhost:5005/api/auth/signup/club
export const signupClubService = (user) => {
  return service.post("/signup/club", user);
};

export const signupMemberService = (user) => {
  return service.post("/signup/member", user);
};

export const verifyEmail = (code) => {
  return service.post("/signup/email-confirm", code);
};

export const recoverPasswordService = (user) => {
  return service.post("/recover-password", user);
};

export const newPasswordService = (data) => {
  return service.post("/new-password", data);
};

export const checkCodeRecoverPassword = (code) => {
  return service.post("/recover-code", { code: code });
};

export const loginService = (user) => {
  console.log("Inside login service");
  return service.post("/login", user);
};

export const verifyService = () => {
  return service.get("/verify-token");
};
