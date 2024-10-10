import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadPic } from '../../model/subCRUD';


export  function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let fileImage:React.RefObject<HTMLInputElement>
  = useRef<HTMLInputElement>(null);
  console.log(fileImage);
  
  let fileAudio = useRef();
    const user_id = localStorage.getItem('user_id');
    const navigate =useNavigate();
    console.log(user_id);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
      }
  };
    async function fileUp(){
      console.log(selectedFile);
      
      if(selectedFile!=undefined && user_id){
          const data=await uploadPic(selectedFile,user_id);
          console.log(data);
          
          
          console.log("data",data);
          
          if(data.affectedRows>0 ){
              window.alert("song image updated successfully...");}
          else{
              window.alert("Someting went wrong");}
              navigate(`../`);
      } 
      else
          window.alert("Please Upload Image")      
  }
  useEffect(()=>(
    console.log(selectedFile)
  ),[handleFileChange,selectedFile,fileUp])
    
  return (
    <div>
       <section className="m-3 p-3 border border-3 text-light">
            <p>
                <b>User Id : </b><i>{user_id}</i>
            </p>
      <label htmlFor='song_image'>Upload Image:</label>
      <input type='file' id='song_image' ref={fileImage}  onChange={handleFileChange}></input>
      
      <button onClick={fileUp}>UPLOAD</button>
      {/* <label htmlFor='song_audio'>Upload Audio:</label>
      <input type='file' id='song_audio' onChange={fileup}></input> */}
      
    </section>
    </div>
  )

}



