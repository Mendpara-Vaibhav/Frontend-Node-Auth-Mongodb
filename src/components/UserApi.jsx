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
export const postData = (post) => {
  return api.post("/add/user", post);
};

//put method
export const updateData = (id, post) => {
  return api.put(`/update/user/${id}`, post);
};
