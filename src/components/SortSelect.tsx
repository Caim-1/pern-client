import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Post } from "../types/globals";

type Props = {
  posts: Post[];
  sortOption: string;
  handleChangeSortOption: (e: SelectChangeEvent<string>) => void;
};

// Child of ForumPage.tsx
const SortSelect = ({ posts, sortOption, handleChangeSortOption }: Props) => {
  return (
    <Select
      id="sort-select"
      value={sortOption}
      onChange={(e) => handleChangeSortOption(e)}
      className="hover:bg-gray-200"
      sx={{ "& fieldset": { border: "0px solid black" }, fontSize: "0.875rem", borderRadius: "9999px", width: "80px" }}
      disabled={posts.length < 2}
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
