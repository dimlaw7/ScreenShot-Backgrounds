import { Menu } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-21 items-center px-5">
      <nav className="flex flex-1 items-center justify-between">
        <Link
          href="/"
          className="truncate text-base font-extrabold tracking-normal text-gray-950"
        >
          ScreenShotBG
        </Link>
        <div className="cursor-pointer p-2.5 text-gray-900">
          <Menu size={20} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
