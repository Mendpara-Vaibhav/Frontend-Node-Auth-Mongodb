import { useEffect, useState } from "react";
import { postData, updateData } from "./UserApi";

const Form = ({ data, setData, updateUser, setUpdateUser }) => {
  const [addData, setAddData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let isEmpty = Object.keys(updateUser).length === 0;

  // get the updated Data and add into input field
  useEffect(() => {
    updateUser &&
      setAddData({
        username: updateUser.username || "",
        email: updateUser.email || "",
        password: updateUser.password || "",
      });
  }, [updateUser]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ username: "", email: "", password: "" });
    }
  };

  // updatePostData
  const updatePostData = async () => {
    try {
      //   console.log("Updating user:", updateUser._id);
      const res = await updateData(updateUser._id, addData);
      //   console.log("Update response:", res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem._id === res.data._id ? res.data : curElem;
          });
        });

        setAddData({ username: "", email: "", password: "" });
        setUpdateUser({});
      }
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  //   form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    // console.log(action);
    if (action === "Add") {
      //   console.log("Adding new user");
      addPostData();
    } else if (action === "Edit") {
      //   console.log("Editing user");
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username"></label>
        <input
          type="text"
          autoComplete="off"
          id="username"
          name="username"
          placeholder="Add name"
          value={addData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add email"
          id="email"
          name="email"
          value={addData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add password"
          id="password"
          name="password"
          value={addData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="btn-edit"
        type="submit"
        value={isEmpty ? "Add" : "Edit"}
      >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
