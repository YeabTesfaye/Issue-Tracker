'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleValueChange = async (value: string) => {
    const userId = value === 'null' ? null : value;
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId,
      });
      toast.success('Changes Saved correctly');
    } catch (error) {
      console.error('Error updating issue:', error);
      toast.error('Changes could not be saved');
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Select.Root
        value={issue.assignedToUserId?.toString() || 'null'}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id.toString()}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
