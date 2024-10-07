import { useEffect, useState } from "react";
import { Box, Button, MobileStepper, Modal, TextField } from "@mui/material";
import { grey, red } from "@mui/material/colors";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "1rem",
  width: "768px",
  minHeight: "500px",
};

const CreateForumModal = ({ open, handleClose }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [step, setStep] = useState(0);

  const nameCharLimit = 25;
  const descCharLimit = 500;
  const errorColor = red[700];
  const secondaryColor = grey[500];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (name.length > nameCharLimit) {
      setNameError("Name is too long");
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (description.length > descCharLimit) {
      setDescError("Description is too long");
    } else {
      setDescError("");
    }
  }, [description]);

  const handleStepBack = () => {
    if (step === 0) {
      handleClose();
    } else {
      setStep(step - 1);
    }
  };

  const handleStepNext = async () => {
    if (step === 2) {
      handleSubmit();
      handleClose();
    } else if (step === 0) {
      if (name && nameError === "" && description && descError === "") {
        // Validate
        const forum = await checkIfForumAExists();

        if (forum) {
          return setNameError("Forum with that name already exists.");
        }

        setStep(step + 1);
      } else {
        console.log("Error");
      }
    } else if (step === 1) {
      setStep(step + 1);
    }
  };

  const checkIfForumAExists = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/${name}`);
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      setNameError(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          created_at: new Date().toISOString(),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // setError("");
        // Proceed...
        console.log(data);
      } else {
        // setError(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={{ bgcolor: "rgba(0, 0, 0, 0.1)" }}
    >
      <Box sx={style}>
        {step === 0 && (
          <>
            <div className="mb-8">
              <h2 id="modal-modal-title" className="font-bold text-2xl">
                Describe your forum
              </h2>

              <span style={{ color: secondaryColor }}>
                A name and description allows users to understand what the forum discusses
              </span>
            </div>

            <div className="flex gap-4">
              <div style={{ minWidth: "55%" }}>
                <div className="flex flex-col pt-3 pb-3">
                  <TextField
                    id="outlined-basic"
                    label="Forum name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    error={nameError ? true : false}
                    required
                  />
                  <div className="flex justify-between p-1 text-xs">
                    <span style={nameError ? { color: errorColor } : { color: secondaryColor }}>{nameError}</span>
                    <span style={name.length > nameCharLimit ? { color: errorColor } : { color: secondaryColor }}>
                      {name.length}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pt-3 pb-3">
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => handleDescChange(e)}
                    error={descError ? true : false}
                    multiline
                    rows={6}
                    required
                  />
                  <div className="flex justify-between p-1 text-xs">
                    <span style={descError ? { color: "error.main" } : { color: "text.secondary" }}>{descError}</span>
                    <span
                      style={description.length > descCharLimit ? { color: errorColor } : { color: secondaryColor }}
                    >
                      {description.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span>{name}</span>
                <span>1 subscriber</span>
                <span>{description}</span>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="mb-8">
              <h2 id="modal-modal-title" className="font-bold text-2xl">
                Style your forum
              </h2>

              <span style={{ color: secondaryColor }}>
                Add an image and banner to personalize your forum. Can be added and changed at a later time.
              </span>
            </div>

            <div className="flex gap-4">
              <span>Icon </span>
              <span>Banner </span>
            </div>
          </>
        )}

        <div className="flex justify-between mt-auto">
          <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            sx={{ width: "100%", flexGrow: 1 }}
            activeStep={step}
            backButton={
              <Button variant="outlined" onClick={handleStepBack} style={{ minWidth: 86 }}>
                {step === 0 ? "Cancel" : "Back"}
              </Button>
            }
            nextButton={
              <Button
                variant="outlined"
                onClick={handleStepNext}
                style={{ minWidth: 86 }}
                disabled={name && description ? false : true}
              >
                {step === 2 ? "Submit" : "Next"}
              </Button>
            }
          ></MobileStepper>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateForumModal;
