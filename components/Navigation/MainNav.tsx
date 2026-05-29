import NavLink from "./NavLink";
import Dropdown from "./Dropdown";
import ConsortiumDropdown from "./ConsortiumDropdown";

import { prisma } from '@/lib/prisma';

  const partners = await prisma.partner.findMany({
  select: { id: true, name: true },
  orderBy: { name: 'asc' },
  });

export default function MainNav() {

  return (
    <nav className="flex h-full items-center divide-x divide-secondary">
      <Dropdown
        title="Het Onderzoek"
        baseHref="/onderzoek"
        links={[
          { href: "/onderzoek", label: "GLOW", },
          { href: "/onderzoek/themas", label: "Onderzoeksthema's", },
          { href: "/onderzoek/publicaties", label: "Publicaties", },
          { href: "/onderzoek/ontstaan", label: "Ontstaan", },
        ]}
      />
        <ConsortiumDropdown partners={partners} />
        <NavLink href="/gemeenten">Gemeenten</NavLink>
    </nav>
  );
}