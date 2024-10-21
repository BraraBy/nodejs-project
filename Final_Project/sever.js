const express = require('express');
const path = require('path');

const app = express();
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/' , (req , res)=>{
    res.render('login');
});

app.get('/index' , (req , res)=>{
    res.render('index');
});

app.get('/buttons' , (req , res)=>{
    res.render('buttons');
});

app.get('/charts' , (req , res)=>{
    res.render('charts');
});

app.get('/forgot-password' , (req , res)=>{
    res.render('forgot-password');
});

app.get('/login' , (req , res)=>{
    res.render('login');
});
 
app.get('/register' , (req , res)=>{
    res.render('register');
});

app.get('/tables' , (req , res)=>{
    res.render('tables');
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});