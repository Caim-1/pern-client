import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { formatDateSince } from "../utils/utility-functions";
import { Post, User } from "../types/globals";
import Blank_Pfp from "../assets/Blank_Pfp.png";

type Props = {
  post: Post;
};
const PostUserInfo = ({ post }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${post.user_id}`, {
        method: "GET",
      });
      const data = await res.json();
      setUser(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const formatDate = (): string => {
    const [yyyy, mm, dd, hh, mi] = post.created_at.split(/[/:\-T]/);
    const formattedDate = `${dd}-${mm}-${yyyy} ${hh}:${mi}`;

    return formattedDate;
  };

  return (
    <div className="flex gap-2 items-center">
      <Link
        to={`/user/${user?.id}`}
        className="flex gap-2 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={Blank_Pfp} alt="User profile picture" className="w-6 h-6 rounded-full" />
        <div className="font-bold">{user?.username}</div>
      </Link>
      <Tooltip title={formatDate()} placement="top">
        <div className="text-xs">{formatDateSince(post.created_at)} ago</div>
      </Tooltip>
    </div>
  );
};

export default PostUserInfo;
