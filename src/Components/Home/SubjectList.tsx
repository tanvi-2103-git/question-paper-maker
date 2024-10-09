import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Subject } from "../../class/subject";
import { addsubject, getAllSub } from '../../model/subCRUD';
import { Link } from 'react-router-dom';

interface SubListProps {
    subList: JSX.Element[];
  }
export default function SubjectList() {
  let [sub, setSub] = useState<Subject[]>([]);
  async function getsubjects() {
    const result = await getAllSub();
    setSub(result);
  }
  useEffect(() => {
    getsubjects();
  }, []);

  var subList = sub.map((subject:Subject, i:number) => (
    // <List
    //   sx={{ width: "100%", maxWidth: 360, bgcolor: "dark" }}
    //   key={i}
    //   className="list-group-item-dark"
    // >
    <li className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
<Link to={`/singlesubject/${subject.sub_name}`} style={{ textDecoration: 'none', color:'white' }}>{subject.sub_name}</Link></li>
    // </List>
  ));
  async function addS() {
    var subject = prompt("Enter subject");
    if(subject !== null){
      const subjectData = new Subject(subject);
    
    const result = await addsubject(subjectData);
  }
    console.log(subject);  
     
}
useEffect(() => {
  getsubjects();
}, []);


  return (
    <div>
        <div className="card mb-3 bg-dark text-light text-start" >
  <div className="row g-0">
    <div className="col-md-5">
      <img src="https://i.pinimg.com/736x/b8/fe/80/b8fe8088357e038bdf3c25bcf45fea40.jpg" className="img-fluid rounded-start h-100" alt="..." />
    </div>
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title ">Subjects:</h5>
        <p className="card-text mb-2">Count of Subject: {subList.length}</p>
        <hr/>
        <p className="card-text"><small className="text-body-secondary"><ul className='list-group list-group-flush'>{subList}</ul></small></p>
        <button className='btn btn-warning' onClick={addS}>Add Subject</button>

      </div>
    </div>
  </div>
</div>
        

    </div>
  )
}
