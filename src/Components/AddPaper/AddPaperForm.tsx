
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { QuestionPaper } from "../../class/questionPaper";
import { addQuestionPaper, updateQuestionPaper } from "../../model/subCRUD";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import QuestionField from "./QuestionField";

export default function AddPaperForm() {
  const { pathname } = useLocation();
  const params = useParams<{ _id: string }>(); 
  const _id: string = params._id || '';
   const questionPapers = useLoaderData() as QuestionPaper | undefined;
  const {  handleSubmit, control, setValue } = useForm<QuestionPaper>({
    defaultValues: {
      sub_name: questionPapers?.sub_name || "",
      questions: questionPapers?.questions || [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuestionPaper) => {
    console.log(data);
    
    const user_id = localStorage.getItem('user_id');
    console.log("data",data);
    
    console.log(user_id);
    
    if(user_id){
    data.user_id =user_id;
}
    if (pathname.includes("editquestionpaper")) {
      
      data._id = _id;
      const result = await updateQuestionPaper(data);
      if(result){
      alert("Question Paper updated successfully!");}
    } else {
      await addQuestionPaper(data);
      alert("Question Paper added successfully!");
    }
  };
  // async function updQuestionPaper() {
  //       // console.log(song);
  //       // console.log(songId.song_id)
  //       const result = await updateQuestionPaper(questionPaper);
  //       const data = result;
  //       console.log("result",result);
        
  //       console.log(data);
    
  //       if (result != null) {
  //         alert(`Data updated sucessfully ${questionPaper._id}`);
  //         // navigate(`../`);
  //       }
  //     }
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
    if (questionPapers) {
      setValue("sub_name", questionPapers.sub_name);
      setValue("questions", questionPapers.questions);
    }
  }, [questionPapers, setValue]);

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Question Paper
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="sub_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Subject"
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              required
              margin="normal"
            />
          )}
        />

        <Typography variant="h5" component="h2" gutterBottom>
          Questions
        </Typography>

        {fields.map((field, index) => (
          <QuestionField
            key={field.id}
            // getdata={}
            control={control}
            index={index}
            question={field}
          />
        ))}

        <Box my={2}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() =>
              append({ question: "", answer_type: "", answer_choice: "", marks_alloted: 0 })
            }
          >
            Add Another Question
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}



// import React, { useState } from "react";
// import QuestionField from "./QuestionField";
// import { QuestionPaper } from "../../class/questionPaper";
// import { addQuestionPaper, updateQuestionPaper } from "../../model/subCRUD";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useLoaderData, useLocation, useParams } from "react-router-dom";
// import { Question } from "../../class/question";

// export default function AddPaperForm() {
//   const [qf, setQf] = useState<JSX.Element[]>([]);
//   let { pathname } = useLocation();
//   let _id = useParams();
//   const questionPapers = useLoaderData() as QuestionPaper;
//   const [questionPaper, setQuestionPaper] = useState(() => setInitialData());

//   function setInitialData(): QuestionPaper {
//     if (questionPapers) {
//       console.log(questionPapers);

//       return questionPapers as QuestionPaper;
//     } else {
//       console.log("NEW ");

//       return new QuestionPaper();
//     }
//   }
//   async function addQuestionP() {
//     const data = await addQuestionPaper(questionPaper);
//     if (data != null) {
//       alert(`Data added sucessfully `);
//     }
//   }
//   async function updQuestionPaper() {
//     // console.log(song);
//     // console.log(songId.song_id)
//     const result = await updateQuestionPaper(questionPaper);
//     const data = result;
//     console.log("result",result);
    
//     console.log(data);

//     if (result != null) {
//       alert(`Data updated sucessfully ${questionPaper._id}`);
//       // navigate(`../`);
//     }
//   }
//   function addQuestion() {
//     if(!questionPapers){
//     setQf((prevQuestions) => [
//       ...prevQuestions,
//       <QuestionField
//         key={prevQuestions.length}
//         getdata={getdata}
//         index={prevQuestions.length}
//       />,
//     ]);}else{
//       setQf((prevQuestions) => [
//         ...prevQuestions, // Spread the existing questions
//         ...questionPapers.questions.map((question, index) => ( // Spread the mapped array to flatten it
//           <QuestionField
//             key={prevQuestions.length + index} // Adjust the key to avoid duplicates
//             getdata={handleDataChange}
//             index={prevQuestions.length + index} // Ensure the index is correctly calculated
//             question={question}
//           />
//         )),  <QuestionField
//         key={questionPapers.questions.length}
//         getdata={getdata}
//         index={questionPapers.questions.length}
//       />
//       ]);
      
