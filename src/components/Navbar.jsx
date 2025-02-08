import { useAuth, useUser } from "@clerk/clerk-react";
import {
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/" },
    {
      title: "All Inventory",
      icon: <Users className="w-5 h-5" />,
      path: "/inventory",
    },
    {
      title: "Contact",
      icon: <HelpCircle className="w-5 h-5" />,
      path: "/contact",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <button
        className="fixed p-2 text-gray-600 bg-white rounded-lg shadow-lg top-4 left-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <nav
        className={`fixed top-0 left-0 z-40 h-screen bg-blue-600 transition-transform duration-300 shadow-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col items-center justify-center h-20 border-b border-white/20 px-4 text-white">
          {user ? (
            <>
              <p className="text-lg font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-300">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold">Guest</p>
          )}
        </div>
        <div className="p-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors group
                ${
                  location.pathname === item.path
                    ? "bg-white text-blue-600"
                    : "text-white hover:bg-gray-100"
                }`}
            >
              <span
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "group-hover:text-blue-600"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`ml-4 text-md font-medium ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "group-hover:text-blue-600"
                }`}
              >
                {item.title}
              </span>
            </button>
          ))}
          {user && (
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-3 mt-4 text-white rounded-lg hover:bg-red-100 transition-colors group"
            >
              <LogOut className="w-5 h-5 group-hover:text-red-600" />
              <span className="ml-4 text-md font-medium group-hover:text-red-600">
                Logout
              </span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
