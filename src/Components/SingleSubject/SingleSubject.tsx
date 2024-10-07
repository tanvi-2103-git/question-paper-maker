import { Box, Button, Card, CardContent, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QuestionPaper } from '../../class/questionPaper';
import { deleteQuestionPaperById, getAllQuestionPapers } from '../../model/subCRUD';

export function SingleSubject() {
    let {sub_name} = useParams();
    let [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
    async function getquestionPapers() {
      const result = await getAllQuestionPapers();
      setQuestionPaper(result);
    }
    async function deleteQuestionPaper(_id:string) {
      const ans = window.confirm("Do you really want to delete??");
      console.log("id", _id);
      
      if (ans) {
        const data = await deleteQuestionPaperById(_id);
        // console.log(data.affectedRows);
        console.log(data);
        // console.log(data.affectedRows);
        
        if (data.deletedCount > 0) {
          window.alert("Question paper deleted Successfully");
          getquestionPapers();
        } else window.alert("Something went wrong....");
        // console.log(data.affectedRows);
      }
    }
    useEffect(() => {
        getquestionPapers();
    }, []);
    var filter = questionPaper.filter((paper)=>(paper.sub_name==sub_name && paper.user_id== user_id
    // var totalMarks = filter.reduce((paper)=>(paper.questions))
    ))
    var paperList = filter.map((paper, i) => (
      <Card
      key={i}
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        bgcolor: '#282828',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        color: 'white'
      }}
    >
      <CardContent>
        <Typography variant="h5" color="warning" gutterBottom>
          Subject: {paper.sub_name}
        </Typography>
  
        <Typography variant="h6" gutterBottom>
          Questions:
        </Typography>
  
        {/* List of questions */}
        <List sx={{ padding: 0 }}>
          {paper.questions.map((question, i) => (
            <Box
              key={i}
              sx={{
                bgcolor: i % 2 === 0 ? '#CC9933 ' : '#FF9933',
                padding: 2,
                marginY: 1,
                borderRadius: '5px',
              }}
            >
              <ListItem>
                <Typography variant="body1" fontWeight="bold">
                  Question {i + 1}:
                </Typography>
                <Typography variant="body1" ml={2}>
                  {question.question}
                </Typography>
              </ListItem>
  
              <ListItem>
                <Typography variant="body2" fontWeight="bold">
                  Answer Type:
                </Typography>
                <Typography variant="body2" ml={2}>
                  {question.answer_type}
                </Typography>
              </ListItem>
  
              <ListItem>
                <Typography variant="body2" fontWeight="bold">
                  Answer Choices:
                </Typography>
                <Typography variant="body2" ml={2}>
                  {question.answer_choice}
                </Typography>
              </ListItem>
  
              <ListItem>
                <Typography variant="body2" fontWeight="bold">
                  Marks Allotted:
                </Typography>
                <Typography variant="body2" ml={2}>
                  {question.marks_alloted}
                </Typography>
              </ListItem>
            </Box>
          ))}
        </List>
        <Button onClick={()=>deleteQuestionPaper(paper._id)}>Delete</Button>
        <Button ><Link to={`/editquestionpaper/${paper._id}`}>Edit</Link></Button>

      </CardContent>
    </Card>
      // <List
      //   sx={{ width: "100%", maxWidth: 360, bgcolor: "dark" }}
      //   key={i}
      //   className="list-group-item-dark"
      // >
      //   <ListItem>
      //       {/* <Link to={`/singlesubject/${subject.sub_name}`}> */}
      //       Subject Name :
      //       {paper.sub_name}  {"\n"}
      //       {/* </Link> */}Questions:
      //       </ListItem>
      //       <ListItem>
      //           {paper.questions.map((question, i)=>(
      //               <List>
                        
      //                   <ListItem>
      //                       Question no. {i+1}: {"\n"}
      //                       {question.question}
      //                   </ListItem>
      //                   <ListItem>
      //                   answer_type:
      //                       {question.answer_type}
      //                   </ListItem>
      //                   <ListItem>
      //                   answer_choice:
      //                       {question.answer_choice}
      //                   </ListItem>
      //                   <ListItem>
      //                   marks_alloted:
      //                       {question.marks_alloted}
      //                   </ListItem>
      //               </List>
      //           ))}
      //       </ListItem>
      // </List>
    ));
  return (
    <Box>
    <Typography variant='h2'>
      {sub_name}
    </Typography>
    <Box>
           {paperList}
        </Box>
    
    
    <Button variant="contained" sx={{bgcolor:'warning'}} component={Link} to="/addquestionpaper">Add</Button>
    </Box>
  )
}

