import axios from "axios";

const api_URL = "http://localhost:4500";


export const addTaskk = async (body) => {
  return await axios.post(api_URL+"/Task-Data", body);
};

export const getTask = async () => {
  return await axios.get(api_URL+"/Task-Data");
};
export const deleteTask =  (id) => {
  console.log('delete' , id);
  return  axios.delete(api_URL + "/Task-Data/" + id);
};




export const createUser = async (body) => {
  return await axios.post(api_URL+"/user-Data", body);
};
export const getUser = async () => {
  return await axios.get(api_URL+"/user-Data");
};