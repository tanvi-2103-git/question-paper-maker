import React, { useEffect, useRef, useState } from 'react'

import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { QuestionPaper } from '../../../class/questionPaper';
import { getAllQuestionPapers, getMonthlyQuestionPaper } from '../../../model/subCRUD';

interface  ApiData{
  month: string;
  count: number;
}
export default function Monthly() {

  let [monthNo, setMonthNo] = useState<ApiData[]>([]);

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
    getMonthlylyData();
    
  },[])
  useEffect(()=>{
    
    getMonthlylyData();
    
  },[year])
  
  
  async function getMonthlylyData() {
    console.log("in week");
    
    const finalYear = Number(year);
    const user_id = localStorage.getItem('user_id')
    if(user_id){
    const result = await getMonthlyQuestionPaper(finalYear,user_id);

    console.log("result",result);
 
    setMonthNo(result.data);}
  }
    // let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
  

    // async function getquestionPapers() {
    //   const result = await getAllQuestionPapers();
    //   console.log(result);
      
    //   setQuestionPaper(result.data);
    //   console.log("result.length",questionPaper.length);

    // }
    // const user_id = localStorage.getItem('user_id');
    // const filter = questionPaper.filter((paper)=>(paper.user_id === user_id));
    // function groupByMonth(papers:QuestionPaper[]) {
    //     return papers.reduce((acc, paper) => {
    //       const paperDate = new Date(paper.createdAt);
    //       const formattedMonth = format(paperDate, 'yyyy-MM'); // Group by year and month
          
    //       if (!acc[formattedMonth]) {
    //         acc[formattedMonth] = 0;
    //       }
      
    //       acc[formattedMonth] += 1; // Count the occurrences of each month
    //       return acc;
    //     }, {} as Record<string, number>);
    //   }
      
    //   const monthlyData = groupByMonth(filter);
      
    //   console.log(monthlyData);
    //   useEffect(()=>{
    //     getquestionPapers();
        
        
    //   },[])
    //   const data = Object.entries(monthlyData).map(([month, count]) => ({
    //     month,
    //     count,
    //   }));
  return (
    <div>
    <div>
<div className="card mb-3 bg-dark text-light text-start" >

<div className="row g-0">
<div className="col-md-6 py-2" >
<BarChart width={350} height={300} data={monthNo}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="month" />
<YAxis />
<Tooltip />
<Legend />
<Bar dataKey="count" fill="#FABC3F" />
</BarChart></div>
<div className="col-md-6">
<div className="card-body">
<div className="d-flex justify-content-between align-items-center mb-3">
  <h4 className="card-title">Statistic</h4> 
  <div className="input-group w-50 ">
  {/* <input type="number" className="form-control bg-dark text-light" min="1900" max="2099" step="1" placeholder="2024" aria-label="2024" aria-describedby="button-addon2" ref={getyear}/> */}
  <input type="number" className="form-control" min="1900" max="2099" step="1" placeholder="2024" aria-label="Recipient's username" aria-describedby="button-addon2" ref={getyear}/>

    <button 
      className="btn btn-outline-secondary"  
      id="button-addon2" 
      onClick={() => { getdata(); }}
    >
      Filter
    </button>
  </div>
</div><hr/>
<table className='text-light table-dark table-bordered text-center'>
<thead>
 <tr>
   <th scope="col">Month</th>
   <th scope="col">Question Papers</th>
 </tr>
</thead>
<tbody >
{monthNo.map((obj) => (
          <tr key={obj.month}>
            <td>{obj.month}</td>
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
