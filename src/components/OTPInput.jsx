import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onComplete, disabled = false }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = pasteData.slice(0, length).split('');
    
    if (pasteArray.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      pasteArray.forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(val => val === '');
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  useEffect(() => {
    const otpValue = otp.join('');
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  }, [otp, length, onComplete]);

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  );
};

export default OTPInput;