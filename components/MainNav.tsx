import NavLink from "./NavLink";

export default function MainNav() {
  return (
    <nav className="flex h-full items-center divide-x divide-white/20">
        <NavLink href="/gemeenten">Gemeenten</NavLink>
        <NavLink href="/urban-innovation">Urban Innovation</NavLink>
        <NavLink href="/onderzoeken">Onderzoeken</NavLink>
    </nav>
  );
}