// this file is written with express,JSON body parsing , middleware and routes

const express = require('express');
const app = express();

const tasksRouter = require('./routes/tasks');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger);
app.use('/tasks', tasksRouter);

app.use((req,res,next)=>{
    res.status(404).json({success:false,message:"Not Found"});
});

app.use((err,req,res,next)=>{
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ success:false, message : err.message || "Internal Server Error"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));