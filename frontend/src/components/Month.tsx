import React from "react";
import Day from "./Day.tsx";
import { Holiday } from "../api/api.ts";

interface MonthProps {
  year: number;
  month: number;
  holidays: Holiday[];
}

const Month: React.FC<MonthProps> = ({ year, month, holidays }) => {
  const monthName = new Date(year, month).toLocaleDateString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: React.ReactNode[] = [];

  const weekdays = ["S", "M", "T", "O", "T", "F", "L"];

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    const weekday = weekdays[currentDate.getDay()];

    const holiday = holidays.find((h) => {
      const holidayDate = new Date(h.date);
      return (
        holidayDate.getDate() === currentDate.getDate() &&
        holidayDate.getMonth() === currentDate.getMonth() &&
        holidayDate.getFullYear() === currentDate.getFullYear()
      );
    });

    days.push(
      <div
        key={i}
        className={`day items-start text-sm flex ${
          holiday ? "bg-stone-300" : "bg-white"
        } border border-gray-400 ${
          weekday === "S" || weekday === "L" ? "bg-stone-300" : ""
        }`}
        style={{ width: "12rem" }}
      >
        <div className="flex items-start">
          <p style={{ width: "1.8rem", paddingLeft: "0.2rem" }}>
            {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
          </p>
          <Day date={currentDate} />
          {holiday && <span className="text-sm ml-2">{holiday.name}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="month">
      <div className="mb-2 text-center font-semibold">{monthName} 2024</div>
      <div className="flex flex-col">{days}</div>
    </div>
  );
};

export default Month;
