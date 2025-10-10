// app/components/UI/SearchBarDropdown.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { defaultNS } from '@/app/i18n/settings';

interface SearchBarDropdownProps {
  lng: string;
}

export default function SearchBarDropdown({ lng }: SearchBarDropdownProps) {
  const { t } = useTranslation(lng, defaultNS);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Update trip options to align with the chatbot's instructions
  const searchOptions = [
    { name: t('search_option_history'), id: 'greek-history-tours' },
    { name: t('search_option_islands_nature'), id: 'island-beach-escapes' },
    { name: t('search_option_history_beaches'), id: 'history-nature' },
  ];

  const handleOptionClick = (optionName: string) => {
    setSearchValue(optionName);
    setIsDropdownOpen(false);
  };

  const handleSearchSubmit = () => {
    const selectedOption = searchOptions.find(opt => opt.name === searchValue);
    if (selectedOption) {
      const targetElement = document.getElementById(selectedOption.id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsDropdownOpen(false);
      } else {
        console.warn(t('search_error_id_not_found', { id: selectedOption.id }));
        alert(t('search_alert_id_not_found'));
      }
    } else {
      alert(t('search_alert_no_option'));
    }
  };

  return (
    <div
      className="relative bg-white p-6 rounded-lg shadow-xl inline-block max-w-lg w-full"
      onFocus={() => setIsDropdownOpen(true)}
      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
    >
      <input
        type="text"
        placeholder={t('search_placeholder')}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400 text-gray-800 cursor-pointer"
        value={searchValue}
        // This is the key change: readOnly prevents typing
        readOnly
        // We still need onChange to handle the dropdown selection, so we keep it.
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
          {searchOptions.map((option) => (
            <div
              key={option.id}
              className="p-3 text-left text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              onMouseDown={(e) => {
                e.preventDefault();
                handleOptionClick(option.name);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSearchSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
      >
        {t('search_button')}
      </button>
    </div>
  );
}