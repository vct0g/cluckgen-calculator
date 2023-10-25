import React, { useEffect, useState } from "react";
import GeneSelector from "../components/GeneSelector";
import Results from "../components/Results";

const Home: React.FC = () => {
  const [geneData, setGeneData] = useState<any>({});
  const [selectedGene, setSelectedGene] = useState<string>("E"); // Default to 'E'
  const [femaleGenes, setFemaleGenes] = useState<{ [key: string]: string }>({});
  const [maleGenes, setMaleGenes] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<string>("");

  useEffect(() => {
    const fetchGeneData = async () => {
      try {
        const response = await fetch("/geneData.json");
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setGeneData(data);
        // Set default alleles for each gene
        const defaultGenes: { [key: string]: string } = {};
        Object.keys(data).forEach((gene) => {
          defaultGenes[gene] = data[gene].alleles[0];
        });
        setFemaleGenes(defaultGenes);
        setMaleGenes(defaultGenes);
      } catch (error) {
        console.error("ERROR fetching gene data", error);
      }
    };
    fetchGeneData();
  }, []);

  const handleFemaleGeneChange = (gene: string, allele: string) => {
    setFemaleGenes({ ...femaleGenes, [gene]: allele });
  };

  const handleMaleGeneChange = (gene: string, allele: string) => {
    setMaleGenes({ ...maleGenes, [gene]: allele });
  };

  const calculateFeatherColor = (
    selectedGene: string,
    femaleGenes: { [key: string]: string },
    maleGenes: { [key: string]: string }
  ) => {
    const femaleAllele = femaleGenes[selectedGene];
    const maleAllele = maleGenes[selectedGene];
    const possibleCombinations = [
      femaleAllele + maleAllele,
      maleAllele + femaleAllele,
    ];
    return `Possible Alleles: ${possibleCombinations.join(", ")}`;
  };

  const calculateResults = () => {
    const featherColor = calculateFeatherColor(
      selectedGene,
      femaleGenes,
      maleGenes
    );
    setResults(`Potential Feather Color: ${featherColor}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CluckGen Calculator</h1>
      <div className="mb-4">
        <label
          htmlFor="selectedGene"
          className="block text-sm font-medium text-gray-700"
        >
          Select Gene for Calculation:
        </label>
        <select
          id="selectedGene"
          name="selectedGene"
          value={selectedGene}
          onChange={(e) => setSelectedGene(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.keys(geneData).length > 0 ? (
            Object.keys(geneData).map((gene) => (
              <option key={gene} value={gene}>
                {gene}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading...
            </option>
          )}
        </select>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Female Genes</h2>
        {Object.keys(geneData).map((gene) => (
          <GeneSelector
            key={`female-${gene}`}
            gene={gene}
            alleles={geneData[gene].alleles}
            onChange={(allele) => handleFemaleGeneChange(gene, allele)}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2 mt-4">Male Genes</h2>
        {Object.keys(geneData).map((gene) => (
          <GeneSelector
            key={`male-${gene}`}
            gene={gene}
            alleles={geneData[gene].alleles}
            onChange={(allele) => handleMaleGeneChange(gene, allele)}
          />
        ))}
      </div>

      <button onClick={calculateResults} className="p-2 border rounded mt-4">
        Calculate
      </button>
      <Results results={results} />
    </div>
  );
};

export default Home;
