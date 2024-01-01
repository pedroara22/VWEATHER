import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowClimage from "./components/ShowClimage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ShowClimage />} />
      </Routes>
    </Router>
  );
}

export default App;
