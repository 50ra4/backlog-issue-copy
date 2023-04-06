import 'dotenv/config';
import { BacklogClient } from './backlog.js';

const main = async () => {
  try {
    const backlogClient = new BacklogClient(
      process.env.BASE_URL ?? '',
      process.env.API_KEY ?? '',
    );
    const priorities = await backlogClient.getPriorities();
    console.log('result', priorities);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
