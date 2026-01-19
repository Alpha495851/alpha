import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState<"class" | "subject" | "list" | number>("class");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const classes = [5, 6, 7, 8, 9, 10];

  const commonSubjects = [
    "English Literature",
    "English Language",
    "2nd Language Hindi",
    "2nd Language Bengali",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer",
    "Moral Science",
    "History",
    "Geography",
  ];

  const subjectMap: Record<number, string[]> = {
    5: [...commonSubjects, "GK", "Maths"],
    6: [...commonSubjects, "GK", "Maths"],
    7: [...commonSubjects, "GK", "Maths"],
    8: [
      ...commonSubjects.filter((s) => s !== "Maths"),
      "Algebra",
      "Geometry",
      "Arithmetic",
      "GK",
    ],
    9: [...commonSubjects, "Maths"],
    10: [...commonSubjects, "Maths"],
  };

  const mockContent = [
    {
      id: 1,
      chapter: "Linear Equations",
      date: "12 Aug 2025",
      preview: "Solve the following questions from classwork...",
      text: "Solve x + 5 = 10",
      status: "ai",
    },
    {
      id: 2,
      chapter: "Linear Equations",
      date: "13 Aug 2025",
      preview: "Homework discussion questions...",
      text: "Solve 2x = 14",
      status: "student",
    },
  ];

  const statusStyles: Record<string, string> = {
    student: "bg-green-100 text-green-700",
    ai: "bg-slate-200 text-slate-700",
    none: "bg-yellow-100 text-yellow-700",
  };

  const statusText: Record<string, string> = {
    student: "Student Answer Available",
    ai: "AI Explanation Available",
    none: "Question Only",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
          School Q&A
        </h1>

        {/* CLASS SELECTION */}
        {step === "class" && (
          <div className="grid grid-cols-2 gap-4">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClass(cls);
                  setStep("subject");
                }}
                className="bg-white shadow-md rounded-2xl p-6 text-lg font-semibold hover:scale-[1.02] transition"
              >
                Class {cls}
              </button>
            ))}
          </div>
        )}

        {/* SUBJECT SELECTION */}
        {step === "subject" && selectedClass && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("class")}
              className="text-sm text-slate-600"
            >
              ← Back
            </button>
            {subjectMap[selectedClass].map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubject(sub);
                  setStep("list");
                }}
                className="w-full bg-white shadow-md rounded-2xl p-4 text-lg hover:scale-[1.01] transition"
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* CONTENT LIST */}
        {step === "list" && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("subject")}
              className="text-sm text-slate-600"
            >
              ← Back
            </button>
            {mockContent.map((item) => (
              <div
                key={item.id}
                onClick={() => setStep(item.id)}
                className="bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:scale-[1.01] transition"
              >
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-lg">{item.chapter}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusStyles[item.status] || statusStyles.none
                    }`}
                  >
                    {statusText[item.status] || statusText.none}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{item.date}</p>
                <p className="text-slate-700 mt-2">{item.preview}</p>
              </div>
            ))}
          </div>
        )}

        {/* CONTENT VIEW */}
        {typeof step === "number" && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("list")}
              className="text-sm text-slate-600"
            >
              ← Back
            </button>
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="font-semibold text-lg">Question</h2>
              <p className="mt-2">Solve x + 5 = 10</p>
            </div>
            <button className="w-full bg-slate-800 text-white rounded-xl p-4 font-medium">
              Explain with AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
