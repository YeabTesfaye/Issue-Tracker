'use server';

import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

export async function getIssueById(id: string) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parsedId },
  });
  if (!issue) notFound();
  return issue;
}

export async function deleteIssue(issueId: number): Promise<void> {
  try {
    await prisma.issue.delete({
      where: { id: issueId },
    });
  } catch (error) {
    console.error('Failed to delete issue:', error);
    throw new Error('Could not delete issue');
  }
}
