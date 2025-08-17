import React, { useState } from 'react';
import "./adduser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddUser = () => {
  const users = {
    name: "",
    email: "",
    address: ""
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:8000/api/users", user);
      toast.success(response.data.message || "User added successfully", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      console.error("Axios Error:", error);
      toast.error("Failed to connect to server. Please check backend.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className='addUser'>
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={inputhandler}
            name='name'
            autoComplete='off'
            placeholder='Enter your name'
            required
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={inputhandler}
            name='email'
            autoComplete='off'
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={inputhandler}
            name='address'
            autoComplete='off'
            placeholder='Enter your address'
            required
          />
        </div>

        <div className='inputGroup'>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
