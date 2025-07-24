import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaListAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ChefHat } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/restaurant", icon: FaHome },
    { name: "Menu", href: "/restaurant/menu", icon: FaUtensils },
    { name: "Orders", href: "/restaurant/orders", icon: FaListAlt },
    {name: "Restaurant Info", href: "/restaurant/restaurant-info", icon: FaInfoCircle},
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      )}

      <div
        className={`bg-white border-r border-gray-200 h-full fixed md:relative z-40
          transition-all duration-300 ease-in-out
          ${isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : ""}
          ${!isMobile ? (collapsed ? "w-18" : "w-64") : "w-64"}`}
        style={{
          willChange: isMobile ? "transform" : "width",
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 min-w-[4.5rem]">
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Toggle sidebar"
              >
                <FaBars className="h-5 w-5 text-gray-700" />
              </button>
            )}
            {(!collapsed || isMobile) && (
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 ml-2"><ChefHat /></span>
                  {/* <span className="text-black font-bold text-lg mr-24 ml-2">F</span> */}
                </div>
                <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  Foodify
                </span>
              </div>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[3rem] ${
                    isActive
                      ? "bg-orange-50 text-orange-600 border-r-2 border-orange-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                {(!collapsed || isMobile) && (
                  <span className="whitespace-nowrap">{item.name}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;