import 'dotenv/config';
import { BacklogClient } from './backlog.js';

const main = async () => {
  try {
    const backlogClient = new BacklogClient(
      process.env.BASE_URL ?? '',
      process.env.API_KEY ?? '',
    );

    const originProject = await backlogClient.getProject(
      process.env.PROJECT_KEY ?? '',
    );
    const issues = await backlogClient.getIssues({
      projectId: [originProject.id],
    });
    const targetIssues = issues
      .filter(
        (issue) =>
          issue.createdUser.id === +(process.env.CREATED_USER_ID ?? '') &&
          issue.status.name !== '完了',
      )
      .map(({ summary, issueKey }) => ({ issueKey, summary }));

    console.log('targetIssues', targetIssues);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