//       // setQf((prevQuestions) => [
//       //   ...prevQuestions,questionPapers.questions.map((question, index) => (
//       //   <QuestionField
//       //     key={index}
//       //     getdata={handleDataChange}
//       //     index={index}
//       //     question={question}
//       //   />]
//       // )))
//     }
//     // function handleDataChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
//     //   throw new Error('Function not implemented.');
//     // }

//     setQuestionPaper((prev) => ({
//       ...prev,
//       questions: [
//         ...prev.questions,
//         {
//           question: "",
//           answer_type: "",
//           answer_choice: "",
//           marks_alloted: 0,
//         },
//       ],
//     }));
//   }
//   const handleDataChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>,
//     index: number
//   ) => {
//     const { name, value } = e.target;

//     // Update the state based on the field changed
//     const updatedQuestions = questionPaper.questions.map((question, i) => {
//       if (i === index) {
//         return {
//           ...question,
//           [name.split("[")[1].split("]")[0]]: value, // Dynamically set property based on name
//         };
//       }
//       return question;
//     });

//     setQuestionPaper((prev) => ({
//       ...prev,
//       questions: updatedQuestions,
//     }));
//   };

//   function getdata(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
//     index: number
//   ) {
//     const { name, value } = e.target;
//     const field = name.match(/\[([a-z_]+)\]/)?.[1];

//     if (field) {
//       setQuestionPaper((prev) => {
//         const updatedQuestions = [...prev.questions];
//         updatedQuestions[index] = {
//           ...updatedQuestions[index],
//           [field]: value,
//         };

//         return {
//           ...prev,
//           questions: updatedQuestions,
//         };
//       });
//     }
//   }

//   function collectData(e: React.FormEvent<HTMLFormElement>) {
//     // e.preventDefault();
//     // console.log('questionPaper', questionPaper);
//     // addQuestionP();
//     e.preventDefault();
//     // console.log(songId.song_id);
//     if (pathname.includes("editquestionpaper")) {
//       // if(songId.song_id!=undefined){
//       console.log("updating");

//       // console.log(songId.song_id);

//       updQuestionPaper();
//     } else {
//       console.log("adding");
//       addQuestionP();
//     }
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: "600px",
//         margin: "auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         backgroundColor: "black",
//         color: "white",
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Add Question Paper
//       </Typography>
//       <form id="questionPaperForm" onSubmit={collectData}>
//         <TextField
//           fullWidth
//           label="Subject"
//           variant="outlined"
//           name="sub_name"
//           value={questionPapers?.sub_name}
//           onChange={(e) =>
//             setQuestionPaper((prev) => ({ ...prev, sub_name: e.target.value }))
//           }
//           sx={{
//             "& .MuiInputBase-input": {
//               color: "white", // Input text color
//             },
//             "& .MuiInputLabel-root": {
//               color: "white", // Label text color
//             },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "white", // Border color
//               },
//               "&:hover fieldset": {
//                 borderColor: "white", // Hover border color
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "white", // Focused border color
//               },
//             },
//           }}
//           required
//           margin="normal"
//         />

//         <Typography variant="h5" component="h2" gutterBottom>
//           Questions
//         </Typography>

//         {/* {questionPapers?.questions.map((question, index) => (
//           <QuestionField
//             key={index}
//             getdata={handleDataChange}
//             index={index}
//             question={question}
//           />
//         ))} */}
//         {qf}

//         <Box my={2}>
//           <Button
//             variant="contained"
//             color="warning"
//             onClick={addQuestion}
//             fullWidth
//           >
//             Add Another Question
//           </Button>
//         </Box>

//         <Button type="submit" variant="contained" color="secondary" fullWidth>
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// }



