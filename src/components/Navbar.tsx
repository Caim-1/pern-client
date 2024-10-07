import { Link } from "react-router-dom";
import { User } from "../types/globals";
import Blank_Pfp from "../assets/Blank_Pfp.png";

type Props = {
  user: User | null;
};

const Navbar = ({ user }: Props) => {
  return (
    <header className="flex items-center h-16 p-4">
      <nav className="flex justify-between w-full">
        <Link to={"/"}>Home</Link>
        {user && (
          <Link to={`/user/${user.id}`}>
            <div className="flex gap-4">
              <span>User</span>
              <img src={Blank_Pfp} alt="" className="w-8 h-8 rounded-full" />
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
