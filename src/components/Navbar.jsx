// src/components/Navbar.jsx
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <h1 className="font-bold text-lg">📚 BookLibrary</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <button onClick={logout} className="text-red-500 underline">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
