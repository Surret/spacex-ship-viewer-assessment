import { checkHealth } from '../health';

export const CreateRoutes = app => {
  app.get('/health', async (_, response) => {
    const health = await checkHealth();
    if (!health.ok) {
      return response.status(500).json(health);
    }
    response.json(health);
  });
};
