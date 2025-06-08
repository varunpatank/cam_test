"use client";
// app/quizzer/page.tsx
import React, { useState } from "react";
import Filter from "./_components/Filter";
import { Button } from "@/components/ui/button";
import {
  FcList,
  FcQuestions,
  FcReadingEbook,
  FcTodoList,
} from "react-icons/fc";
import FloatingNavbar from "@/components/FloatingNavbar";
import FloatingMCQNavbar from "@/components/FloatingMCQNavbar";
import { FloatingDock } from "../predictor/_components/floating-dock";
import {
  IconCalculator,
  IconExchange,
  IconHome,
  IconTerminal2,
} from "@tabler/icons-react";
import { Banner } from "@/components/bannerimp";

const Quizzer: React.FC = () => {
  const [filters, setFilters] = useState({
    subject: "",
    year: "All",
    topic: "All",
    variant: "All",
    session: "All",
    type: "IGCSE Extended",
    difficulty: "Medium",
  });
  const [isDockVisible, setIsDockVisible] = useState(true);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleGetQuestions = () => {
    window.open("https://www.google.com", "_blank");
  };

  const handleCreateQuiz = () => {
    window.open("https://www.google.com", "_blank");
  };
  const links = [
    {
      title: "Main",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "#",
    },

    {
      title: "Predictor",
      icon: <IconTerminal2 className="h-full w-full text-neutral-300" />,
      href: "predictor",
    },
    {
      title: "Calculator",
      icon: <IconCalculator className="h-full w-full text-neutral-300" />,
      href: "#",
    },

    {
      title: "Generator",
      icon: <IconExchange className="h-full w-full text-neutral-300" />,
      href: "quizzer",
    },
  ];

  return (
    <div className="p-8 text-white">
      <Banner
        label="Sorry, Quizzer is not ready, it wont work, coming soon!"
        variant={"development"}
      />
      <h1 className="text-3xl font-bold mb-6 text-center"> Quizzer</h1>
      <div className="max-w-3xl mx-auto   shadow-md rounded-lg p-6">
        <Filter
          subjects={["Biology", "Chemistry", "Physics", "Economics"]}
          years={["2021", "2022", "2023"]}
          type={["IGCSE Extended", "IGCSE Core"]}
          topics={
            filters.subject === "Biology"
              ? [
                  "Characteristics and Classification of Living Organisms",
                  "Organisation of the Organism",
                  "Movement into and out of Cells",
                  "Biological Molecules",
                  "Enzymes",
                  "Plant Nutrition",
                  "Human Nutrition",
                  "Transport in Plants",
                  "Transport in Animals",
                  "Diseases and Immunity",
                  "Gas Exchange in Humans",
                  "Respiration",
                  "Excretion in Humans",
                  "Coordination and Response",
                  "Drugs",
                  "Reproduction",
                  "Inheritance",
                  "Variation and Selection",
                  "Organisms and their Environment",
                  "Human Influences on Ecosystems",
                  "Biotechnology and Genetic Modification",
                ]
              : filters.subject === "Science"
              ? ["Biology", "Physics"]
              : []
          }
          variants={["V1", "V2", "V3", "All"]}
          sessions={["May/June", "October/November", "Feb/March", "Any"]}
          onFilterChange={handleFilterChange}
          selectedSubject={filters.subject}
        />
        <div className="mt-10 flex flex-col md:flex-row md:ml-32">
          <Button
            className="mb-2 md:mb-0 md:mr-5"
            onClick={handleGetQuestions}
            variant="tert"
          >
            Get Questions <FcQuestions className="text-lg ml-2" />
          </Button>
          <Button onClick={handleCreateQuiz} variant="tert">
            Create Quiz <FcTodoList className="text-lg ml-2" />
          </Button>
        </div>
      </div>
      <div className="fixed bottom-4 left-20 right-0 flex items-center justify-center w-full">
        {/* FloatingDock */}
        {isDockVisible && (
          <div className="mb-4 ml-4">
            {" "}
            {/* Add margin to dock */}
            <FloatingDock
              mobileClassName="translate-x-20" // only for demo, remove for production
              items={links}
            />
          </div>
        )}
      </div>
      <div className="h-24" />
    </div>
  );
};

export default Quizzer;
