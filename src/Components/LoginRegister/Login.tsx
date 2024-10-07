import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../model/subCRUD';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("handle sumit try");
      console.log(formData);
      login(formData);
      
      // const response = await axios.post('http://localhost:5000/login', formData);
      // console.log(response);
      
      // localStorage.setItem('token', response.data.token);
      // navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };
  return (
  //   <form onSubmit={handleSubmit}>
  // <div className="mb-3">
  //   <label htmlFor="email" className="form-label">Email address</label>
  //   <input type="email" className="form-control" name="email"  onChange={handleChange}  aria-describedby="emailHelp" />
  //   <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  // </div>
  // <div className="mb-3">
  //   <label htmlFor="password" className="form-label">Password</label>
  //   <input type="password" className="form-control" name="password" onChange={handleChange}  />
  // </div>
  
  // <button type="submit" className="btn btn-primary">Submit</button>

     <form onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button type="submit">Login</button>
  </form> 
  // </form>
  )
}
