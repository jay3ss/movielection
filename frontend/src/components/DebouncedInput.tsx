import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import useDebounce from "@/hooks/useDebounce";

interface DebouncedInputProps {
  delay?: number;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  delay = 300,
  onChange,
  className = "debounced-input",
  placeholder = "Type something...",
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, delay);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setInputValue("");
    }
  };

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <TextField
      className={className}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      variant="standard"
    />
  );
};

export default DebouncedInput;
