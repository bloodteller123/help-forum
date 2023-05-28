import axios from "axios";

const client = () => {
  const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:3333/api";
  // Create instance
  let instance = axios.create({
    baseURL,
  });
//https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors
//https://stackoverflow.com/a/47851585/13062745
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    // console.log(token)
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default client();