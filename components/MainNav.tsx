import NavLink from "./NavLink";

const MainNav = () => {
  return (
    <nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/gemeenten">Gemeenten</NavLink>
        <NavLink href="/information">Informatie</NavLink>
    </nav>
  );
};

export default MainNav;