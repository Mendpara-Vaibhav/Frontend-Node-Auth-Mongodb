import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// get method
export const getUser = () => {
  return api.get("/user");
};

// delete method
export const deleteUser = (id) => {
  return api.delete(`/delete/user/${id}`);
};

// post method
export const postData = (user) => {
  return api.post("/add/user", user);
};

//put method
export const updateData = (id, user) => {
  return api.put(`/update/user/${id}`, user);
};

export const postEmail = (user) => {
  return api.post("/send-email", user);
};
