import React from 'react';

export const Day = ({ date, weekDay }) => {
  return (
    <span style={{ padding: '10px' }}>
      <>Date: {date}</>
      <>Day: {weekDay}</>
    </span>
  );
};
