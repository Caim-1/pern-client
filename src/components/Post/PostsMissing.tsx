import Missing from "../../assets/Missing.png";

const PostsMissing = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <span className="font-bold text-3xl">There are no posts in this community.</span>
      <img src={Missing} alt="Missing posts icon" style={{ height: "128px", width: "128px" }} />
    </div>
  );
};

export default PostsMissing;
