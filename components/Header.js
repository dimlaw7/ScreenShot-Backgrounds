import { CloudUpload } from "lucide-react";
import Link from "next/link";

const Header = ({ uploadRef }) => {
  const handleUploadBtn = () => {
    uploadRef.current.click();
  };
  return (
    <header className="flex h-21 items-center px-5 sm:px-10 xl:px-30">
      <nav className="flex flex-1 items-center justify-between">
        <Link
          href="/"
          className="truncate text-lg font-extrabold tracking-normal text-gray-950 lg:text-2xl"
        >
          ScreenShotBG
        </Link>
        <div>
          <button
            className="text-background border--gray-900 flex cursor-pointer items-center gap-2 rounded-lg border-2 bg-gray-950 px-7 py-3 text-base font-semibold shadow-xl transition hover:bg-gray-800"
            onClick={() => handleUploadBtn()}
          >
            <span>Upload</span>
            <CloudUpload size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
