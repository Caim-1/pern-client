import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ForumContext } from "../../context/forumContext";
import { Button } from "@mui/material";
import Default_banner from "../../assets/Default_banner.jpg";
import Default_icon from "../../assets/Default_icon.png";

const ForumBanner = () => {
  const navigate = useNavigate();
  const { forum, subscribeToForum, checkIfUserIsSubscribed, userIsSubscribed, loading } = useContext(ForumContext);

  useEffect(() => {
    checkIfUserIsSubscribed();
  }, [forum]);

  return (
    <div className="w-full" style={{ height: "200px" }}>
      <div className="h-36">
        <img src={Default_banner && Default_banner} alt="" className="h-full w-full object-cover rounded-lg" />
      </div>
      <div className="flex justify-between relative h-20 pl-5 pr-5" style={{ top: "-40px" }}>
        <div className="flex gap-4 items-end">
          <img
            src={Default_icon && Default_icon}
            alt="Forum icon"
            className="w-20 h-20 rounded-full"
            style={{ border: "2px solid black" }}
          />
          <span className="font-bold text-3xl">{forum?.name}</span>
        </div>

        <div className="flex items-end gap-4">
          <Button variant="outlined" onClick={() => navigate(`/forum/${forum?.name}/submit`)} style={{ minWidth: 86 }}>
            Create Post
          </Button>
          <Button variant="outlined" onClick={() => subscribeToForum()} style={{ minWidth: 86 }} disabled={loading}>
            {userIsSubscribed ? "Joined" : "Subscribe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumBanner;
