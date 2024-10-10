import React, { useEffect, useRef, useState } from 'react'
import { getAllQuestionPapers, getWeeklyQuestionPaper } from '../../../model/subCRUD';
import { format, startOfWeek } from 'date-fns';
import { QuestionPaper } from '../../../class/questionPaper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TextField } from '@mui/material';

interface  ApiData{
  week: string;
  count: number;
}
export default function Weekly() {
    // let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
    let [weekNo, setWeekNo] = useState<ApiData[]>([]);

    const getyear = useRef<HTMLInputElement>(null); 
     const [year,setYear] = useState('2024');
 
    function getdata(){
      if (getyear.current) {
        const yeardata = getyear.current.value;
         console.log(yeardata);
         
         setYear(yeardata)
    }
      
      
  }
    
   
    useEffect(()=>{
      // getquestionPapers();
      getWeeklyData();
      
    },[])
    useEffect(()=>{
      
      getWeeklyData();
      
    },[year])
    
    
    async function getWeeklyData() {
      console.log("in week");
      
      const finalYear = Number(year);
      const user_id = localStorage.getItem('user_id')
      if(user_id){
      const result = await getWeeklyQuestionPaper(finalYear,user_id);

      console.log("result",result);
   
      setWeekNo(result.data);}
    }
    
  return (
    <div>
           <div>
    <div className="card mb-3 bg-dark text-light text-start" >
    
<div className="row g-0">
<div className="col-md-6 py-2" style={{ overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace:"nowrap"}}>
<BarChart width={450} height={300} data={weekNo}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#FABC3F" width={50} />
    </BarChart></div>
<div className="col-md-6">
 
<div className="card-body mb-3">
  <div className="d-flex justify-content-between align-items-center mb-3">
  <h4 className="card-title">Statistic</h4> 
  <div className="input-group w-50 ">
  {/* <input type="number" className="form-control bg-dark text-light" min="1900" max="2099" step="1" placeholder="2024" aria-label="2024" aria-describedby="button-addon2" ref={getyear}/> */}
  <input type="number" className="form-control " min="1900" max="2099" step="1" placeholder="2024" aria-label="Recipient's username" aria-describedby="button-addon2" ref={getyear}/>

    <button 
      className="btn btn-outline-secondary"  
      id="button-addon2" 
      onClick={() => { getdata(); }}
    >
      Filter
    </button>
  </div>
</div>
<hr />

    <table className='text-light table-dark table-bordered text-center'>
      <thead>
        <tr>
        <th scope="col">Week Starting</th>
        <th scope="col">Question Papers</th>
        </tr>
      </thead>
    
      <tbody >
      {weekNo.map((obj) => (
          <tr key={obj.week}>
            <td>{obj.week}</td>
            <td>{obj.count}</td>
          </tr>
        ))}
       
      </tbody>
    </table>

  </div>
</div>
</div>
</div>
    

</div>
        
      
    </div>
  )
}


 {/* <div className="card-body">
    <h4 className="card-title ">Statistic</h4> 
    <div className="input-group mb-3 w-25">
  <input type="number" className="form-control bg-dark text-light" min="1900" max="2099" step="1" placeholder="2024" aria-label="Recipient's username" aria-describedby="button-addon2" ref={getyear}/>
  <button className="btn btn-outline-secondary"  id="button-addon2" onClick={()=>{getdata()}}>filter</button>
</div><hr/> */}
// const data = Object.entries(weeklyData).map(([weekStart, count]) => ({
    //     weekStart,
    //     count,
    //   }));
     {/* {Object.entries(weeklyData).map(([weekStart, count]) => (
          <tr key={weekStart}>
            <td>{weekStart}</td>
            <td>{count}</td>
          </tr>
        ))} */}

 // const weeklyData = groupByWeek(filter);
  //  console.log(weeklyData);

     // async function getquestionPapers() {
    //   const result = await getAllQuestionPapers();
    //   console.log(result);
    //   console.log("result.length",result.length);
      
      
    //   setQuestionPaper(result.data);
    // }
    // const user_id = localStorage.getItem('user_id');
  // const filter = questionPaper.filter((paper)=>(paper.user_id === user_id));
    // function groupByWeek(papers:QuestionPaper[]) {
    //   return papers.reduce((acc, paper) => {
    //     const paperDate = new Date(paper.createdAt);
    //     const weekStart = startOfWeek(paperDate, { weekStartsOn: 1 }); // Week starts on Monday
    //     const formattedWeek = format(weekStart, 'yyyy-MM-dd');
        
    //     if (!acc[formattedWeek]) {
    //       acc[formattedWeek] = 0;
    //     }
    
    //     acc[formattedWeek] += 1;
    //     // console.log(acc);
        
    //     return acc;
    //   }, {} as Record<string, number>);
    // }
    // console.log(groupByWeek(questionPaper));
