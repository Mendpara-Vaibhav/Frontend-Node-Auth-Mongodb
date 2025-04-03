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

export const getProduct = () => {
  return api.get("/product");
};

export const deleteProduct = (id) => {
  return api.delete(`/delete/product/${id}`);
};

export const postProduct = (product) => {
  return api.post("/add/product", product);
};

export const updatesProduct = (id, product) => {
  return api.put(`/update/product/${id}`, product);
};
