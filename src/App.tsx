import React from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './Components/NavBar/Nav';
import { Outlet } from 'react-router-dom';
import { getUserById } from './model/subCRUD';
import { User } from './class/user';

function App() {
 
  return (
    <div className="App">
      <Nav></Nav>
      <div>
        <Outlet></Outlet> {/* outlet of router */}
      </div>
      {/* <Login></Login> */}
      {/* <SignIn></SignIn> */}
    </div>
  );
}

export default App;
