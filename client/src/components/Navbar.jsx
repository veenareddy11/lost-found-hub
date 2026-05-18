import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();

  };

  return (

    <nav className="bg-gray-900 text-white px-8 py-5 shadow-lg">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-400">
          Lost & Found Hub
        </h1>

        <div className="flex gap-8 text-xl items-center">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          {!user ? (

            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Register
              </Link>
            </>

          ) : (

            <>
              <Link
                to="/post-item"
                className="hover:text-blue-400 transition"
              >
                Post Item
              </Link>

              <Link
                to="/my-items"
                className="hover:text-blue-400 transition"
              >
                My Items
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;