
import React from 'react';
import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { Question } from '../../class/question';

let sx = {
  '& .MuiInputBase-input': {
    color: 'white', // Input text color
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label text color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Focused border color
    },
  },
};

interface QuestionFieldProps {
  control: Control<any>;
  index: number;
  question?: Question;
}

export default function QuestionField({ control, index, question }: QuestionFieldProps) {
  return (
    <Box mb={4} p={2} border={1} borderColor="grey.300" borderRadius={2}>
      <Controller
        name={`questions[${index}].question`}
        control={control}
        defaultValue={question?.question || ''}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={`Question ${index + 1}`}
            variant="outlined"
            required
            sx={sx}
            margin="normal"
          />
        )}
      />

      <FormControl fullWidth variant="outlined" margin="normal" required sx={sx}>
        {/* <InputLabel id={`answer-type-label-${index}`}>Answer Type</InputLabel> */}
      
        <Controller
          name={`questions[${index}].answer_type`}
          control={control}
          defaultValue={question?.answer_type || ''}

          render={({ field }) => (
            <select
              {...field}
              id={`answer-type-label-${index}`}
              
              style={{
                color: 'white',
                backgroundColor: 'black',
                borderColor: 'white',
                padding: '10px',
                borderRadius: '4px',
                width: '100%',
                height: '56px',
                fontSize: '16px',
              }}
            >
              
              <option value="MCQ">MCQ</option>
              <option value="True/False">True/False</option>
              <option value="Description">Description</option>
            </select>
          )}
        />
      </FormControl>

      <Controller
        name={`questions[${index}].answer_choice`}
        control={control}
        defaultValue={question?.answer_choice || ''}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Answer Choices"
            variant="outlined"
            sx={sx}
            margin="normal"
          />
        )}
      />

      <Controller
        name={`questions[${index}].marks_alloted`}
        control={control}
        
        defaultValue={question?.marks_alloted || 0}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="number"
            label="Marks Allotted"
            variant="outlined"
            required
            sx={sx}
            margin="normal"
          />
        )}
      />
    </Box>
  );
}






// import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
// import React from 'react';
// import { Question } from '../../class/question';

// // interface QuestionFieldProps {
// //   getdata: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
// //   index: number;
// // }

// let sx={
//   '& .MuiInputBase-input': {
//     color: 'white', // Input text color
//   },
//   '& .MuiInputLabel-root': {
//     color: 'white', // Label text color
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'white', // Border color
//     },
//     '&:hover fieldset': {
//       borderColor: 'white', // Hover border color
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'white', // Focused border color
//     },
//   },
// }
// interface QuestionFieldProps {
//   getdata: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement > , index: number) => void;
//   index: number;
//   question?: Question;
// }

// export default function QuestionField({ getdata, index, question }: QuestionFieldProps) {
//   return (
    
//     <Box mb={4} p={2} border={1} borderColor="grey.300" borderRadius={2}>
//     <TextField
//       fullWidth
//       label={`Question ${index + 1}`}
//       variant="outlined"
//       name={`questions[${index}][question]`}
//       onChange={(e) => getdata(e, index)}
//       required
//       value={question?.question}
//       margin="normal"
//       sx={sx}
//     />
//     <FormControl fullWidth variant="outlined" margin="normal" required sx={sx}>
//   <InputLabel id={`answer-type-label-${index}`}>Answer Type</InputLabel>
//   <select
//     id={`answer-type-label-${index}`}
//     name={`questions[${index}][answer_type]`}
//     value={question?.answer_type}
//     onChange={(e) => getdata(e, index)}
    
//   >
//     <option value="MCQ">MCQ</option>
//     <option value="True/False">True/False</option>
//     <option value="Description">Description</option>
//   </select>
// </FormControl>
//     <TextField
//       fullWidth
//       label="Answer Choices"
//       variant="outlined"
//       name={`questions[${index}][answer_choice]`}
//       onChange={(e) => getdata(e, index)}
      
//       value={question?.answer_choice}
//       sx={sx}
//       margin="normal"
//     />
//     <TextField
//       fullWidth
//       type="number"
//       label="Marks Allotted"
//       variant="outlined"
//       name={`questions[${index}][marks_alloted]`}
//       onChange={(e) => getdata(e, index)}
//       required
//       value={question?.marks_alloted}
//       sx={sx}
//       margin="normal"
//     />
//   </Box>
//   );
// }
