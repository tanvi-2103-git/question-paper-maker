import React, { useEffect, useState } from 'react';
import { format, startOfWeek } from 'date-fns';


import { QuestionPaper } from '../../../class/questionPaper';
import { getAllQuestionPapers } from '../../../model/subCRUD';
import Weekly from './Weekly';
import Monthly from './Monthly';

export default function Statistic() {
//   let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
  

//   async function getquestionPapers() {
//     const result = await getAllQuestionPapers();
//     console.log(result);
    
//     setQuestionPaper(result);
//   }

//   const user_id = localStorage.getItem('user_id');
//   const filter = questionPaper.filter((paper)=>(paper.user_id === user_id));
//   function groupByWeek(papers:QuestionPaper[]) {
//     return papers.reduce((acc, paper) => {
//       const paperDate = new Date(paper.createdAt);
//       const weekStart = startOfWeek(paperDate, { weekStartsOn: 1 }); // Week starts on Monday
//       const formattedWeek = format(weekStart, 'yyyy-MM-dd');
  
//       if (!acc[formattedWeek]) {
//         acc[formattedWeek] = 0;
//       }
  
//       acc[formattedWeek] += 1;
//       // console.log(acc);
      
//       return acc;
//     }, {} as Record<string, number>);
//   }
//   // console.log(groupByWeek(questionPaper));
  
//   const weeklyData = groupByWeek(filter);
//  console.log(weeklyData);
//   useEffect(()=>{
//     getquestionPapers();
    
    
//   },[])
  return (
 
<><Weekly></Weekly>
<Monthly></Monthly></>
  )
}
