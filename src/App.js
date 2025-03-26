import "./App.css";
import { useEffect, useState } from "react";
import { deleteUser, getUser } from "./components/UserApi";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [updateUser, setUpdateUser] = useState({});

  const getData = async () => {
    const response = await getUser();
    // console.log(response.data.list);
    setData(response.data.list);
  };

  // function to delete User
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      console.log(res);
      if (res.status === 200) {
        const newUpdatedUsers = data.filter((curUser) => {
          return curUser.id !== id;
        });
        setData(newUpdatedUsers);
      } else {
        console.log("failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleUpdatePost
  const handleUpdate = (user) => setUpdateUser(user);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
        />
      </section>
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
          {data?.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button className="btn-edit" onClick={() => handleUpdate(user)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
