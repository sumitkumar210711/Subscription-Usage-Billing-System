const express = require('express');
const { addUsage } =require("../controller/usageController");

const router = express.Router();

router.post("/usage", addUsage);

export =(router);
