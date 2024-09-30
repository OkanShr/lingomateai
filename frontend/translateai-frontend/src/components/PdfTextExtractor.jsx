import React, { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfTextExtractor = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setLoading(true);
      setError(null);
      setText("");

      try {
        const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
        const numPages = pdf.numPages;
        let fullText = "";

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        setText(fullText);
      } catch (err) {
        setError("Failed to extract text from PDF.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">PDF Text Extractor</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 border border-gray-300 rounded-lg p-2 cursor-pointer"
      />
      {loading && <p className="text-blue-500">Extracting text...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <textarea
        rows="10"
        value={text}
        readOnly
        className="resize-none border border-gray-300 rounded-lg p-3 w-full"
        placeholder="Extracted text will appear here"
      />
    </div>
  );
};

export default PdfTextExtractor;
