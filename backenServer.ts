import test = require("node:test");

const express = require('express');
const dotenv = require('dotenv');
const usageRoutes = require('./src/routes/usageRoutes');
const userRoutes = require('./src/routes/userRoutes');
const {testConnection} = require('./src/config/dbConfig');
dotenv.config();
const app = express();

app.use(express.json());

testConnection();

app.use('/api',usageRoutes);
app.use('/api', userRoutes);

const backendPort:unknown = process.env.BACKEND_PORT;

app.listen(backendPort, () =>{
    console.log(`Backend Server is running on ${backendPort}`);
});
