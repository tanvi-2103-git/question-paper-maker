import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { register } from '../../model/subCRUD';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
      });
    console.log(formData,"formData")
      const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          return alert('Passwords do not match');
        }
        try {
          register(formData);
          // await axios.post('http://localhost:5000/register', formData);
          // alert('Registration successful');
          navigate('/login')
        } catch (error) {
          alert('Error registering user');
        }
      };
    
  return (
    <div>
      <form onSubmit={handleSubmit} className="m-3 text-light w-50">
      <div className="mb-3 text-light">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Email</label>
    <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
    </div>
    <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
    </div>
    <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
    </div>
    <div className="mb-3">
    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
    <input type="text" className="form-control" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
    </div>

      {/* <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
      <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} /> */}
      <button type="submit" className='btn btn-warning'>Register</button>
      <p>Already have account <Link to='/login'>LogIn</Link></p>
    </form>
    </div>
  )
}
