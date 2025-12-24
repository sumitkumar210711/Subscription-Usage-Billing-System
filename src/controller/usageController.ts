import type { Request, Response } from "express";
const { createUsage } = require("../models/usageModels");

const addUsage = async (req: Request, res: Response) => {
  try {
    const { userId, action, usedUnits } = req.body;

    if (!userId || !usedUnits) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    await createUsage(userId, action, usedUnits);
    res.json({ message: "Usage recorded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export = { addUsage };
