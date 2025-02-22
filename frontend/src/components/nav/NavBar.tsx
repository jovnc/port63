import Link from "next/link";
import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { ProfileMenu } from "./ProfileMenu";
import { auth } from "@/auth";
import { LoginModal } from "../auth/LoginModal";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/shop", label: "Marketplace" },
];

export async function Navbar({}) {
  const session = await auth();

  return (
    <nav className="w-full fixed top-0 left-0 right-0 bg-dark-blue shadow-md z-50">
      <div className="px-10 sm:px-8 lg:px-10">
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-4">
            {/* Desktop menu */}
            {session && <DesktopMenu navItems={navItems} session={session} />}
            {!session && (
              <DesktopMenu navItems={[navItems[0]]} session={session} />
            )}
            {!session?.user && <LoginModal />}

            {/* Mobile menu button */}
            {session?.user && (
              <ProfileMenu
                username={session?.user?.name || ""}
                avatarUrl={session?.user?.image || ""}
              />
            )}
            {session && <MobileMenu navItems={navItems} session={session} />}
            {!session && (
              <MobileMenu navItems={[navItems[0]]} session={session} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
