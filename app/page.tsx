import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import React from 'react';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

const Home = async () => {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });

  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};

export default Home;
