import { PrivateRoute } from "./pages/PrivateRoute";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TranslateTextPage from "./pages/TranslateTextPage";
import TranslateDocPage from "./pages/TranslateDocPage";
import AskAboutPage from "./pages/AskAboutPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/translate_txt" element={<TranslateTextPage />} />
        <Route path="/translate_doc" element={<TranslateDocPage />} />
        <Route path="/ask_about" element={<AskAboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
