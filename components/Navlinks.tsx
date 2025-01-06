import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';
const Navlinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;
