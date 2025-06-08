"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FloatingDock } from "./_components/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconCalculator,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import {
  FcCalculator,
  FcCurrencyExchange,
  FcLandscape,
  FcCommandLine,
  FcPanorama,
  FcCollaboration,
  FcGlobe,
  FcBiotech,
  FcBiomass,
  FcBusiness,
  FcBiohazard,
  FcFilmReel,
  FcSimCard,
  FcBarChart,
  FcConferenceCall,
  FcFilm,
  FcMusic,
  FcSportsMode,
  FcReading,
  FcClapperboard,
  FcElectricalSensor,
  FcGraduationCap,
  FcMultipleSmartphones,
  FcCalendar,
} from "react-icons/fc";
import { IoLanguageSharp, IoFastFood } from "react-icons/io5";
import { SiEnterprisedb } from "react-icons/si";
import { FaMosque, FaFishFins } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { FaFlagUsa } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import PrintButton from "./_components/printBtn";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Gauge,
  Plus,
  PlusCircle,
  X,
} from "lucide-react";
import { Subject } from "@prisma/client";
import SubjectItem from "../tutor/courses/_components/subject-icon";
import SubjectIcon from "../tutor/courses/_components/subject-icon";
import { Banner } from "@/components/bannerimp";
// const steps = [
//   {
//     target: ".first-step",
//     content: "Hey there! Start by selecting a year..",
//   },
// ];

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

const iconMap: Record<Subject["name"], IconType> = {
  "Accounting": FcCurrencyExchange,
  "Agriculture": FcLandscape,
  "ASL": IoLanguageSharp,
  "Arabic": FcCollaboration,
  "AFL": IoLanguageSharp,
  "Art & Design": FcPanorama,
  "Bahasa": IoLanguageSharp,
  "Biology": FcBiotech,
  "Business": FcBusiness,
  "Chemistry": FcBiomass,
  "Chinese CSL": IoLanguageSharp,
  "Chinese Mandarin": FcCollaboration,
  "Computer Science": FcCommandLine,
  "Co-ordinated Double Science": FcBiomass,
  "Combined Science": FcBiohazard,
  "Design & Tech": FcMultipleSmartphones,
  "Drama": FcFilmReel,
  "Economics": FcBarChart,
  "Enterprise": SiEnterprisedb,
  "English - EFL": IoLanguageSharp,
  "English Literature": FcReading,
  "ESL": FcCollaboration,
  "Environmental Management": FcLandscape,
  "Food & Nutrition": IoFastFood,
  "French - FFL": FcCollaboration,
  "Geography": FcGlobe,
  "German - GFL": IoLanguageSharp,
  "Global Perspectives": FcCollaboration,
  "Hindi - HFL": IoLanguageSharp,
  "Hindi - HSL": IoLanguageSharp,
  "History": FcFilm,
  "History - USA": FaFlagUsa,
  "IsiZulu - ISL": IoLanguageSharp,
  "Islmaiyat": FaMosque,
  "Italian - IFL": IoLanguageSharp,
  "Latin": IoLanguageSharp,
  "Malay": IoLanguageSharp,
  "Marine Sciences": FaFishFins,
  "Mathematics": FcCalculator,
  "Add Maths": FcCalculator,
  "International Maths": FcCalculator,
  "Music": FcMusic,
  "P.E": FcSportsMode,
  "Pakistan studies": FcReading,
  "Portuguese - PFL": IoLanguageSharp,
  "Religious Studies": FaMosque,
  "Sanskrit": IoLanguageSharp,
  "Setswana": IoLanguageSharp,
  "Sociology": FcConferenceCall,
  "Spanish": IoLanguageSharp,
  "Spanish Literature": FcReading,
  "Swahili": IoLanguageSharp,
  "Thai": IoLanguageSharp,
  "Turkish": IoLanguageSharp,
  "Urdu": IoLanguageSharp,
  "Vietnamese": IoLanguageSharp,
  "Travel & Tourism": FcGlobe,
  "World Literature": FcReading,
  "Physics": FcElectricalSensor,
  "ICT": FcSimCard,
};

const subjectsList = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Biology" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Physics" },
];

