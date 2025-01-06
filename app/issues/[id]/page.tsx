import { getIssueById } from '@/actions/issue';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await getServerSession(authOptions);
  const id = (await params).id;
  const issue = await getIssueById(id);
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue}/>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
