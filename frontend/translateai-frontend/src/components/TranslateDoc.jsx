import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranslation } from "../api/translationApi";
import { pdfjs } from "react-pdf";
import TranslateBtnImg from "../assets/translation.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const TranslateDoc = () => {
  const [sourceFile, setSourceFile] = useState(null);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [pdfText, setPdfText] = useState("");
  const dispatch = useDispatch();

  const { translatedText, loading, error } = useSelector(
    (state) => state.translation
  ); // Get translation state from Redux

  // Reset state when component mounts
  useEffect(() => {
    setSourceFile(null);
    setSourceLang("");
    setTargetLang("");
    setPdfText("");
  }, []);

  // Handle file change (PDF or any document)
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
      const numPages = pdf.numPages;
      let fullText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n"; // Concatenate text from each page
      }

      setPdfText(fullText);
      setSourceFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle translation of the extracted text
  const handleTranslate = () => {
    if (sourceLang && targetLang && pdfText) {
      dispatch(
        fetchTranslation({ sourceText: pdfText, sourceLang, targetLang })
      );
    } else {
      alert("Please fill in all fields and upload a document");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Translate Document
      </h1>

      <div className="flex items-center mb-3">
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
          <option value="tr">Turkish</option>
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
          <option value="big-tr">Turkish</option>
        </select>
      </div>
      <div className="w-full mb-3 flex items-center justify-center">
        <label className="bg-custom-green-light rounded-lg cursor-pointer transition-colors duration-200 group p-3 w-1/4 ">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="flex items-center justify-center text-xl text-white  transform  transition-opacity transition-transform duration-300 group-hover:opacity-100">
            {sourceFile ? "Change PDF Document" : "Upload PDF Document"}
          </span>
        </label>
      </div>

      <div className="flex justify-between w-full">
        {/* Upload PDF Document */}

        {/* Editable Extracted Text */}
        <textarea
          rows="20"
          value={pdfText}
          onChange={(e) => setPdfText(e.target.value)}
          className="resize-none border border-gray-300 rounded-lg p-3 w-[600px] h-[700px] mr-4"
          placeholder="Extracted text will appear here"
        ></textarea>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          className="mt-3 bg-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          <img width={75} src={TranslateBtnImg} alt="Translate" />
        </button>

        {/* Target Language Output */}
        <textarea
          rows="20"
          value={error ? `Error: ${error}` : translatedText}
          readOnly
          className="resize-none border border-gray-300 rounded-lg p-3 w-[600px] h-[700px] ml-4"
          placeholder="Translation will appear here"
        ></textarea>
      </div>

      {loading && <p className="text-blue-500 mt-4">Translating...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default TranslateDoc;
