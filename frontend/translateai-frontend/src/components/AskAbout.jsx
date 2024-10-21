import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhiResponse } from "../api/askAbout";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const AskAbout = () => {
  const [inputType, setInputType] = useState("text"); // State for input type selection
  const [sourceText, setSourceText] = useState("");
  const [fileName, setFileName] = useState(""); // State to track uploaded file
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const { answer, loading, error } = useSelector((state) => state.phi); // Get phi state from Redux

  // Handle PDF file change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name); // Set the file name for preview
      const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
      const numPages = pdf.numPages;
      let fullText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n"; // Concatenate text from each page
      }

      setSourceText(fullText); // Set extracted text from PDF
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleQuery = (additionalQuestion) => {
    if (sourceText) {
      dispatch(fetchPhiResponse({ sourceText, question: additionalQuestion }));
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ask About Text or Document
      </h1>
      {/* Input Type Selection */}
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="text"
            checked={inputType === "text"}
            onChange={() => setInputType("text")}
          />
          Text Input
        </label>
        <label>
          <input
            type="radio"
            value="pdf"
            checked={inputType === "pdf"}
            onChange={() => setInputType("pdf")}
          />
          PDF Input
        </label>
      </div>
      <div className="flex flex-row">
        <div>
          <div className="flex items-start mr-4">
            {/* Conditional Input for PDF or Text */}
            {inputType === "text" ? (
              <textarea
                rows="10"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="resize-none border border-gray-300 rounded-lg p-3 w-[400px] h-[600px]"
                placeholder="Enter text for the model"
              />
            ) : (
              <label
                className="flex flex-col items-center justify-center bg-custom-green-light rounded-lg p-3 cursor-pointer bg-green-500 hover:bg-green-600 transition-colors duration-200 group"
                style={{ width: "400px", height: "600px" }}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName ? (
                  <div className="flex flex-col items-center text-white">
                    <span className="text-xl">{fileName}</span>
                    <span className="text-sm mt-2">(Click to change file)</span>
                  </div>
                ) : (
                  <>
                    <span className="text-3xl text-white">+</span>
                    <span className="text-lg text-white mt-2 opacity-0 transform translate-y-2 transition-opacity transition-transform duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Upload PDF Document
                    </span>
                  </>
                )}
              </label>
            )}
          </div>
        </div>

        <div className="flex items-center mb-6">
          {/* New Button for querying about the file */}
          <button
            onClick={() =>
              handleQuery("Explain the context of the following text.")
            }
            className="mt-4 bg-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            What is this file about?
          </button>
        </div>

        {/* Answer Output */}
        <textarea
          rows="10"
          value={answer}
          readOnly
          className="resize-none border border-gray-300 rounded-lg p-3 w-[400px] h-[600px]"
          placeholder="Response will appear here"
        />
      </div>

      {loading && <p className="text-blue-500 mt-4">Querying Phi-3...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default AskAbout;
