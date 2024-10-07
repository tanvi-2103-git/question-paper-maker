import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Subject } from "../../class/subject";

interface SubListProps {
    subList: JSX.Element[];
  }
export default function SubjectList({subList}:SubListProps) {
  return (
    <div>
        <div className="card mb-3 bg-dark text-light text-start" >
  <div className="row g-0">
    <div className="col-md-5">
      <img src="https://i.pinimg.com/736x/b8/fe/80/b8fe8088357e038bdf3c25bcf45fea40.jpg" className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title ">Subjects:</h5>
        <p className="card-text mb-2">Count of Subject: {subList.length}</p>
        <hr/>
        <p className="card-text"><small className="text-body-secondary"><ul className='list-group list-group-flush'>{subList}</ul></small></p>
        <button className='btn btn-warning'>Add Subject</button>

      </div>
    </div>
  </div>
</div>
        

    </div>
  )
}
