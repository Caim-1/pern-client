import ForumSelect from "./Forum/ForumSelect";

const CreatePost = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-5" style={{ margin: "0 auto", minWidth: "1120px" }}>
        <h2 id="modal-modal-title" className="font-bold text-2xl">
          Create post
        </h2>
        <ForumSelect />
      </div>
    </div>
  );
};

export default CreatePost;
