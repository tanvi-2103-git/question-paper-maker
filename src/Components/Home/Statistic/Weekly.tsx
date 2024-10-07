import React, { useEffect, useState } from 'react'
import { getAllQuestionPapers } from '../../../model/subCRUD';
import { format, startOfWeek } from 'date-fns';
import { QuestionPaper } from '../../../class/questionPaper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Weekly() {
    let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
  

    async function getquestionPapers() {
      const result = await getAllQuestionPapers();
      console.log(result);
      
      setQuestionPaper(result);
    }
    function groupByWeek(papers:QuestionPaper[]) {
      return papers.reduce((acc, paper) => {
        const paperDate = new Date(paper.createdAt);
        const weekStart = startOfWeek(paperDate, { weekStartsOn: 1 }); // Week starts on Monday
        const formattedWeek = format(weekStart, 'yyyy-MM-dd');
    
        if (!acc[formattedWeek]) {
          acc[formattedWeek] = 0;
        }
    
        acc[formattedWeek] += 1;
        // console.log(acc);
        
        return acc;
      }, {} as Record<string, number>);
    }
    // console.log(groupByWeek(questionPaper));
    
    const weeklyData = groupByWeek(questionPaper);
   console.log(weeklyData);
    useEffect(()=>{
      getquestionPapers();
      
      
    },[])
    const data = Object.entries(weeklyData).map(([weekStart, count]) => ({
        weekStart,
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
      <XAxis dataKey="weekStart" />
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
        <th scope="col">Week Starting</th>
        <th scope="col">Question Papers</th>
        </tr>
      </thead>
      <tbody >
        {Object.entries(weeklyData).map(([weekStart, count]) => (
          <tr key={weekStart}>
            <td>{weekStart}</td>
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
