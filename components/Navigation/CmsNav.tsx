import NavLink from "./NavLink";
import AccountDropdown from "./AccountDropdown";
import MunicipalityDropdown from "./MunicipalityDropdown";
import PublicationsDropdown from "./PublicationsDropdown";

type CmsNavProps = {
  userLabel: string;
};

export default function CmsNav({ userLabel }: CmsNavProps) {
  return (
    <nav className="flex h-full flex-1 items-center justify-between">
      <div className="flex h-full items-center divide-x divide-secondary">
        <NavLink href="/cms">
        CMS
        </NavLink>
        <MunicipalityDropdown />
        <PublicationsDropdown />
      </div>

      <div className="flex h-full items-center border-l border-secondary">
        <AccountDropdown userLabel={ userLabel} />
      </div>
    </nav>
  );
}