import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranslation } from "../api/translationApi";

const TranslateText = () => {
  const [sourceText, setSourceText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const dispatch = useDispatch();
  const { translatedText, loading, error } = useSelector(
    (state) => state.translation
  ); // Get translation state from Redux

  const handleTranslate = () => {
    if (sourceLang && targetLang && sourceText) {
      dispatch(fetchTranslation({ sourceText, sourceLang, targetLang }));
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Translate Text</h1>

      <div className="flex items-center mb-6">
        {/* Source Language */}
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mr-2"
        >
          <option value="" disabled>
            Source Language
          </option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>

        <span className="text-lg mx-2">➡️</span>

        {/* Target Language */}
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 ml-2"
        >
          <option value="" disabled>
            Target Language
          </option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="flex justify-between w-full ">
        {/* Source Language Input */}
        <textarea
          rows="10"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          className="resize-none border border-gray-300 rounded-lg p-3 w-72 mr-4"
          placeholder="Enter text in source language"
        ></textarea>

        <button
          onClick={handleTranslate}
          className="mt-4 bg-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Translate me
        </button>

        {/* Target Language Output */}
        <textarea
          rows="10"
          value={translatedText}
          readOnly
          className="resize-none border border-gray-300 rounded-lg p-3 w-72"
          placeholder="Translation will appear here"
        ></textarea>
      </div>

      {loading && <p className="text-blue-500 mt-4">Translating...</p>}

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default TranslateText;
