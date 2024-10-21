import express from 'express'; // Library HTTP request
import dotenv from 'dotenv'; 
dotenv.config({ path: 'setting.env' });  // โหลดไฟล์ setting 

const app = express();
const port = process.env.WEB_PORT;

import curriculumRoutes from './routes/curriculumRoutes.js' ;
import prefixRoutes from './routes/prefixRoutes.js' ;
import sectionRoutes from './routes/sectionRoutes.js' ;
import student_listRoutes from './routes/student_listRoutes.js' ;
import studentRoutes from './routes/studentRoutes.js' ;



app.use(express.json());
 
// Use student routes
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/prefixs', prefixRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/student_list', student_listRoutes);
app.use('/api/student', studentRoutes);


// Start the server
app.listen(port, () => {
  console.log(` Server is running on PORT ${port}`);
});

