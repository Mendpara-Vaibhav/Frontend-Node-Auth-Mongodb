import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const getData = async () => {
    await axios.get("http://localhost:8080/api/user").then((response) => {
      // console.log(response.data.list);
      setData(response.data.list);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete")) {
      setData(data.filter((v, i) => i !== index));
    }
  };

  const handleEdit = (index) => {};

  return (
    <>
      <h1>User List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
