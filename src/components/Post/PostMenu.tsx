import { BsThreeDots } from "react-icons/bs";

// Child of PostCard
const PostMenu = () => {
  return (
    <div
      className="flex items-center justify-center pl-1 pr-1 rounded-full hover:bg-gray-400"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <BsThreeDots />
    </div>
  );
};

export default PostMenu;
