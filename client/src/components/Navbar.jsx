import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice.js";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
    navigate("/login");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Dim background overlay when user menu open */}
      {userMenuOpen && (
        <div className="fixed inset-0 bg-opacity-0 z-10 pointer-events-auto"></div>
      )}

      <nav className="bg-blue-600 text-white shadow-md relative z-20">
        <div className="mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="font-bold text-xl"
            onClick={() => {
              setMenuOpen(false);
              setUserMenuOpen(false);
            }}
          >
            Subscription Dashboard
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {user ? (
              <>
                <Link to="/plans" className="hover:underline">
                  Plans
                </Link>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin/subscriptions" className="hover:underline">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* User Info + Dropdown */}
          <div ref={userMenuRef} className="relative">
            {user && (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 cursor-pointer select-none"
              >
                <span className="text-sm font-medium">
                  👤 {user.name || user.email.split("@")[0]}
                </span>
              </button>
            )}

            {/* Dropdown for Logout */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 w-44 z-30">
                <div className="px-4 py-2 border-b text-sm text-gray-700">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden ml-4"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setUserMenuOpen(false);
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-blue-700 flex flex-col items-center space-y-3 py-3">
            {user ? (
              <>
                <Link
                  to="/plans"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Plans
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin/subscriptions"
                    onClick={() => setMenuOpen(false)}
                    className="hover:underline"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
