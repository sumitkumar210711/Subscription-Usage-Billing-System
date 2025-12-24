const {pool} =require('../config/dbConfig')

const createUsage = async (
  userId: number,
  action: string,
  usedUnits: number
) => {
  try{
  const query = `
    INSERT INTO usage_records (user_id, action, used_units, created_at)
    VALUES (?, ?, ?,?)
  `;

  const [result] = await pool.execute(query, [
    userId,
    action,
    usedUnits,
    new Date()
  ]);

  return result;
}
catch(error){
  return error;
}
};

export = {
  createUsage
};
