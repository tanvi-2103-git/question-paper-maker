import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { register } from '../../model/subCRUD';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
      });
    
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
          alert('Registration successful');
        } catch (error) {
          alert('Error registering user');
        }
      };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
      <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
    </div>
  )
}
