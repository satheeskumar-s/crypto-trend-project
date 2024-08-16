import React from 'react';
import { Day } from './Day';
import { Timer } from './Timer';

export const Calander = ({ year = 2024, month = 1 }) => {
  const days = new Date(year, month, 0).getDate();
  let week = [];
  let dayCount = 1;

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let eachWeek = [];
  while (dayCount <= days) {
    const day = new Date(year, month - 1, dayCount).getDay();

    eachWeek.push({
      day,
      date: dayCount,
      weekday: weekday[day],
    });

    if (day === 6 || dayCount === days) {
      week.push(eachWeek);
      eachWeek = [];
    }

    dayCount++;
  }

  return (
    <>
      <Timer />
      {week.length > 0 && (
        <div>
          {week.map((eachWeek, i) => {
            return (
              <>
                <div key={`week-${i}`}>
                  {eachWeek.map((eachDay, j) => {
                    return (
                      <Day
                        key={`day-${j}`}
                        date={eachDay.date}
                        weekDay={eachDay.weekday}
                      />
                    );
                  })}
                </div>
                <br />
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
