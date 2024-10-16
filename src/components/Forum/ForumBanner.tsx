import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ForumContext } from "../../context/forumContext";
import Default_banner from "../../assets/Default_banner.jpg";
import Default_icon from "../../assets/Default_icon.png";
import ReactLoading from "react-loading";

// Child of ForumPage.tsx
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
      <div className="flex justify-between relative h-20 pl-5 pr-5" style={{ top: "-30px" }}>
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
          <button className="text-sm" style={{ minHeight: 40, minWidth: 86 }} onClick={() => navigate(`/submit`)}>
            Create Post
          </button>
          <button style={{ minHeight: 40, minWidth: 86 }} onClick={() => subscribeToForum()} disabled={loading}>
            {loading ? (
              <ReactLoading type={"spin"} color={"black"} height={16} width={16} className="m-auto" />
            ) : (
              <>{userIsSubscribed ? "Joined" : "Subscribe"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumBanner;
