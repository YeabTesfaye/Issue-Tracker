'use client';

import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import AuthStatus from './AuthStatus';
import Navlinks from './Navlinks';

const NavBar = () => {
  return (
    <nav className="  border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <Navlinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
