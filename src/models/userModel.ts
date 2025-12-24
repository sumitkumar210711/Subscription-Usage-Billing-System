const {pool} =require('../config/dbConfig')


const getCurrentMonthUsage = async (userId: number) => {
  
  const query = `
    SELECT
      p.id AS planId,
      p.name AS planName,
      p.monthly_quota,
      COALESCE(SUM(ur.used_units), 0) AS totalUsed
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    LEFT JOIN usage_records ur
      ON ur.user_id = s.user_id
      AND MONTH(ur.created_at) = MONTH(CURRENT_DATE())
      AND YEAR(ur.created_at) = YEAR(CURRENT_DATE())
    WHERE s.user_id = ?
      AND s.is_active = true
    GROUP BY p.id
  `;

  const [rows]: any = await pool.execute(query, [userId]);

  return rows[0];
};


const getBillingSummary = async (userId: number) => {
  const query = `
    SELECT
      p.name AS planName,
      p.monthly_quota,
      p.extra_charge_per_unit,
      COALESCE(SUM(ur.used_units), 0) AS totalUsage
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    LEFT JOIN usage_records ur
      ON ur.user_id = s.user_id
      AND MONTH(ur.created_at) = MONTH(CURRENT_DATE())
      AND YEAR(ur.created_at) = YEAR(CURRENT_DATE())
    WHERE s.user_id = ?
      AND s.is_active = true
    GROUP BY p.id
  `;

  const [rows]: any = await pool.execute(query, [userId]);

  return rows[0];
};

export = {
  getCurrentMonthUsage,
  getBillingSummary
};
