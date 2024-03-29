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

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    const holiday = holidays.find((h) => {
      const holidayDate = new Date(h.date);
      return (
        holidayDate.getDate() === currentDate.getDate() &&
        holidayDate.getMonth() === currentDate.getMonth() &&
        holidayDate.getFullYear() === currentDate.getFullYear()
      );
    });

    console.log("Holiday for", currentDate, "is", holiday);

    days.push(
      <div key={i} className="flex items-start">
        <div className="mr-2">
          <Day date={currentDate} />
        </div>
        {holiday && (
          <span className="text-sm text-gray-500">{holiday.name}</span>
        )}
      </div>
    );
  }

  return (
    <div className="month p-4 mt-2">
      <div className="mb-2">{monthName}</div>
      <div className="flex flex-col">{days}</div>
    </div>
  );
};

export default Month;
