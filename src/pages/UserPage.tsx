import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Blank_Pfp from "../assets/Blank_Pfp.png";

const UserPage = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [userCurrentlyLoggedIn, setUserCurrentlyLoggedIn] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const pathSplit = path.split("/");
    const userIdFromURL = parseInt(pathSplit[2]);

    if (user?.id === userIdFromURL) {
      setUserCurrentlyLoggedIn(true);
    } else {
      setUserCurrentlyLoggedIn(false);
    }
  }, []);

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex gap-4" style={{ margin: "0 auto", width: "1200px" }}>
        {/* Feed */}
        <div className="flex-1 flex flex-col gap-4 p-4 max-w-3xl">
          <div className="flex gap-4">
            <img src={Blank_Pfp} alt="" className="w-16 h-16 rounded-full" />
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{user?.username}</div>
              <div className="text-base">{user?.email}</div>
            </div>
          </div>

          {/* Overview */}
          <div className="flex gap-4">
            <div className="p-2 border-black border-2 rounded-2xl">
              <Link to={`/user/${user?.id}`}>Overview</Link>
            </div>
            <div className="p-2 border-black border-2 rounded-2xl">
              <Link to={`/user/${user?.id}/submitted`}>Posts</Link>
            </div>

            <div className="p-2 border-black border-2 rounded-2xl">
              <Link to={`/user/${user?.id}/comments`}>Comments</Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col w-80 gap-2 p-4 border-black border-2 rounded-lg">
          {user?.banner && <div>Banner</div>}
          <div className="font-bold text-base">{user?.username}</div>
          <div className="text-sm">
            Comments: <span className="text-xs">{/* Fetch comments by user.id (foreign key) */}</span>
          </div>
          <div className="text-sm">Posts: {/* Fetch posts by user.id */}</div>
          <div className="text-sm">Joined: {/* user.created_at */}</div>

          {userCurrentlyLoggedIn && <button className="max-w-20 mt-2">Private</button>}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
