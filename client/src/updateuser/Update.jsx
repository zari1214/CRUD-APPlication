import React, { useEffect, useState } from 'react';
import './update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: ""
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/users/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className='addUser'>
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={inputhandler}
            name='name'
            autoComplete='off'
            placeholder='Enter your name'
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={inputhandler}
            name='email'
            autoComplete='off'
            placeholder='Enter your email'
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={user.address}
            onChange={inputhandler}
            name='address'
            autoComplete='off'
            placeholder='Enter your Address'
          />
        </div>

        <div className='inputGroup'>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
};

export default UpdateUser;
