import { useEffect, useState } from "react";
import { postData, postEmail, updateData } from "./UserApi";

const Form = ({ data, setData, updateUser, setUpdateUser }) => {
  const [addData, setAddData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let isEmpty = Object.keys(updateUser).length === 0;

  // get the updated Data and add into input field
  useEffect(() => {
    if (updateUser._id) {
      setAddData({
        username: updateUser.username || "",
        email: updateUser.email || "",
        password: updateUser.password || "",
      });
    }
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

    if (res.status === 200) {
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
        setData((user) => {
          return user.map((curElem) => {
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

  // Function to send an email request to the backend
  const sendEmail = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    try {
      const response = await postEmail({ username, email });

      if (response.status === 200) {
        alert("Email sent successfully!");
      } else {
        alert(`Failed to send email: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
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
      sendEmail();
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
          required
        />
      </div>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Add email"
          id="email"
          name="email"
          value={addData.email}
          onChange={handleInputChange}
          required
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
          required
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