const sessionOptions = [
  { id: 1, name: "Feb/March" },
  { id: 2, name: "May/June" },
  { id: 3, name: "Oct/Nov" },
];

const extendedCoreOptions = [
  { id: "Core", name: "Core" },
  { id: "Extended", name: "Extended" },
];

const yearOptions = Array.from({ length: 9 }, (_, i) => 2016 + i).map(
  (year) => ({
    id: year,
    name: year.toString(),
  })
);

const variantsOptions = [
  { id: "v1", name: "V1" },
  { id: "v2", name: "V2" },
  { id: "v3", name: "V3" },
];

const gradingOptions = [
  { id: "9-1", name: "9-1" },
  { id: "A*-G", name: "A*-G" },
];

type PaperType = "Core" | "Extended";

interface PaperInfo {
  default: number;
  code: string;
  papers: string[];
}

interface PaperInputs {
  [key: string]: {
    Core: PaperInfo;
    Extended: PaperInfo;
  };
}

const paperInputs: PaperInputs = {
  mathematics: {
    Core: {
      default: 60,
      code: "0980",
      papers: ["Paper 1", "Paper 3"],
    },
    Extended: {
      default: 60,
      code: "0980",
      papers: ["Paper 2", "Paper 4"],
    },
  },
  chemistry: {
    Core: {
      default: 60,
      code: "0971",
      papers: ["Paper 1", "Paper 3", "Paper 5"],
    },
    Extended: {
      default: 60,
      code: "0971",
      papers: ["Paper 2", "Paper 4", "Paper 6"],
    },
  },
  physics: {
    Core: {
      default: 60,
      code: "0975",
      papers: ["Paper 1", "Paper 3", "Paper 5"],
    },
    Extended: {
      default: 60,
      code: "0975",
      papers: ["Paper 2", "Paper 4", "Paper 6"],
    },
  },
  biology: {
    Core: {
      default: 60,
      code: "0970",
      papers: ["Paper 1", "Paper 3", "Paper 5"],
    },
    Extended: {
      default: 60,
      code: "0970",
      papers: ["Paper 2", "Paper 4", "Paper 6"],
    },
  },
};

