const express = require('express');
const path = require('path');

const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const users = [
    {id:"001" , name:"John"},
    {id:"002", name:"Peter"},
    {id:"003", name:"Jason"}
];


app.get('/index' , (req , res)=>{
    res.render('index' , {msg:"Natathapon Kanghae",title:"i can deverlop my self"});
});

app.get('/:title' , (req , res) => {
    const title = req.params.title
});

app.get('/resume' , (req , res)=>{
    res.render('resume');
});

app.get('/contact' , (req , res)=>{
    res.render('contact');
});

app.get('/projects' , (req , res)=>{
    res.render('projects');
});
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});