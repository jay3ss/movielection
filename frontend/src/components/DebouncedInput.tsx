import React, { useState } from "react";

import Input from "@mui/material/Input";

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

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      className={className}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default DebouncedInput;
