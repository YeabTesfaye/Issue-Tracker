'use client';
import { issueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Status } from '@prisma/client';
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const statuses: Status[] = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      status: issue?.status || 'OPEN',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        console.log(data);
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      setError('');
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field: { value, onChange } }) => (
            <SimpleMDE
              value={value}
              onChange={onChange}
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* Status Dropdown */}
        <Controller
          name="status"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select.Root value={value} onValueChange={onChange}>
              <Select.Trigger placeholder="Select Status" />
              <Select.Content>
                {statuses.map((status) => (
                  <Select.Item key={status} value={status}>
                    {status}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
