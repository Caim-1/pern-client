import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ForumContext } from "../context/forumContext";
import { PostsContext } from "../context/postsContext";
import ForumBanner from "../components/Forum/ForumBanner";
import PostCard from "../components/PostCard";
import PostsMissing from "../components/Post/PostsMissing";
import SortSelect from "../components/SortSelect";
import SidebarRight from "../components/SidebarRight";

const ForumPage = () => {
  const location = useLocation();
  const { forum, getForum } = useContext(ForumContext);
  const { posts, setPosts, getPosts } = useContext(PostsContext);

  useEffect(() => {
    setPosts([]);
    const path = location.pathname;
    const pathSplit = path.split("/");
    const forumNameFromURL = pathSplit[2];
    getForum(forumNameFromURL);
  }, [location]);

  useEffect(() => {
    if (forum) {
      getPosts(forum.name);
    }
  }, [forum]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-5" style={{ margin: "0 auto", minWidth: "1120px" }}>
        <ForumBanner />

        <div className="flex gap-4">
          <main className="flex-1 flex flex-col gap-2 max-w-3xl">
            <SortSelect />

            {posts && (
              <div className="flex flex-col">
                {posts.length < 1 && <PostsMissing />}
                {posts.length > 0 &&
                  posts.map((post: any, index: number) => <PostCard post={post} key={`${post}` + index} />)}
              </div>
            )}
          </main>

          {forum && posts && <SidebarRight forum={forum} numberOfPosts={posts.length} />}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
