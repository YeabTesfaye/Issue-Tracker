import { getIssueById } from '@/actions/issue';
import IssueForm from './IssueFormLoader';


const EditIssuePage = async({params}: {params: Promise<{id:string}>}) => {
  const id = (await params).id
  const issue = await getIssueById(id);
  
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
