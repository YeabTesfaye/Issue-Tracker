import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

const Link = ({ children, href }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
