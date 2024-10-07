import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateForumModal from "./CreateForumModal";
import { Forum } from "../types/globals";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [forums, setForums] = useState<Forum[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getForums();
  }, []);

  const getForums = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums`, {
        method: "GET",
      });
      const data = await res.json();
      setForums(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-64 border-r-2 border-r-black p-4">
      <div className="flex flex-col gap-4">
        <Link to={"/"} className="pl-4 pr-4">
          Home
        </Link>
        <Link to={"/popular"} className="pl-4 pr-4">
          Popular
        </Link>
        <Link to={"/explore"} className="pl-4 pr-4">
          Explore
        </Link>
        <Link to={"/all"} className="pl-4 pr-4">
          All
        </Link>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <button className="mt-2" onClick={handleOpen}>
          Create a forum
        </button>
        <div className="flex flex-col gap-4">
          {forums.map((forum) => (
            <Link to={`/forum/${forum.name}`} className="pl-4 pr-4" key={forum.id}>
              {forum.name}
            </Link>
          ))}
        </div>
      </div>
      <CreateForumModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Sidebar;
