import { Box, Button, Card, CardContent, Container, List, ListItem, Typography } from '@mui/material';
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
    ));
    var totalMarks = filter.map((paper) => 
      paper.questions.reduce((acc, question) => {
        acc += question.marks_alloted; // Assuming question.marks_alloted is a number
        return acc;
      }, 0) // Initial value of accumulator is set to 0
    );

    var paperList = filter.map((paper, i) => {
      // Calculate total marks for each paper
      const totalMarks = paper.questions.reduce((acc, question) => {
        acc += question.marks_alloted; // Assuming question.marks_alloted is a number
        return acc;
      }, 0);
    
      return (
        <Card
        key={i}
        sx={{
          maxWidth: 600,
          margin: '20px auto',
          bgcolor: '#343a40',
          borderRadius: '15px',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ padding: '20px' }}>
          <Typography variant="h4"  sx={{ color: '#FABC3F'}} gutterBottom>
            {paper.sub_name}
          </Typography>
      
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Total Marks: <span style={{ color: '#ffcc00' }}>{totalMarks}</span>
          </Typography>
      
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Questions:
            </Typography>
            <List sx={{ padding: 0 }}>
              {paper.questions.map((question, j) => (
                <Box
                  key={j}
                  sx={{
                    bgcolor: j % 2 === 0 ? '#495057' : '#6c757d',
                    padding: 2,
                    marginY: 1,
                    borderRadius: '8px',
                    position: 'relative',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      bgcolor: '#adb5bd',
                    },
                  }}
                >
                  <ListItem>
                    <Typography variant="body1" fontWeight="bold">
                      Question {j + 1}:
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
          </Box>
      
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteQuestionPaper(paper._id)}
              sx={{
                '&:hover': { bgcolor: '#c82333' }, marginRight: '2px'
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FABC3F', '&:hover': { backgroundColor: '#F0A830' } }}
            >
              <Link
                to={`/editquestionpaper/${paper._id}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Edit
              </Link>
            </Button>
          </Box>
        </CardContent>
      </Card>
      

        // <Card
        //   key={i}
        //   sx={{
        //     maxWidth: 600,
        //     margin: '20px auto',
        //     bgcolor: '#282828',
        //     borderRadius: '10px',
        //     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        //     color: 'white',
        //   }}
        // >
        //   <CardContent>
        //     <Typography variant="h5" color="warning" gutterBottom>
        //       Subject: {paper.sub_name}
        //     </Typography>
        //     {/* <Typography variant="h5" color="warning" gutterBottom>
        //       Total marks: {totalMarks}
        //     </Typography> */}
    
            
    
        //     {/* Display total marks */}
        //     <Typography variant="h6" gutterBottom>
        //       Total Marks: {totalMarks}
        //     </Typography>
        //     <Typography variant="h6" gutterBottom>
        //               Questions:
        //             </Typography>
        //     {/* List of questions */}
        //     <List sx={{ padding: 0 }}>
        //       {paper.questions.map((question, j) => (
        //         <Box
        //           key={j}
        //           sx={{
        //             bgcolor: j % 2 === 0 ? '#CC9933 ' : '#B56727',
        //             padding: 2,
        //             marginY: 1,
        //             borderRadius: '5px',
        //           }}
        //         >
        //           <ListItem>
        //             <Typography variant="body1" fontWeight="bold">
        //               Question {j + 1}:
        //             </Typography>
        //             <Typography variant="body1" ml={2}>
        //               {question.question}
        //             </Typography>
        //           </ListItem>
    
        //           <ListItem>
        //             <Typography variant="body2" fontWeight="bold">
        //               Answer Type:
        //             </Typography>
        //             <Typography variant="body2" ml={2}>
        //               {question.answer_type}
        //             </Typography>
        //           </ListItem>
    
        //           <ListItem>
        //             <Typography variant="body2" fontWeight="bold">
        //               Answer Choices:
        //             </Typography>
        //             <Typography variant="body2" ml={2}>
        //               {question.answer_choice}
        //             </Typography>
        //           </ListItem>
    
        //           <ListItem>
        //             <Typography variant="body2" fontWeight="bold">
        //               Marks Allotted:
        //             </Typography>
        //             <Typography variant="body2" ml={2}>
        //               {question.marks_alloted}
        //             </Typography>
        //           </ListItem>
        //         </Box>
        //       ))}
        //     </List>
    
        //     <Button onClick={() => deleteQuestionPaper(paper._id)}>Delete</Button>
        //     <Button>
        //       <Link to={`/editquestionpaper/${paper._id}`}>Edit</Link>
        //     </Button>
        //   </CardContent>
        // </Card>
      );
    });
    
    // var paperList = filter.map((paper, i) =>{
    //   paper.questions.reduce((acc, question) => {
    //     acc += question.marks_alloted; // Assuming question.marks_alloted is a number
    //     return acc;
    //   }, 0)
    //    (
    //   <Card
    //   key={i}
    //   sx={{
    //     maxWidth: 600,
    //     margin: '20px auto',
    //     bgcolor: '#282828',
    //     borderRadius: '10px',
    //     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    //     color: 'white'
    //   }}
    // >
    //   <CardContent>
    //     <Typography variant="h5" color="warning" gutterBottom>
    //       Subject: {paper.sub_name}
    //     </Typography>
  
    //     <Typography variant="h6" gutterBottom>
    //       Questions:
    //     </Typography>
  
    //     {/* List of questions */}
    //     <List sx={{ padding: 0 }}>
    //       {paper.questions.map((question, i) => (
    //         <Box
    //           key={i}
    //           sx={{
    //             bgcolor: i % 2 === 0 ? '#CC9933 ' : '#FF9933',
    //             padding: 2,
    //             marginY: 1,
    //             borderRadius: '5px',
    //           }}
    //         >
    //           <ListItem>
    //             <Typography variant="body1" fontWeight="bold">
    //               Question {i + 1}:
    //             </Typography>
    //             <Typography variant="body1" ml={2}>
    //               {question.question}
    //             </Typography>
    //           </ListItem>
  
    //           <ListItem>
    //             <Typography variant="body2" fontWeight="bold">
    //               Answer Type:
    //             </Typography>
    //             <Typography variant="body2" ml={2}>
    //               {question.answer_type}
    //             </Typography>
    //           </ListItem>
  
    //           <ListItem>
    //             <Typography variant="body2" fontWeight="bold">
    //               Answer Choices:
    //             </Typography>
    //             <Typography variant="body2" ml={2}>
    //               {question.answer_choice}
    //             </Typography>
    //           </ListItem>
  
    //           <ListItem>
    //             <Typography variant="body2" fontWeight="bold">
    //               Marks Allotted:
    //             </Typography>
    //             <Typography variant="body2" ml={2}>
    //               {question.marks_alloted}
    //             </Typography>
    //           </ListItem>
    //         </Box>
    //       ))}
    //     </List>
    //     <Button onClick={()=>deleteQuestionPaper(paper._id)}>Delete</Button>
    //     <Button ><Link to={`/editquestionpaper/${paper._id}`}>Edit</Link></Button>

    //   </CardContent>
    // </Card>
    //   // <List
    //   //   sx={{ width: "100%", maxWidth: 360, bgcolor: "dark" }}
    //   //   key={i}
    //   //   className="list-group-item-dark"
    //   // >
    //   //   <ListItem>
    //   //       {/* <Link to={`/singlesubject/${subject.sub_name}`}> */}
    //   //       Subject Name :
    //   //       {paper.sub_name}  {"\n"}
    //   //       {/* </Link> */}Questions:
    //   //       </ListItem>
    //   //       <ListItem>
    //   //           {paper.questions.map((question, i)=>(
    //   //               <List>
                        
    //   //                   <ListItem>
    //   //                       Question no. {i+1}: {"\n"}
    //   //                       {question.question}
    //   //                   </ListItem>
    //   //                   <ListItem>
    //   //                   answer_type:
    //   //                       {question.answer_type}
    //   //                   </ListItem>
    //   //                   <ListItem>
    //   //                   answer_choice:
    //   //                       {question.answer_choice}
    //   //                   </ListItem>
    //   //                   <ListItem>
    //   //                   marks_alloted:
    //   //                       {question.marks_alloted}
    //   //                   </ListItem>
    //   //               </List>
    //   //           ))}
    //   //       </ListItem>
    //   // </List>
    // )};
  return (
    <Box>

    <Typography variant='h2'>
      {sub_name}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="contained" sx={{ backgroundColor: '#FABC3F', '&:hover': { backgroundColor: '#F0A830' } }} component={Link} to="/addquestionpaper">Add</Button>
    
    </Box>

    <Box>
           {paperList}
        </Box>
    
    
    </Box>
  )
}

