import NavLink from "./NavLink";

export default function MainNav() {
  return (
    <nav className="flex items-center gap-2">
        <NavLink href="/gemeenten">Gemeenten</NavLink>
        <NavLink href="/urban-innovation">Urban Innovation</NavLink>
        <NavLink href="/onderzoeken">Onderzoeken</NavLink>
    </nav>
  );
}