// Importing necessary modules
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

// Country data starts here
const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
};

const rtlLanguages = ["ar", "he", "fa", "ur", "iw", "yi"];

// React Component starts here
  const LanguageTranslator = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("si-LK");

  useEffect(() => {
    document.getElementById("from-text").setAttribute("dir", rtlLanguages.includes(fromLang.split("-")[0]) ? "rtl" : "ltr");
    document.getElementById("to-text").setAttribute("dir", rtlLanguages.includes(toLang.split("-")[0]) ? "rtl" : "ltr");
  }, [fromLang, toLang]);

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const handleTranslate = async () => {
    if (!fromText.trim()) return;
    setToText("Translating...");
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLang.split("-")[0]}|${toLang.split("-")[0]}`);
      const data = await response.json();
      console.log(data);

      setToText(data.responseData.translatedText || "Translation failed.");
    } catch (error) {
      console.error("Translation error:", error);
      setToText("An error occurred.");
    }
  };

  const handleSpeech = (text, lang) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if ('speechSynthesis' in window) {
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis is not supported in this browser.");
    }
  };

  // HTML starts here
  return (
    <div className="container">
      <h1 className="translator-name">Language Translator</h1>
      <div className="wrapper">
        <div className="text-input">
          <textarea id="from-text"spellCheck="false"value={fromText}onChange={(e) => setFromText(e.target.value)}placeholder="Enter text"/>
          <textarea id="to-text"spellCheck="false"value={toText}readOnly disabled placeholder="Translation"/>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons" onClick={() => handleSpeech(fromText, fromLang)}>
              <i className="fas fa-volume-up"></i>
            </div>
            <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </li>
          <li className="exchange" onClick={handleExchange}>
            <i className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
            <div className="icons" onClick={() => handleSpeech(toText, toLang)}>
              <i className="fas fa-volume-up"></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={handleTranslate}>Translate Text</button>
    </div>
  );
};

export default LanguageTranslator;
