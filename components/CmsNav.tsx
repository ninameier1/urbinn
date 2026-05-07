import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";

export default function CmsNav() {
  return (
    <nav className="flex h-full items-center divide-x divide-white/20">
        <NavLink href="/cms/municipalities">Alle gemeenten</NavLink>
        <NavLink href="/cms/new">Nieuwe gemeente</NavLink>
        <LogoutButton />
    </nav>
  );
}