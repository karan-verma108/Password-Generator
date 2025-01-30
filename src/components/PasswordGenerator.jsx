import { useRef, useEffect, useState, useCallback } from 'react';

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
    setCopyCtaStatus({ label: 'Copied', isCopied: true });
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
    <div className='flex flex-col gap-4 h-screen justify-center items-center'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-2xl leading-5 font-medium'>
          Random Password Generator
        </h1>
        <div className='flex gap-3 p-3 items-center shadow-lg rounded-lg'>
          <input
            type='text'
            ref={inputRef}
            id='generatedPassword'
            name='generatedPassword'
            value={randomPassword}
            readOnly
            className='border border-slate-400 p-2 text-lg leading-4 font-normal'
          />
          <button
            className={`w-fit ${
              copyCtaStatus.isCopied
                ? 'bg-yellow-400 text-black'
                : 'bg-blue-500 text-white'
            } rounded-md p-2 cursor-pointer`}
            onClick={handleCopyClick}
          >
            {copyCtaStatus.label}
          </button>
        </div>
        <input
          type='range'
          min='8'
          max='20'
          value={passwordLength}
          step={'1'}
          onChange={handleRange}
        />
      </div>
      <div className='flex gap-3'>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='capitalLetters'
            name='capitalLetters'
            value={isCapitalize}
            onChange={handleCapitalizeChange}
          />
          <label
            htmlFor='capitalLetters'
            className='text-lg leading-4 font-normal'
          >
            Capitalize
          </label>
        </div>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='numberLetters'
            name='numberLetters'
            value={isNumeric}
            onChange={handleNumericChange}
          />
          <label
            htmlFor='numberLetters'
            className='text-lg leading-4 font-normal'
          >
            Numbers
          </label>
        </div>
      </div>
    </div>
  );
}
