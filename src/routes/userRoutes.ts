const express = require('express');
const router = express.Router();
const {
  getCurrentUsage,
  billingSummary
} =require ("../controller/userController");

router.get("/users/:id/current-usage", getCurrentUsage);
router.get("/users/:id/billing-summary", billingSummary);

export = router;
