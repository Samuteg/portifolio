import { Link } from "react-router-dom";
import { House, Toolbox, NotebookTabs, Folders, BriefcaseBusiness, Contact } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-red-800">
      <div className="conteiner mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-red-500 items-center space-x-2 flex"
          >
            Samuel
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className= "text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <House
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to={"/services"}
              className="relative group ext-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <Toolbox
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Services</span>
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1 rounded-full animate-pulse">
                New
              </span>
            </Link>
            <Link
              to={"/skills"}
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <NotebookTabs
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Skills</span>
            </Link>
            <Link
              to={"/projects"}
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <Folders
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Projects</span>
            </Link>
            <Link
              to={"/experiences"}
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <BriefcaseBusiness
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Experiences</span>
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              <Contact
                className="inline-block mr-1 group-hover:text-red-400"
                size={20}
              />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
