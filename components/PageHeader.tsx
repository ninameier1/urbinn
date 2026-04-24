import Link from 'next/link';
import MainNav from './MainNav';
import Image from "next/image";

const PageHeader = () => {
    return (

        <header className="w-full h-full flex justify-between items-center p-4">
                    <Link href="/">
                        <div className="flex justify-between items-center">
                            <Image
                            src="/assets/images/inno.png"
                            alt="Urban Innovation Logo"
                            width={200}
                            height={48}
                            className="object-contain h-16 w-auto p-1"
                            unoptimized={true}
                            priority
                            />
                            <p className="text-2xl text-white p-4">
                                URBAN INNOVATION
                            </p>
                        </div>
                    </Link>
                <MainNav />
        </header>
    );
};
export default PageHeader;