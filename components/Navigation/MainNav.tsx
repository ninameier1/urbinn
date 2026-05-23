import NavLink from "./NavLink";

export default function MainNav() {
  return (
    <nav className="flex h-full items-center divide-x divide-secondary">
        <NavLink href="/gemeenten">Gemeenten</NavLink>
        <NavLink href="/onderzoek">Het Onderzoek</NavLink>
        <NavLink href="/consortium">Het Consortium</NavLink>
        <NavLink href="/ontstaan">Het Ontstaan</NavLink>
    </nav>
  );
}