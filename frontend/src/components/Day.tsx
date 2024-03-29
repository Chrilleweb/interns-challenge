import React from "react";

interface DayProps {
  date: Date;
}

const Day: React.FC<DayProps> = ({ date }) => {
  return (
    <div className="day">
      <span>{date.getDate()}</span>
    </div>
  );
};

export default Day;
