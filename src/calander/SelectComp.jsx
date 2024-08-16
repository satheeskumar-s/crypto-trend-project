import React, { useEffect, useState } from 'react';
import { Day } from './Day';
import { Button, Input } from '@mui/material';

export const Calander = ({ year = 2024, month = 1 }) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    if (second == 0 && loop !== 5) {
      setSec(60);
      setLoop(loop + 1);
    }
  }, [second]);

  const onChangeInput = (e) => {
    const val = e.target.val;
    //Do any other logics with val;

    setUserInput(val);
  };


  return (
    <>
      <Button onClick={() => setInputOpen(true)} />

      {inputOpen && <Input onChange={onChangeInput} />}
    </>
  );
};
