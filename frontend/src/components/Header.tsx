import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SignOutButton } from "./SignOutButton";

export const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Destiny.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings"> My Bookings</Link>
              <Link to="/my-hotels"> My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-300 bg-white"
            >
              Sign In
            </Link>
          )}

          {/* <Link to={"/sign-up"} className="text-white font-bold px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">Sign Up</Link>
          <Link to={"/log-in"} className="text-white font-bold px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">Log In</Link>
          <Link to={"/about"} className="text-white font-bold px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">About</Link> */}
        </span>
      </div>
    </div>
  );
};
