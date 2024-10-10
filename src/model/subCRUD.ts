
import axios from "axios";
import { QuestionPaper } from "../class/questionPaper";
import { Subject } from "../class/subject";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',  
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
        // window.alert("login first");
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
  

const url="http://localhost:5000/api/questionPaper";
const suburl="http://localhost:5000/api/subject";
const userurl ="http://localhost:5000/api/user"
export async function login(formData:Object) {
    const response = await axios.post( `${userurl}/login` , formData);
      console.log(response);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data._id);
      window.location.href = "/";

}
export async function register(formData:Object) {
  const response =  await axios.post( `${userurl}/register` , formData);
  console.log(response);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data._id);
      window.location.href = "/";
}
export async function getAllSub(){
  try{
    const res = await axiosInstance.get(`${suburl}/getallsubjects`);
    return res.data;
  }catch(err){
    console.log(err);
    // window.location.href = "/";
    // window.alert(err);
  }

}
export async function getQuestionPaperBySubject(sub_name:string,user_id:string){
  try{
  const res = await axiosInstance.get(`${url}/getpaper/${sub_name}/${user_id}`);
  return res.data;
}catch(err){
  console.log(err);
  // window.alert(err);
}
}

export async function getWeeklyQuestionPaper(year:number,user_id:string){
  try{
  const res = await axiosInstance.get(`${url}/getweeklyquestionpaper/${year}/${user_id}`);
  return res.data;
}catch(err){
  console.log(err);
  // window.alert(err);
}
}

export async function getMonthlyQuestionPaper(year:number,user_id:string){
  try{
  const res = await axiosInstance.get(`${url}/getmonthlyquestionpaper/${year}/${user_id}`);
  return res.data;
}catch(err){
  console.log(err);
  // window.alert(err);
}
}

export async function getAllQuestionPapers(){
  try{
    const res = await axiosInstance.get(`${url}/getallquestionpaper`);
    return res.data;
  }catch(err){
    console.log(err);
    // window.alert(err);
  }
}
export async function addQuestionPaper(questionPaper:QuestionPaper) {
  try{
    const res = await axiosInstance.post(`${url}/addquestionpaper`,questionPaper);
    return res.data;
  }catch(err){
    console.log(err);
    // window.alert(err);
  }
}
export async function addsubject(subject:Subject) {
  try{
    const res = await axiosInstance.post(`${suburl}/addsubject`,subject);
    return res.data;
  }catch(err){
    console.log(err);

    // window.alert(err);
  }
}
export async function getQuestionPaperById(_id:string) {
  try{
    const res=await axiosInstance.get(`${url}/get/${_id}`);
    console.log(res.data);
    
    return res.data;
  }catch(err){
    console.log(err);
    // window.alert(err);
  }
}
export async function deleteQuestionPaperById(_id:string) {
  try{
    const res=await axiosInstance.delete(`${url}/delete/${_id}`)
    return res.data;

  }catch(err){
    console.log(err);
    // window.alert(err);
  }
};
export async function updateQuestionPaper(questionPaper:QuestionPaper){
  try{
    const res = await axiosInstance.put(`${url}/update`,questionPaper);
    console.log(res.data);
    
    return res.data;
  }catch(err){
    console.log(err);
    window.alert(err);
  }
    
}

export async function uploadPic(selectedFile:any, user_id:string){
  try{
    let formData=new FormData();
    formData.append('profileImage', selectedFile);
    console.log(formData);
    const res = await axiosInstance.put(`${userurl}/uploadpic/${user_id}`,formData,{
      headers: {
          'Content-Type': 'multipart/form-data' // Ensure this header is set
      }
  });
    console.log(res.data);
    
    return res.data;
  }catch(err){
    console.log(err);
    // window.alert(err);
  }
    
}

export async function getUserById(user_id:string) {
  try{
    console.log("inside axios user");
    
    const res=await axiosInstance.get(`${userurl}/getuserbyid/${user_id}`);
    console.log("resuser",res);
    
    console.log(res.data);
    
    return res.data;
  }catch(err){
    console.log(err);
    // window.alert(err);
  }
}