const gradingsystemwithcode = (
  gradingsystem: string | undefined,
  code: string
) => {
  if (gradingsystem === "9-1") {
    return code;
  }
  if (gradingsystem === "A*-G") {
    if (code === "0980") {
      return "0580";
    }
    if (code === "0970") {
      return "0610";
    }
    if (code === "0971") {
      return "0620";
    }
    if (code === "0975") {
      return "0625";
    }
  }
};
interface SubjectInfo {
  extendedCore: PaperType | null;
  session: string | null;
  papers: string[];
  marks: Record<string, string>;
  variant: string;
  code: string;
  defaultMark?: number;
  gradingSystem?: string;
}
const sessionmap = {
  "May/June": "June",
  "Feb/March": "March",
  "Oct/Nov": "October",
};
const PredictorPage = () => {
  const [isDockVisible, setIsDockVisible] = useState(true);

  const toggleDockVisibility = () => {
    setIsDockVisible(!isDockVisible);
  };
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [subjectInfo, setSubjectInfo] = useState<Record<number, SubjectInfo>>(
    {}
  );
  const [year, setYear] = useState<number | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);

  const addSubject = (subjectId: number) => {
    const subject = subjectsList.find((subj) => subj.id === subjectId);
    if (subject && !selectedSubjects.includes(subjectId)) {
      // Map the subject name to the corresponding paperInputs key
      const subjectKey = subject.name.toLowerCase(); // Ensure subject names are in lowercase (e.g., maths, chemistry)

      // Access the corresponding entry in paperInputs
      const subjectPapers = paperInputs[subjectKey as keyof typeof paperInputs];

      if (subjectPapers) {
        setSelectedSubjects([...selectedSubjects, subjectId]);
        setSubjectInfo({
          ...subjectInfo,
          [subjectId]: {
            extendedCore: null,
            session: null,
            papers: [],
            marks: {},
            variant: "select",
            gradingSystem: "9-1",
            code: subjectPapers.Core.code,
          },
        });
      }
    }
  };

  const removeSubject = (subjectId: number) => {
    setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    const updatedSubjectInfo = { ...subjectInfo };
    delete updatedSubjectInfo[subjectId];
    setSubjectInfo(updatedSubjectInfo);
  };

  const handleExtendedCoreChange = (subjectId: number, value: string) => {
    const subjectName = subjectsList
      .find((subj) => subj.id === subjectId)
      ?.name?.toLowerCase();
    if (subjectName && paperInputs[subjectName]) {
      const paperData = paperInputs[subjectName][value as PaperType];
      setSubjectInfo((prevSubjectInfo) => ({
        ...prevSubjectInfo,
        [subjectId]: {
          ...prevSubjectInfo[subjectId],
          extendedCore: value as PaperType,
          papers: paperData.papers,
          defaultMark: paperData.default,
        },
      }));
    }
  };
  const subjectfound = (subjectId: number, paper: string) => {
    const s = subjectsList.find((subj) => subj.id === subjectId)?.name;
    if (s === "Maths") {
      if (paper === "Paper 2") {
        return "/70";
      }
      if (paper === "Paper 4") {
        return "/130";
      }
      if (paper === "Paper 1") {
        return "/50";
      }
      if (paper === "Paper 3") {
        return "/150";
      }
    }
    if (s === "Chemistry" || s === "Physics" || s === "Biology") {
      if (paper === "Paper 2") {
        return "/40";
      }
      if (paper === "Paper 4") {
        return "/80";
      }
      if (paper === "Paper 6") {
        return "/40";
      }
      if (paper === "Paper 1") {
        return "/30";
      }
      if (paper === "Paper 3") {
        return "/60";
      }
      if (paper === "Paper 5") {
        return "/40";
      }
    }
  };
  const handleSessionChange = (subjectId: number, value: string) => {
    setSession(value);

    setSubjectInfo({
      ...subjectInfo,
      [subjectId]: { ...subjectInfo[subjectId], session: value },
    });
  };

  const handleMarkChange = (
    subjectId: number,
    paper: string,
    value: string
  ) => {
    setSubjectInfo({
      ...subjectInfo,
      [subjectId]: {
        ...subjectInfo[subjectId],
        marks: { ...subjectInfo[subjectId].marks, [paper]: value },
      },
    });
  };

  const handleGradingSystemChange = (subjectId: number, value: string) => {
    setSubjectInfo({
      ...subjectInfo,
      [subjectId]: { ...subjectInfo[subjectId], gradingSystem: value },
    });
  };

  const handleVariantChange = (subjectId: number, value: string) => {
    setVariant(value);
    if (subjectInfo[subjectId]?.session === "Feb/March" && value !== "v2") {
      return; // Prevent changing to invalid variant
    }
    setSubjectInfo({
      ...subjectInfo,
      [subjectId]: { ...subjectInfo[subjectId], variant: value },
    });
  };

  const calculateGrade = (subjectId: number) => {
    const marks = subjectInfo[subjectId]?.marks || {};
    const totalMarks = Object.values(marks).reduce<number>(
      (acc, mark) => acc + (Number(mark) || 0),
      0
    );

    const defaultMark = subjectInfo[subjectId]?.defaultMark || 60;

    if (subjectInfo[subjectId]?.gradingSystem === "9-1") {
      const grade = totalMarks === 0 ? "" : totalMarks >= 50 ? 9 : 4;
      return grade;
    } else {
      const grade = totalMarks === 0 ? "" : totalMarks >= 10 ? "A*" : "D";
      const gradenum = totalMarks / 2;

      return `${grade} (${gradenum})`;
    }
  };

  const tableRows = selectedSubjects.map((subjectId, rowIndex) => {
    const subject = subjectsList.find((subj) => subj.id === subjectId);
    const subjectDetail = subjectInfo[subjectId] || {};
    return (
      <tr
        key={subjectId}
        className={`border-b ${
          rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
        }`}
      >
        <td className="px-4 py-2" style={{ border: "1px solid #e4e4e4" }}>
          <div className="flex justify-between items-center w-full">
            <span>
              {subject?.name} {subjectDetail.extendedCore}
            </span>
            <span className="ml-auto text-gray-500">
              {`(${gradingsystemwithcode(
                subjectDetail.gradingSystem,
                subjectDetail.code
              )})`}
            </span>
          </div>
        </td>

        <td className="px-4 py-2" style={{ "border": "1px solid #e4e4e4" }}>
          IGCSE {subjectDetail.gradingSystem === "9-1" ? "(9-1)" : ""}
        </td>
        <td
          className="px-4 py-2 font-semibold"
          style={{ "border": "1px solid #e4e4e4" }}
        >
          {calculateGrade(subjectId)}
        </td>
      </tr>
    );
  });
  const firstSubject = subjectsList.find(
    (subj) => subj.id === selectedSubjects[0]
  );
  return (
    <div className="p-4 mx-auto max-w-5xl">
      {" "}
      <Banner
        label="Sorry, Predictor is not ready, it wont work, coming soon!"
        variant={"development"}
      />
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
      {selectedSubjects.length === 0 && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-center mt-4">
            Welcome to your results generator!
          </h1>
          <p className="text-lg  mb-6 text-center text-gray-300">
            You can use this if you&apos;re solving past-papers or if you want a
            prediction for your results.. <br />
            Good Luck!
          </p>
        </>
      )}
      {/* <Joyride steps={steps} /> */}
      <div className="no-print mb-4">
        {/* Year Selection */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <label className="block">Year:</label>
          <Select onValueChange={(value) => setYear(Number(value))}>
            <SelectTrigger className="w-32 text-white py-2 px-2 rounded border  bg-n-7 first-step">
              {year ? year : "Select Year"}
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((yearOption) => (
                <SelectItem
                  key={yearOption.id}
                  value={yearOption.id.toString()}
                >
                  {yearOption.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dropdown to add subjects */}
        {year && (
          <>
            <div className="flex  items-center justify-center space-x-2 mb-4">
              <Select onValueChange={(value) => addSubject(Number(value))}>
                <SelectTrigger className="bg-n-7 text-white py-2 px-4 rounded flex items-center w-18 second-step">
                  <PlusCircle className="mr-2" /> Add Subject
                </SelectTrigger>
                <SelectContent>
                  {subjectsList.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Circular tags for added subjects */}
              <div className="flex flex-wrap space-x-2">
                {selectedSubjects.map((subjectId) => {
                  const subject = subjectsList.find(
                    (subj) => subj.id === subjectId
                  );
                  return subject ? (
                    <div
                      key={subject.id}
                      className="text-gray-200 bg-n-6 rounded-full px-3 py-1 flex items-center space-x-2 mb-2"
                    >
                      <SubjectIcon icon={iconMap[subject.name]} />
                      <span>{subject.name}</span>
                      <button
                        onClick={() => removeSubject(subject.id)}
                        className="text-rose-500"
                      >
                        <X />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Accordion menu for subject details */}
            <Accordion type="single" collapsible defaultValue={"firstSubject"}>
              {selectedSubjects.map((subjectId) => {
                const subject = subjectsList.find(
                  (subj) => subj.id === subjectId
                );
                const subjectDetail = subjectInfo[subjectId] || {};
                const accordionValue =
                  subjectId === firstSubject?.id
                    ? "firstSubject"
                    : `item-${subjectId}`;
                return (
                  <AccordionItem key={subjectId} value={accordionValue}>
                    <AccordionTrigger>{subject?.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-4">
                        <label className="block mb-2">Extended/Core:</label>
                        <Select
                          onValueChange={(value) =>
                            handleExtendedCoreChange(subjectId, value)
                          }
                        >
                          <SelectTrigger
                            className={`py-2 px-4 rounded flex items-center w-18 text-[1.1rem] ${
                              subjectDetail.extendedCore === "Extended"
                                ? "bg-green-600"
                                : subjectDetail.extendedCore === "Core"
                                ? "bg-blue-600"
                                : "bg-n-6"
                            } text-white`}
                          >
                            {" "}
                            <BookOpen className="mr-2 w-5 h-5" />{" "}
                            {subjectDetail.extendedCore || "Level"}
                          </SelectTrigger>

                          <SelectContent>
                            {extendedCoreOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0 mb-4">
                        {/* Session Selector */}
                        <div className="flex-1">
                          <label className="block mb-2">Session:</label>
                          <Select
                            onValueChange={(value) =>
                              handleSessionChange(subjectId, value)
                            }
                          >
                            <SelectTrigger className="bg-n-6 text-white py-2 px-4 rounded flex items-center w-48 text-[1.1rem]">
                              {" "}
                              {/* Reduced width */}
                              <FcCalendar className="mr-2 w-6 h-6" />{" "}
                              {/* Calendar icon */}
                              {subjectDetail.session || "Session"}
                            </SelectTrigger>
                            <SelectContent>
                              {sessionOptions
                                .filter(
                                  (option) =>
                                    year !== 2024 || option.name !== "Oct/Nov"
                                )
                                .map((option) => (
                                  <SelectItem
                                    key={option.id}
                                    value={option.name}
                                  >
                                    {option.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Variant Selector */}
                        <div className="flex-1">
                          <label className="block mb-2">Variant:</label>
                          <Select
                            onValueChange={(value) =>
                              handleVariantChange(subjectId, value)
                            }
                          >
                            <SelectTrigger className="bg-n-6 text-white py-2 px-4 rounded flex items-center w-36 text-[1.1rem]">
                              {" "}
                              {/* Reduced width */}
                              <FcGlobe className="mr-2 w-8 h-6" />{" "}
                              {/* Globe icon */}
                              {subjectDetail.variant || "Variant"}
                            </SelectTrigger>
                            <SelectContent>
                              {variantsOptions
                                .filter(
                                  (option) =>
                                    subjectDetail.session !== "Feb/March" ||
                                    option.name === "V2"
                                ) // Filter logic
                                .map((option) => (
                                  <SelectItem
                                    key={option.id}
                                    value={option.name}
                                  >
                                    {option.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {subjectDetail.papers.map((paper) => (
                        <div
                          key={paper}
                          className="mb-4 nonumber text-[1.1rem]"
                        >
                          <label className="block mb-2 text-[0.9rem]">
                            {paper} Marks:
                          </label>
                          <input
                            type="number"
                            onChange={(e) =>
                              handleMarkChange(subjectId, paper, e.target.value)
                            }
                            className="border p-2 rounded w-12 text-center bg-n-6 text-[1.1rem]"
                            autoComplete="false"
                          />{" "}
                          <span className="text-gray-400">
                            {subjectfound(subjectId, paper)}
                          </span>
                        </div>
                      ))}{" "}
                      <div className="mb-4">
                        <label className="block mb-2">Grading System:</label>
                        <Select
                          onValueChange={(value) =>
                            handleGradingSystemChange(subjectId, value)
                          }
                        >
                          <SelectTrigger className="bg-n-6 text-white py-2 px-4 rounded text-[1.1rem] w-32">
                            {subjectDetail.gradingSystem || "Grading System"}
                          </SelectTrigger>

                          <SelectContent>
                            {gradingOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}
      </div>
      {year && selectedSubjects.length > 0 && (
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "Verdana" }}
        >
          Predicted Results:{" "}
          {session && sessionmap[session as keyof typeof sessionmap]} {year}
        </h1>
      )}
      {year && selectedSubjects.length > 0 && (
        <>
          <table
            className="min-w-full bg-[#e92178] text-[#312e2e] font-light"
            style={{ fontFamily: "Verdana" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e92178" }}>
                <th
                  className="px-4 py-2 text-left text-white"
                  style={{ width: "45%" }}
                >
                  Examination
                </th>
                <th
                  className="px-4 py-2 text-left text-white"
                  style={{ width: "15%" }}
                >
                  Qualification
                </th>
                <th
                  className="px-4 py-2 text-left text-white"
                  style={{ width: "30%" }}
                >
                  Grade Awarded
                </th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>{" "}
          <div className="mt-4 flex justify-between items-center text-sm font-light text-slate-400">
            <span>
              The results displayed are PREDICTED, you don&apos;t use it
              anywhere else.
            </span>
            <PrintButton />
          </div>
          <div className="h-24" />
        </>
      )}
    </div>
  );
};

export default PredictorPage;
