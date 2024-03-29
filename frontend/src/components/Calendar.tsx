import React, { useEffect, useState } from "react";
import Month from "./Month.tsx";
import { Holiday, fetchHolidays } from "../api/api.ts";

const Calendar: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startDate = "2024-01-01";
    const endDate = "2024-12-31";

    fetchHolidays(startDate, endDate)
      .then((data) => {
        if (Array.isArray(data)) {
          setHolidays(groupHolidaysByMonth(data));
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const groupHolidaysByMonth = (holidays: Holiday[]): Holiday[][] => {
    const groupedHolidays: Holiday[][] = Array.from({ length: 12 }, () => []);

    holidays.forEach((holiday) => {
      const month = new Date(holiday.date).getMonth();
      groupedHolidays[month].push(holiday);
    });

    return groupedHolidays;
  };

  return (
    <div className="calendar">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {holidays.map((monthHolidays, index) => (
            <Month
              key={index}
              year={2024}
              month={index}
              holidays={monthHolidays}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
