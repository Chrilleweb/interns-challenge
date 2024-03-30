import React from "react";

interface DayProps {
  date: Date;
}

const Day: React.FC<DayProps> = ({ date }) => {
  let dayContent: React.ReactNode;

  // Check if the date is May 1st, 2024
  if (
    date.getDate() === 1 &&
    date.getMonth() === 4
  ) {
    dayContent = (
      <>
        <div className="flex items-center">
          {date.getDate()}
          <p className="text-xs ml-2">Første maj</p>
        </div>
      </>
    );
  } else {
    dayContent = date.getDate();
  }

  return (
    <div className="day flex">
      <span>{dayContent}</span>
    </div>
  );
};

export default Day;
