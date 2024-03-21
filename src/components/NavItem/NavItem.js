import Link from "next/link";
const NavItem = ({ text, href}) => {
  return (
    <Link href={href}>
      {text}
    </Link>
  );
};

export default NavItem;
