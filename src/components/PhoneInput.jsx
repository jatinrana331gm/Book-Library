import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
];

const PhoneInput = ({ value, onChange, disabled = false, placeholder = "Enter phone number" }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const fullNumber = country.code + phoneNumber;
    onChange(fullNumber);
  };

  const handlePhoneChange = (e) => {
    const number = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(number);
    const fullNumber = selectedCountry.code + number;
    onChange(fullNumber);
  };

  return (
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <div className="flex">
        <div className="relative">
          <select
            value={selectedCountry.code}
            onChange={(e) => {
              const country = countryCodes.find(c => c.code === e.target.value);
              handleCountryChange(country);
            }}
            disabled={disabled}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default PhoneInput;