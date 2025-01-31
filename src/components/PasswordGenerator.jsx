import { useRef, useEffect, useState, useCallback } from 'react';

import {
  PasswordLengthRange,
  PasswordInputWithCopyCTA,
  CheckboxWithLabel,
} from './elements';

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [randomPassword, setRandomPassword] = useState('');

  const [isCapitalize, setIsCapitalize] = useState(false);
  const [isNumeric, setIsNumeric] = useState(false);
  const [copyCtaStatus, setCopyCtaStatus] = useState({
    label: 'Copy',
    isCopied: false,
  });

  const generateRandomPassword = useCallback(
    (min, max) => {
      let finalStr = '';
      for (let i = 0; i < passwordLength; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        finalStr += String.fromCharCode(randomNum);
      }

      setRandomPassword(finalStr);
      setCopyCtaStatus({ label: 'Copy', isCopied: false });
    },
    [passwordLength] //a new reference of this function will only be created when its dependency passwordLength changes, otherwise React will reuse the same function refernece across all re-renders
  );

  const inputRef = useRef();

  const handleRange = (e) => {
    setPasswordLength(Number(e.target.value));
  };

  const handleCapitalizeChange = () => {
    setIsCapitalize((prevState) => !prevState);
  };

  const handleNumericChange = () => {
    setIsNumeric((prevState) => !prevState);
  };

  const handleCopyClick = () => {
    inputRef.current?.select();
    navigator.clipboard.writeText(randomPassword);
    setCopyCtaStatus({ label: 'Copied !', isCopied: true });
  };

  useEffect(() => {
    if (isCapitalize && isNumeric) {
      generateRandomPassword(48, 90);
    } else if (isCapitalize) {
      generateRandomPassword(65, 90);
    } else if (isNumeric) {
      generateRandomPassword(48, 57);
    } else {
      generateRandomPassword(97, 122);
    }
  }, [isCapitalize, isNumeric, setPasswordLength, generateRandomPassword]);

  return (
    <div className='flex flex-col gap-4 h-screen justify-center items-center bg-gradient-to-bl from-amber-500 to-lime-500 relative'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-2xl leading-5 font-medium'>
          Random Password Generator
        </h1>
        <PasswordInputWithCopyCTA
          password={randomPassword}
          inputRef={inputRef}
          copyCtaStatus={copyCtaStatus}
          onClick={handleCopyClick}
        />
        <PasswordLengthRange length={passwordLength} onChange={handleRange} />
      </div>
      <div className='flex gap-3 shadow-lg p-4 rounded-lg border border-slate-200'>
        <CheckboxWithLabel
          id='capitalLetters'
          name='capitalLetters'
          label='Capitalize'
          value={isCapitalize}
          onChange={handleCapitalizeChange}
        />
        <CheckboxWithLabel
          id='numberLetters'
          name='numberLetters'
          label='Numbers'
          value={isNumeric}
          onChange={handleNumericChange}
        />
      </div>
      <p className='text-lg font-medium leading-5 absolute bottom-5'>
        Made with ❤️ by Karan
      </p>
    </div>
  );
}
