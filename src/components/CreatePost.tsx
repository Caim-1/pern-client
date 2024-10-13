import { useState } from "react";
import ForumSelect from "./Forum/ForumSelect";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import InputField from "./InputField";

const CreatePost = () => {
  const [category, setCategory] = useState<string | null>("text");
  const [title, setTitle] = useState<string>("");

  const handleCategory = (event: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
    setCategory(newCategory);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-5" style={{ margin: "0 auto", minWidth: "1120px" }}>
        <div className="flex gap-4">
          <main className="flex-1 flex flex-col gap-4 max-w-3xl">
            <h2 id="modal-modal-title" className="font-bold text-2xl">
              Create post
            </h2>
            <ForumSelect />

            <InputField value={title} handleChange={setTitle} type="text" inputName="title" required />

            <div>
              <ToggleButtonGroup value={category} exclusive onChange={handleCategory} className="flex gap-4">
                <ToggleButton value="text" sx={{ border: "none" }}>
                  Text
                </ToggleButton>
                <ToggleButton value="images" sx={{ border: "none" }}>
                  Images
                </ToggleButton>
                <ToggleButton value="link" sx={{ border: "none" }}>
                  Link
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
