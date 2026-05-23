import NavLink from "./NavLink";
import ResearchDropdown from "./ResearchDropdown";
import ConsortiumDropdown from "./ConsortiumDropdown";

export default function MainNav() {
  return (
    <nav className="flex h-full items-center divide-x divide-secondary">
        <ResearchDropdown />
        <ConsortiumDropdown />
        <NavLink href="/gemeenten">Gemeenten</NavLink>
    </nav>
  );
}