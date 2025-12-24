import type { Request, Response } from "express";
const {
  getCurrentMonthUsage,
  getBillingSummary
} = require("../models/userModel");

const getCurrentUsage = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const data = await getCurrentMonthUsage(userId);

    if (!data) {
      return res.status(404).json({ message: "Active plan not found" });
    }

    const remainingUnits = Math.max(
      data.monthly_quota - data.totalUsed,
      0
    );

    res.json({
      totalUsed: data.totalUsed,
      remainingUnits,
      plan: {
        id: data.planId,
        name: data.planName,
        monthlyQuota: data.monthly_quota
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const billingSummary = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const data = await getBillingSummary(userId);

    if (!data) {
      return res.status(404).json({ message: "Active plan not found" });
    }

    const extraUnits = Math.max(
      data.totalUsage - data.monthly_quota,
      0
    );

    const extraCharges = Number(
      (extraUnits * data.extra_charge_per_unit).toFixed(2)
    );

    res.json({
      totalUsage: data.totalUsage,
      planQuota: data.monthly_quota,
      extraUnits,
      extraCharges,
      plan: {
        name: data.planName,
        extraChargePerUnit: data.extra_charge_per_unit
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export = { billingSummary, getCurrentUsage };
