import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ForumContext } from "../context/forumContext";
import { PostsContext } from "../context/postsContext";
import { getForumNameFromUrl } from "../utils/utility-functions";
import ForumBanner from "../components/Forum/ForumBanner";
import PostCard from "../components/PostCard";
import PostsMissing from "../components/Post/PostsMissing";
import SortSelect from "../components/SortSelect";
import SidebarRight from "../components/SidebarRight";
import ReactLoading from "react-loading";
import { Post } from "../types/globals";

const ForumPage = () => {
  const location = useLocation();
  const { forum, getForum } = useContext(ForumContext);
  const { posts, setPosts, getPosts } = useContext(PostsContext);

  useEffect(() => {
    setupForum();
  }, [location]);

  useEffect(() => {
    if (forum) {
      getPosts(forum.name);
    }
  }, [forum]);

  const setupForum = () => {
    setPosts([]);
    const name = getForumNameFromUrl(location);
    getForum(name);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-5" style={{ margin: "0 auto", minWidth: "1120px" }}>
        {forum ? (
          <>
            <ForumBanner />

            <div className="flex gap-4">
              <main className="flex-1 flex flex-col gap-2 max-w-3xl">
                <SortSelect />

                {posts && (
                  <div className="flex flex-col">
                    {posts.length < 1 && <PostsMissing />}
                    {posts.length > 0 &&
                      posts.map((post: Post, index: number) => (
                        <PostCard post={post} forumName={forum.name} key={`${post}` + index} />
                      ))}
                  </div>
                )}
              </main>

              {posts && <SidebarRight numberOfPosts={posts.length} />}
            </div>
          </>
        ) : (
          <ReactLoading type={"spin"} color={"black"} height={64} width={64} className="m-auto" />
        )}
      </div>
    </div>
  );
};

export default ForumPage;
