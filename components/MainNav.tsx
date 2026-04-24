import Link from 'next/link';

const MainNav = () => {
    return (
        <nav>
            <Link
                href="/gemeenten"
                passHref
                className="hover:text-background px-2 transition duration-300"
            >
                Gemeenten
            </Link>
            <Link
                href="/information"
                passHref
                className="hover:text-background px-2 transition duration-300"
            >
            Informatie
            </Link>
        </nav>
    );
};

export default MainNav;