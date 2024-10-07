import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import PostCard from "../components/PostCard";
import PostsMissing from "../components/Post/PostsMissing";
import SortSelect from "../components/SortSelect";
import usePosts from "../hooks/usePosts";
import useForum from "../hooks/useForum";
import Default_banner from "../assets/Default_banner.jpg";
import Default_icon from "../assets/Default_icon.png";
import SidebarRight from "../components/SidebarRight";

const ForumPage = () => {
  const location = useLocation();
  const { forum, getForum, subscribeToForum } = useForum();
  const { posts, setPosts, getPosts, sortOption, handleChangeSortOption } = usePosts();

  useEffect(() => {
    setPosts([]);
    const path = location.pathname;
    const pathSplit = path.split("/");
    const forumNameFromURL = pathSplit[2];
    getForum(forumNameFromURL);
  }, [location]);

  // useEffect(() => {
  //   if (forum) {
  //     getPosts(forum.name);
  //   }
  // }, [forum]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-5" style={{ margin: "0 auto", minWidth: "1120px" }}>
        <div className="w-full" style={{ height: "200px" }}>
          <div className="h-36">
            <img src={Default_banner} alt="" className="h-full w-full object-cover rounded-lg" />
          </div>
          <div className="flex justify-between relative h-20 pl-5 pr-5" style={{ top: "-40px" }}>
            <div className="flex gap-4 items-end">
              <img
                src={Default_icon}
                alt="Forum icon"
                className="w-20 h-20 rounded-full"
                style={{ border: "2px solid black" }}
              />
              <span className="font-bold text-3xl">{forum?.name}</span>
            </div>

            <div className="flex items-end gap-4">
              <Button variant="outlined" onClick={() => console.log("Create")} style={{ minWidth: 86 }}>
                Create Post
              </Button>
              <Button variant="outlined" onClick={() => subscribeToForum()} style={{ minWidth: 86 }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Feed */}
          <main className="flex-1 flex flex-col gap-2 max-w-3xl">
            <SortSelect posts={posts} sortOption={sortOption} handleChangeSortOption={handleChangeSortOption} />

            {/* Overview */}
            <div className="flex flex-col">
              {posts.length < 1 && <PostsMissing />}
              {posts.length > 0 &&
                posts.map((post: any, index: number) => <PostCard post={post} key={`${post}` + index} />)}
            </div>
          </main>

          {forum && <SidebarRight forum={forum} numberOfPosts={posts.length} />}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
