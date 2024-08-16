import React, { useEffect, useState } from 'react';

export const Timer = () => {
  const [sec, setSec] = useState(10);

  useEffect(() => {
    const startTimer = setInterval(() => {
      setSec((pre) => {
        if (pre === 1) {
          clearTimeout(startTimer);
          return 0;
        }

        return pre - 1;
      });
    }, 1000);
  }, []);

  return <div>{sec}</div>;
};
