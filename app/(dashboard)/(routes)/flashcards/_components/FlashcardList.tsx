import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard"; // Assuming you have FlashCard component
import { Cards } from "../data";

interface FlashcardListProps {
  selectedSubject: string;
  selectedTopics: string[];
  numCards: number;
  generateAll: boolean;
  bgColor: string;
  textColor: string;
  roundness: string;
  highlightColor: string;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  selectedSubject,
  selectedTopics,
  numCards,
  generateAll,
  bgColor,
  textColor,
  roundness,
  highlightColor,
}) => {
  const [cardsToShow, setCardsToShow] = useState<any[]>([]);

  useEffect(() => {
    console.log("Selected Subject:", selectedSubject); // Log selected subject
    console.log("Selected Topics:", selectedTopics); // Log selected topics

    // Filter cards based on selectedSubject and selectedTopics
    const filteredCards = Cards.filter(
      (card) =>
        card.subject === selectedSubject && // Check if subject matches
        (selectedTopics.length === 0 || selectedTopics.includes(card.topic)) // Check if any topic is selected
    );

    console.log("Filtered Cards:", filteredCards); // Log filtered cards

    const validNumCards = numCards > 0 ? numCards : filteredCards.length;

    if (generateAll) {
      setCardsToShow(filteredCards);
    } else {
      setCardsToShow(filteredCards.slice(0, validNumCards));
    }
  }, [selectedSubject, selectedTopics, numCards, generateAll]);

  return (
    <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6">
      {cardsToShow.map((card) => (
        <FlashCard
          key={card.id}
          highlightColor={highlightColor}
          question={card.question}
          answer={card.answer}
          image={card.image}
          bgColor={bgColor} // Passing the styles to FlashCard
          textColor={textColor}
          roundness={roundness}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
