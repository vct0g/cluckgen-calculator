import React, { useEffect, useState } from "react";
import Results from "../components/Results";

const Home: React.FC = () => {
  const [geneData, setGeneData] = useState<any>({});
  const [selectedGene, setSelectedGene] = useState<string>("E"); // Default to 'E'
  const [femaleGene, setFemaleGene] = useState<string>("E");
  const [maleGene, setMaleGene] = useState<string>("E");
  const [femaleAllele, setFemaleAllele] = useState<string>("E"); // Default to first allele of 'E'
  const [maleAllele, setMaleAllele] = useState<string>("E"); // Default to first allele of 'E'
  const [results, setResults] = useState<string>("");

  //type definition for alleleImageMap
  type AlleleImageMap = {
    [key: string]: {
      [allele: string]: string;
    };
  };
  //mapping for all the male chicken pics
  const maleAlleleImageMap: AlleleImageMap = {
    E: {
      "e+/e+": "/images/male/white_rooster.png",
    },
  };
  //mapping for all the female chicken pics
  const femaleAlleleImageMap: AlleleImageMap = {
    E: {
      "e+/e+": "/images/female/black_unicolor.png",
    },
  };

  // state managment for images
  const [maleImage, setMaleImage] = useState("");
  const [femaleImage, setFemaleImage] = useState("");
  const [resultImage, setResultImage] = useState("");

  useEffect(() => {
    const fetchGeneData = async () => {
      try {
        const response = await fetch("/geneData.json");
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setGeneData(data);
        const firstGene = Object.keys(data)[0];
        setFemaleGene(firstGene);
        setMaleGene(firstGene);
        setFemaleAllele(data[firstGene]?.alleles[0]);
        setMaleAllele(data[firstGene]?.alleles[0]);
      } catch (error) {
        console.error("ERROR fetching gene data", error);
      }
    };
    fetchGeneData();
  }, []);

  //core logic of gene calculation
  const calculateAlleles = (
    selectedGene: string,
    femaleAllele: string,
    maleAllele: string
  ) => {
    const possibleCombinations = [
      femaleAllele + maleAllele,
      maleAllele + femaleAllele,
    ];
    return `Possible Alleles Combinations: ${possibleCombinations.join(", ")}`;
  };

  const updateMaleImage = (gene: string, allele: string) => {
    const imagePath = maleAlleleImageMap[gene]?.[allele];
    if (imagePath) {
      setMaleImage(imagePath);
    }
  };

  const updateFemaleImage = (gene: string, allele: string) => {
    const imagePath = femaleAlleleImageMap[gene]?.[allele];
    if (imagePath) {
      setFemaleImage(imagePath);
    }
  };

  const calculateResults = () => {
    const featherColor = calculateAlleles(
      selectedGene,
      femaleAllele,
      maleAllele
    );
    setResults(`Potential Feather Color: ${featherColor}`);
    setResultImage("images/output/black_unicolor_elf.png");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CluckGen Calculator</h1>
      <div className="mb-4">
        <label
          htmlFor="maleGene"
          className="block text-sm font-medium text-gray-700"
        >
          Select Male Gene:
        </label>
        <select
          id="maleGene"
          value={maleGene}
          onChange={(e) => {
            setMaleGene(e.target.value);
            setMaleAllele(geneData[e.target.value]?.alleles[0]);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.keys(geneData).map((gene) => (
            <option key={gene} value={gene}>
              {gene}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="maleAllele"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Select Male Allele
        </label>
        <select
          id="maleAllele"
          value={maleAllele}
          onChange={(e) => {
            const newAllele = e.target.value;
            setMaleAllele(newAllele);
            updateMaleImage(maleGene, newAllele);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {geneData[maleGene]?.alleles.map((allele: string) => (
            <option key={allele} value={allele}>
              {allele}
            </option>
          ))}
        </select>
      </div>
      <img src={maleImage} alt="Male Chicken" width="200" height="200" />
      <div className="mb-4">
        <label
          htmlFor="femaleGene"
          className="block text-sm font-medium text-gray-700"
        >
          Select Female Gene:
        </label>
        <select
          id="femaleGene"
          value={femaleGene}
          onChange={(e) => {
            setFemaleGene(e.target.value);
            setFemaleAllele(geneData[e.target.value]?.alleles[0]); // Update female allele when gene changes
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.keys(geneData).map((gene) => (
            <option key={gene} value={gene}>
              {gene}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="femaleAllele"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Select Female Allele:
        </label>
        <select
          id="femaleAllele"
          value={femaleAllele}
          onChange={(e) => {
            const newAllele = e.target.value;
            setFemaleAllele(newAllele);
            updateFemaleImage(femaleGene, newAllele);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {geneData[femaleGene]?.alleles.map((allele: string) => (
            <option key={allele} value={allele}>
              {allele}
            </option>
          ))}
        </select>
      </div>
      <img src={femaleImage} alt="Female Chicken" width="200" height="200" />
      <button onClick={calculateResults} className="p-2 border rounded mt-4">
        Calculate
      </button>
      <Results results={results} />
    </div>
  );
};

export default Home;
