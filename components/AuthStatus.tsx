import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Skeleton } from '@/components';

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status == 'loading') return <Skeleton width="3rem" />;
  if (status === 'unauthenticated') {
    return (
      <button className="nav-link" onClick={() => signIn()}>
        Log in
      </button>
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user!.image!}
            radius="full"
            size="2"
            fallback="?"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <button onClick={() => signOut()}>Log out</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
