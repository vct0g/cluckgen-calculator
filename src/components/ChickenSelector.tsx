import React from "react";

type ChickenSelectorProps = {
  options: string[];
  onChange: (breed: string) => void;
};

const ChickenSelector: React.FC<ChickenSelectorProps> = ({
  options,
  onChange,
}) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ChickenSelector;
