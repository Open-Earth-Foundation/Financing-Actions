import React from 'react';
import {useTranslation} from 'react-i18next';
import './LanguageSelect.css';

export function LanguageSelect() {
    const {i18n} = useTranslation();

    const languages = [
        {code: 'en', label: 'EN'},
        {code: 'pt', label: 'PT'}
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage)
    };

    return (
        <div className="relative">
            <select
                className="custom-select"
                value={i18n.language}
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