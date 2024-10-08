import { useContext } from "react";
import { PostsContext } from "../context/postsContext";
import { MenuItem, Select } from "@mui/material";

// Child of ForumPage.tsx
const SortSelect = () => {
  const { posts, sortOption, handleChangeSortOption } = useContext(PostsContext);

  return (
    <Select
      id="sort-select"
      value={sortOption}
      onChange={(e) => handleChangeSortOption(e)}
      className="hover:bg-gray-200"
      sx={{ "& fieldset": { border: "0px solid black" }, fontSize: "0.875rem", borderRadius: "9999px", width: "80px" }}
      disabled={posts && posts.length < 2}
    >
      <MenuItem disabled sx={{ color: "black" }}>
        Sort by
      </MenuItem>
      <MenuItem value={"new"}>New</MenuItem>
      <MenuItem value={"old"}>Old</MenuItem>
      <MenuItem value={"top"}>Top</MenuItem>
    </Select>
  );
};

export default SortSelect;
