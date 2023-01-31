import axios from 'axios';

const base = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_DEPLOYED_URL,
  baseURL: "https://restrox-fullonline-backend-jstzp.ondigitalocean.app/restrox/api",
  timeout: 50000,
});
export default base;

//  Test: 
// https://testbackend.restrox.co/restrox/api
// Production 
//https://restrox-fullonline-backend-jstzp.ondigitalocean.app/restrox/api
