
import axios from "axios";
import { QuestionPaper } from "../class/questionPaper";
import { Subject } from "../class/subject";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',  // Your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });



axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      // If no token exists, abort the request
      if (!token) {
        console.warn('No token found. Request aborted.');
           window.location.href = "/login";
      }
  
      // Add token to Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

const url="http://localhost:5000/questions"

export async function login(formData:Object) {
    const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data._id);
      window.location.href = "/";

}
export async function register(formData:Object) {
    await axios.post('http://localhost:5000/register', formData);
}
export async function getAllSub(){
    const res = await axiosInstance.get(`${url}/getallsubjects`);
    return res.data;
}
export async function getAllQuestionPapers(){
    const res = await axiosInstance.get(`${url}/getallquestionpaper`);
    return res.data;
}
export async function addQuestionPaper(questionPaper:QuestionPaper) {
    const res = await axiosInstance.post(`${url}/addquestionpaper`,questionPaper);
    return res.data;
}
export async function addsubject(subject:Subject) {
    const res = await axiosInstance.post(`${url}/addsubject`,subject);
    return res.data;
}
export async function getQuestionPaperById(_id:string) {
    
    const res=await axiosInstance.get(`${url}/get/${_id}`);
    console.log(res.data);
    
    return res.data;
}
export async function deleteQuestionPaperById(_id:string) {
    const res=await axiosInstance.delete(`${url}/delete/${_id}`)
    return res.data;
};
export async function updateQuestionPaper(questionPaper:QuestionPaper){
    
    const res = await axiosInstance.put(`${url}/update`,questionPaper);
    console.log(res.data);
    
    return res.data;
    
}