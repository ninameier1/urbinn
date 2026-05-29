import NavLink from "./NavLink";
import AccountDropdown from "./AccountDropdown";
import Dropdown from "./Dropdown";

type CmsNavProps = {
  userLabel: string;
};

export default function CmsNav({ userLabel }: CmsNavProps) {
  return (
    <nav className="flex h-full flex-1 items-center justify-between">
      <div className="flex h-full items-center divide-x divide-secondary">
        <NavLink href="/cms">
        CMS Home
        </NavLink>

        <Dropdown
          title="Gemeenten"
          baseHref="/cms/municipalities"
          links={[
            { href: "/cms/municipalities", label: "Alle gemeenten", },
            { href: "/cms/municipalities/new", label: "Nieuwe gemeente", },
          ]}
        />

        <Dropdown
          title="Publicaties"
          baseHref="/cms/publications"
          links={[
            { href: "/cms/publications", label: "Alle publicaties", },
            { href: "/cms/publications/new", label: "Nieuwe publicatie", },
          ]}
        />

        <Dropdown
          title="Partners"
          baseHref="/cms/partners"
          links={[
            { href: "/cms/partners", label: "Alle partners", },
            { href: "/cms/partners/new", label: "Nieuwe partner", },
          ]}
        />
      </div>

      <div className="flex h-full items-center border-l border-secondary">
        <AccountDropdown userLabel={ userLabel} />
      </div>
    </nav>
  );
}