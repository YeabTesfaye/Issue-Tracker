import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import Pagination from '@/components/Pagination';

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status =
    params.status && statuses.includes(params.status)
      ? params.status
      : undefined;

  const where = { status };

  const orderBy =
    params.orderBy && columnNames.includes(params.orderBy)
      ? { [params.orderBy]: 'asc' }
      : undefined;

  const page = parseInt(params.page || '1');
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={params} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export default IssuesPage;
