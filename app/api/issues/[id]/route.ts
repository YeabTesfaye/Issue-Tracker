import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // // Step 1: Get the session and return 401 if not authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  // Step 2: Parse and validate the request body
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Step 3: Extract and parse the ID from the URL parameters
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
  }

  // Step 4: Destructure the fields from the validated body
  const { assignedToUserId, title, description, status } = body;

  // Step 5: Check if assignedToUserId exists, and validate the user
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
    }
  }

  // Step 6: Retrieve the issue and check if it exists
  const issue = await prisma.issue.findUnique({
    where: { id: parsedId },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });
  }

  // Step 7: Update the issue with the new data
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  // Step 8: Return the updated issue
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = (await params).id;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parsedId },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

  await prisma.issue.delete({
    where: { id: parsedId },
  });
  return new NextResponse(null, { status: 204 });
}
