import React from "react";
import Day from "./Day.tsx";
import { Holiday } from "../api/api.ts";

interface MonthProps {
  year: number;
  month: number;
  holidays: Holiday[];
}

const getWeek = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(
      ((Number(d) - Number(yearStart)) / 86400000 + 1) / 7
    );
    return weekNo;
  };

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

    const importantdayes =
      holiday?.nationalHoliday || holiday?.name === "Grundlovsdag";

    days.push(
      <div
        key={i}
        className={`day text-sm flex items-center ${
          holiday?.nationalHoliday ? "bg-stone-200" : "bg-white"
        } border border-gray-300 ${weekday === "S" ? "bg-stone-200" : ""}`}
        style={{ width: "13rem" }}
      >
        <div
          className={`flex items-center ${
            weekday === "L" ? "bg-stone-200 pr-1" : ""
          }`}
        >
          <p
            style={{
              width: "1.8rem",
              paddingLeft: "0.2rem",
            }}
          >
            {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
          </p>
          <Day date={currentDate} />
        </div>
        {importantdayes && <span className="text-xs ml-2">{holiday.name}</span>}
        <div>
        {weekday === "M" && (
            <span className="text-xs mr-2 justify-between">{`${getWeek(currentDate)}`}</span>
          )}
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
