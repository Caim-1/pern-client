import { capitalizeFirstLetter } from "../utils/utility-functions";

type Props = {
  value: string;
  handleChange: (value: string) => void;
  type: string;
  inputName: string;
  // error?: string;
  required?: boolean;
};

const InputField = ({ value, handleChange, type, inputName, /*error,*/ required }: Props) => {
  return (
    <label className="flex flex-col gap-2">
      <span>
        {capitalizeFirstLetter(inputName)}
        {required && <span className="text-red-400"> *</span>}
      </span>

      <input
        type={type}
        name={inputName}
        className="border-2 w-full"
        placeholder={`Your ${inputName}`}
        autoComplete="off"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        required={required}
      />

      {/* <span className="text-red-400">{error}</span> */}
    </label>
  );
};

export default InputField;
