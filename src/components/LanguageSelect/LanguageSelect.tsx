import React from 'react';
import {useTranslation} from 'react-i18next';
import './LanguageSelect.css';

interface LanguageSelectProps {
    onLanguageChange: (newLanguage: string) => void
}

export function LanguageSelect({onLanguageChange}: LanguageSelectProps) {
    const {i18n} = useTranslation();

    const languages = [
        {code: 'en', label: 'EN'},
        {code: 'pt', label: 'PT'}
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        console.log("Selected language:", selectedLanguage);

        // Change the language  
        i18n.changeLanguage(selectedLanguage).then(() => {
            console.log("Language changed to:", i18n.language);
            onLanguageChange(selectedLanguage);
        });
    };

    return (
        <div className="relative">
            <select
                className="custom-select"
                value={i18n.language} // Directly use i18n.language as the value  
                onChange={handleChange}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LanguageSelect;  