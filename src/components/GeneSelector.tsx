import React from "react";

type GeneSelectorProps = {
  gene: string;
  alleles: string[];
  onChange: (allele: string) => void;
};

const GeneSelector: React.FC<GeneSelectorProps> = ({
  gene,
  alleles,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={gene} className="block text-sm font-medium text-gray-700">
        {gene}
      </label>
      <select
        id={gene}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded mt-1"
      >
        {alleles.map((allele) => (
          <option key={allele} value={allele}>
            {allele}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GeneSelector;
