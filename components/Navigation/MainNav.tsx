import NavLink from "./NavLink";
import ResearchDropdown from "./ResearchDropdown";
import ConsortiumDropdown from "./ConsortiumDropdown";

import { prisma } from '@/lib/prisma';

  const partners = await prisma.partner.findMany({
  select: { id: true, name: true },
  orderBy: { name: 'asc' },
  });

export default function MainNav() {

  return (
    <nav className="flex h-full items-center divide-x divide-secondary">
        <ResearchDropdown />
        <ConsortiumDropdown partners={partners} />
        <NavLink href="/gemeenten">Gemeenten</NavLink>
    </nav>
  );
}