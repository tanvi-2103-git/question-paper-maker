import React, { useEffect, useState } from 'react'

import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { QuestionPaper } from '../../../class/questionPaper';
import { getAllQuestionPapers } from '../../../model/subCRUD';

export default function Monthly() {
    let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
  

    async function getquestionPapers() {
      const result = await getAllQuestionPapers();
      console.log(result);
      
      setQuestionPaper(result);
    }
    const user_id = localStorage.getItem('user_id');
    const filter = questionPaper.filter((paper)=>(paper.user_id === user_id));
    function groupByMonth(papers:QuestionPaper[]) {
        return papers.reduce((acc, paper) => {
          const paperDate = new Date(paper.createdAt);
          const formattedMonth = format(paperDate, 'yyyy-MM'); // Group by year and month
          
          if (!acc[formattedMonth]) {
            acc[formattedMonth] = 0;
          }
      
          acc[formattedMonth] += 1; // Count the occurrences of each month
          return acc;
        }, {} as Record<string, number>);
      }
      
      const monthlyData = groupByMonth(filter);
      
      console.log(monthlyData);
      useEffect(()=>{
        getquestionPapers();
        
        
      },[])
      const data = Object.entries(monthlyData).map(([month, count]) => ({
        month,
        count,
      }));
  return (
    <div>
    <div>
<div className="card mb-3 bg-dark text-light text-start" >
<div className="row g-0">
<div className="col-md-6 py-2" >
<BarChart width={350} height={300} data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="month" />
<YAxis />
<Tooltip />
<Legend />
<Bar dataKey="count" fill="#FABC3F" />
</BarChart></div>
<div className="col-md-6">
<div className="card-body">
<h4 className="card-title ">Statistic</h4><hr/>
<table className='text-light table-dark table-bordered text-center'>
<thead>
 <tr>
   <th scope="col">Month</th>
   <th scope="col">Question Papers</th>
 </tr>
</thead>
<tbody >
 {Object.entries(monthlyData).map(([month, count]) => (
   <tr key={month}>
     <td >{month}</td>
     <td>{count}</td>
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
