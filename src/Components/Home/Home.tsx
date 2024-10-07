import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import { Subject } from "../../class/subject";
import React, { useEffect, useState } from "react";
import { getAllSub } from "../../model/subCRUD";
import { Link } from "react-router-dom";
import SubjectList from "./SubjectList";
import Statistic from "./Statistic/Statistic";
export default function Home() {
  let [sub, setSub] = useState<Subject[]>([]);
  async function getsubjects() {
    const result = await getAllSub();
    setSub(result);
  }
  useEffect(() => {
    getsubjects();
  }, []);

  var subList = sub.map((subject, i) => (
    // <List
    //   sx={{ width: "100%", maxWidth: 360, bgcolor: "dark" }}
    //   key={i}
    //   className="list-group-item-dark"
    // >
    <li className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
<Link to={`/singlesubject/${subject.sub_name}`} style={{ textDecoration: 'none', color:'white' }}>{subject.sub_name}</Link></li>
    // </List>
  ));
  return (
    <div className="row m-2">
      
       <div className="col-12 col-md-5 ">
       <SubjectList ></SubjectList></div>

        {/* <SubjectList subList={subList}></SubjectList></div> */}


      <div className="col-12 col-md-7">
        <Statistic />
      </div>
    </div>
  );
}
// import { Box, Stack } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Subject } from '../../class/subject';
// import { getAllSub } from '../../model/subCRUD';

// export default function Home() {
//   const [sub, setSub] = useState<Subject[]>([]);

//   async function getsubjects() {
//     const result = await getAllSub();
//     setSub(result);
//   }

//   useEffect(() => {
//     getsubjects();
//   }, []); // Empty dependency array so it only runs once when the component mounts

//   // Correctly returning the JSX from the map function
//   const subList = sub.map((subject, i) => (
//     <li key={i} className="list-group-item-dark">
//       {subject.sub_name}
//     </li>
//   ));

//   return (
//     <div>
//       <Stack direction="row">
//         <Box sx={{ marginLeft: 2 }}>
//           <ul>{subList}</ul> {/* Wrapped subList inside <ul> */}
//         </Box>
//         <Box sx={{ marginLeft: 2 }}>Count of Subject</Box>
//         <Box sx={{ marginLeft: 2 }}>Question Paper Designs</Box>
//         <Box sx={{ marginLeft: 2 }}>Weekly/Monthly Statistics</Box>
//       </Stack>
//     </div>
//   );
// }
