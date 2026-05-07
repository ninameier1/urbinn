// import NavLink from "./NavLink";
// import AccountDropdown from "./AccountDropdown";

// type CmsNavProps = {
//   username: string;
// };

// export default function CmsNav({ username, }: CmsNavProps) {
//   return (
//     <nav className="flex h-full items-center divide-x divide-white/20">
//       <NavLink href="/cms">CMS</NavLink>
//       <NavLink href="/cms/municipalities">Alle gemeenten</NavLink>
//       <NavLink href="/cms/new">Nieuwe gemeente</NavLink>
//       <AccountDropdown username={username} />
//     </nav>
//   );
// }

import NavLink from "./NavLink";
import AccountDropdown from "./AccountDropdown";

type CmsNavProps = {
  username: string;
};

export default function CmsNav({ username }: CmsNavProps) {
  return (
    <nav className="flex h-full flex-1 items-center justify-between">
      <div className="flex h-full items-center divide-x divide-secondary">
        <NavLink href="/cms">
        CMS
        </NavLink>
        <NavLink href="/cms/municipalities">
          Alle gemeenten
        </NavLink>
        <NavLink href="/cms/new">
          Nieuwe gemeente
        </NavLink>
      </div>

      <div className="flex h-full items-center border-l border-secondary">
        <AccountDropdown username={username} />
      </div>
    </nav>
  );
}