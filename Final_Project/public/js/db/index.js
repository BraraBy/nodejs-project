import express from 'express'; // Library HTTP request
import dotenv from 'dotenv'; 
import cors from 'cors'; // โหลด Middleware
dotenv.config({ path: 'setting.env' });  // โหลดไฟล์ setting 

const app = express();
const port = process.env.WEB_PORT;

app.use(cors());  // ไว้เปิดช่องให้สามารถดึง api จากฝั่งหน้าบ้านได้
app.use(express.json());  // Middleware ให้ระบบรองรับ การรับค่าเข้ามาได้โดยใช้ไฟล์ JSON
app.use(express.urlencoded({ extended: true }));  // Middleware ให้ระบบรองรับ การรับค่าเข้ามาได้โดยใช้ไฟล์ urlencoded


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

