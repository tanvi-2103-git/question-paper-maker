import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './Components/Home/Home';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { SingleSubject } from './Components/SingleSubject/SingleSubject';
import AddPaperForm from './Components/AddPaper/AddPaperForm';
import { getQuestionPaperById } from './model/subCRUD';
import Register from './Components/LoginRegister/Register';
import Login from './Components/LoginRegister/Login';

let childRoutes=[
  {
    
    element:<Login></Login>,
    path:'login'
  },
  {
    
    element:<Register></Register>,
    path:'register'
  },
  {
    
    element:<Home></Home>,
    path:'/'
  },
  {
    
    element:<SingleSubject></SingleSubject>,
    path:'singlesubject/:sub_name'
  },
  {
    
    element:<AddPaperForm></AddPaperForm>,
    path:'addquestionpaper'
  },
  {
    element:<AddPaperForm></AddPaperForm>,
    path:'editquestionpaper/:_id',
    loader:async ({params}: any)=>{

      return await getQuestionPaperById(params._id)

    }
  },
 
]

const router = createBrowserRouter(
  [{element:<App></App>,
    path:'/',
    children:childRoutes
  }]
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
<Auth0Provider
    domain="dev-k6dreiswg48nftev.us.auth0.com"
    clientId="RqjxR4pQK4YDRKGmC9pMe8cb4aj7xZbw"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  ><RouterProvider router={router}></RouterProvider>
   
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
