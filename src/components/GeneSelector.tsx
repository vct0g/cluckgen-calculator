import React from "react";

interface GeneSelectorProps {
  gene: string;
  alleles: string[];
  selectedAllele: string;
  onSelectAllele: (allele: string) => void;
}

const GeneSelector: React.FC<GeneSelectorProps> = ({
  gene,
  alleles,
  selectedAllele,
  onSelectAllele,
}) => {
  return (
    <div>
      <label htmlFor={gene} className="block text-sm font-medium text-gray-700">
        {gene}
      </label>
      <select
        id={gene}
        value={selectedAllele}
        onChange={(e) => onSelectAllele(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
