import React from "react";

type ResultsProps = {
  results: string;
};

const Results: React.FC<ResultsProps> = ({ results }) => {
  return <div className="p-4 border rounded mt-4">{results}</div>;
};

export default Results;
