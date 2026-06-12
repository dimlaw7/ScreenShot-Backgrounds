import { CloudUpload } from "lucide-react";
import Link from "next/link";

const Header = ({ uploadRef }) => {
  const handleUploadBtn = () => {
    uploadRef.current.click();
  };
  return (
    <header className="lg:shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl flex-1 items-center justify-between px-3.5 lg:px-0">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center truncate text-lg font-extrabold tracking-normal text-gray-950 lg:text-2xl"
          >
            <div className="projectlogo mr-0.5"></div>
            ScreenShot<span className="text-primary">BG</span>
          </Link>
          <p className="text-muted hidden text-sm font-semibold lg:block">
            Make your screenshots beautiful
          </p>
        </div>
        <div>
          <button
            className="text-text border--gray-900 bg-surface border-border flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50 hover:shadow"
            onClick={() => handleUploadBtn()}
          >
            <CloudUpload size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
