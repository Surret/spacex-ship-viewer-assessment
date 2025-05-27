import { db } from './models';

const checkHealth = async () => {
  try {
    await db.sequelize.authenticate();
    return { ok: 1 };
  } catch (error) {
    console.error(error);
    return { ok: 0, error };
  }
};

export { checkHealth };
