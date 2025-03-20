import React, {useState} from 'react';
import i18n from 'i18next';
import './LanguageSelect.css'; // Import the CSS file

const LanguageSelect = () => {
    const languages = [
        {code: 'en', label: 'EN'},
        {code: 'pt-BR', label: 'PT'}
    ];
    const [selectedValue, setSelectedValue] = useState(i18n.language === 'en' ? languages [0] : languages[1])
    const handleChange = (e) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
        setSelectedValue(e.target.value)
    };

    return (
        <div className="relative">
            <select
                className="custom-select"
                value={selectedValue}
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
};

export default LanguageSelect;