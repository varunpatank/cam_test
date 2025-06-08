"use client";
import React, { useState } from "react";
import Modal from "./_components/Modal";
import FlashcardList from "./_components/FlashcardList";
import SubjectDrop from "./_components/SubjectDrop";
import "./_components/custom.css";
import { FcSettings } from "react-icons/fc";
import { FaGear } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { BackgroundLines } from "@/components/ui/background-lines";
import { StarsBackground } from "@/components/ui/shooting-stars";
// export const maxDuration = 300;

const FlashcardsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numCards, setNumCards] = useState<string>("3"); // Use string for input handling
  const [generateAll, setGenerateAll] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bgColor, setBgColor] = useState<string>("n-6");
  const [textColor, setTextColor] = useState<string>("white");
  const [roundness, setRoundness] = useState<string>("lg");
  const [highlightColor, setHighlightColor] = useState<string>("[#75399b]");
  const [flashcardsGenerated, setFlashcardsGenerated] =
    useState<boolean>(false);

  const handleApplyStyles = (
    bgColor: string,
    textColor: string,
    roundness: string,
    highlightColor: string
  ) => {
    setBgColor(bgColor);
    setTextColor(textColor);
    setRoundness(roundness);
    setHighlightColor(highlightColor);
  };

  const handleGenerateClick = () => {
    setFlashcardsGenerated(true);
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") {
      // You can decide what to do with this case. For now, we'll just ignore it.
      return;
    }
    setGenerateAll(checked);
  };

  // Handle the input change
  // Handle the input change
  const handleNumCardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // If the value is empty, keep it as empty string
    if (value === "") {
      setNumCards(""); // Let the field be empty
    } else {
      const parsedValue = Number(value);
      // Only set if it's a valid number and greater than 0
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setNumCards(parsedValue.toString());
      }
    }
  };

  return (
    <div className=" p-4 bg-n-8 text-white">
      <StarsBackground />
      <div className="relative z-20 px-6 py-5 md:px-12 md:py-10 lg:px-16 lg:py-16 lg:pt-20 md:pt-12 pt-8 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide leading-tight mb-5">
            Flashcards.
          </h1>
        </div>
      </div>
      <SubjectDrop
        onSubjectChange={(subject) => setSelectedSubject(subject)}
        onTopicsChange={setSelectedTopics}
      />

      {/* Number input and Generate Button */}
      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 pl-0 md:pl-8">
        <input
          type="number"
          value={numCards}
          onChange={handleNumCardsChange}
          className="p-2 rounded-lg disabled:bg-n-5 disabled:text-muted-foreground bg-n-6"
          disabled={generateAll}
          min={1} // Optional: prevent 0 or negative numbers
        />
        <button
          onClick={handleGenerateClick}
          className="bg-n-5 text-white p-2 hover:bg-n-5/70 transition-all rounded-lg disabled:bg-n-6 disabled:text-muted-foreground mt-4 sm:mt-0"
          disabled={!selectedSubject} // Disable if no subject selected
        >
          Generate
        </button>{" "}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-n-5 hover:bg-n-6 transition-all text-white p-2 rounded-lg mt-4 mb-8 ml-0 md:ml-8"
      >
        <FaGear />
      </button>

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onApply={handleApplyStyles}
        />
      )}

      {/* Flashcards List */}
      {flashcardsGenerated && (
        <FlashcardList
          selectedSubject={selectedSubject}
          selectedTopics={selectedTopics}
          numCards={Number(numCards)} // Cast to number when passing to FlashcardList
          generateAll={generateAll}
          bgColor={bgColor}
          textColor={textColor}
          roundness={roundness}
          highlightColor={highlightColor}
        />
      )}
    </div>
  );
};

export default FlashcardsPage;
