import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { MenuItem, Select } from "@mui/material";
import { Forum, ForumUserRelation } from "../../types/globals";

// Child of CreatePost.tsx
const ForumSelect = () => {
  const { user } = useContext(UserContext);
  const [forums, setForums] = useState<Forum[]>([]);

  useEffect(() => {
    setForums([]);
    getSubscribedForums();
  }, [user]);

  /**
   * Get all forums to which the current user is subscribed to.
   */
  const getSubscribedForums = async () => {
    try {
      const forumUserRelations = await getForumUserRelationsByUserId();

      if (!forumUserRelations) return;

      forumUserRelations.forEach((relation: ForumUserRelation) => {
        getForumById(relation.forum_id);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  /**
   * Get all forum_user relations by user_id, where user_id is the id of the current user.
   */
  const getForumUserRelationsByUserId = async (): Promise<ForumUserRelation[] | undefined> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/subscribers/user/${user?.id}`);
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  /**
   * Get all forum_user relations by user_id, where user_id is the id of the current user.
   */
  const getForumById = async (forumId: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/id/${forumId}`);
      const data: Forum = await res.json();
      setForums([...forums, data]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Select
      id="sort-select"
      value={"new"}
      // onChange={(e) => handleChangeSortOption(e)}
      className="hover:bg-gray-200"
      sx={{ "& fieldset": { border: "0px solid black" }, fontSize: "0.875rem", borderRadius: "9999px", width: "80px" }}
      // disabled={posts && posts.length < 2}
    >
      <MenuItem disabled sx={{ color: "black" }}>
        Subscribed forums
      </MenuItem>
      {forums.map((forum: Forum) => (
        <MenuItem value={forum.name}>{forum.name}</MenuItem>
      ))}
      {/* <MenuItem value={"new"}>New</MenuItem> */}
      {/* <MenuItem value={"old"}>Old</MenuItem> */}
      {/* <MenuItem value={"top"}>Top</MenuItem> */}
    </Select>
  );
};

export default ForumSelect;
