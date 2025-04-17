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

export const getProduct = (page = 1, limit = 3) => {
  return api.get(`/product?page=${page}&limit=${limit}`);
};

export const deleteProduct = (id) => {
  return api.delete(`/delete/product/${id}`);
};

export const postProduct = (formData) => {
  return api.post("/add/product", formData);
};

export const updatesProduct = (id, formData) => {
  return api.put(`/update/product/${id}`, formData);
};

export const getProductDetail = (id) => {
  return api.get(`/product/${id}`);
};

export const userRegister = (user) => {
  return api.post("/auth/signup", user);
};

export const userLogin = (info) => {
  return api.post("/auth/signin", info);
};

export const createRazorpayOrder = (amount) => {
  return api.post("/create-razorpay-order", { amount });
};

export const userOrder = ({ products, totalAmount, paymentInfo }) => {
  return api.post("/order", { products, totalAmount, paymentInfo });
};
