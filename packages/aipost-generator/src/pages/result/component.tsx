import React from "react";
import { TypingText } from "./Components/TypingText";
import { Link } from "react-router-dom";

interface Props {
  generatedMessage: string;
  handleRegenerate: () => void;
  handleCopyText: () => void;
}

export const Component: React.FC<Props> = (props) => {
  const { generatedMessage, handleRegenerate, handleCopyText } = props;

  return (
    <div className="p-8 w-full max-w-screen-md bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Your generated post
      </h1>
      <div className="flex justify-between p-4 rounded-md border-2 border-solid">
        <TypingText text={generatedMessage} />
        <div className="flex justify-end items-start w-32 grow-0">
          <div
            className="p-1 rounded-md border-2 border-solid cursor-pointer hover:bg-gray-200"
            onClick={handleCopyText}
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/material-outlined/24/copy.png"
              alt="copy"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-8">
        <Link
          to={"/"}
          className={`py-2 w-full bg-white border-solid border-2 rounded-md text-center`}
        >
          <button>← Back to Generator</button>
        </Link>
        <button
          className={`py-2 w-full text-white bg-gray-500 rounded-md flex flex-row items-center justify-center gap-2`}
          onClick={handleRegenerate}
        >
          <img
            src={
              "https://img.icons8.com/ios-filled/50/000000/available-updates.png"
            }
            alt="regenerate"
            width={16}
            height={16}
          />
          Regenerate
        </button>
      </div>
    </div>
  );
};
