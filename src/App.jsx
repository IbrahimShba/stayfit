// JOB: the main file. It keeps all the data and decides which page to show.
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Features from "./pages/Features.jsx";
import Contact from "./pages/Contact.jsx";
import DayLog from "./pages/DayLog.jsx";

// Read the saved data from the browser (localStorage). If nothing is saved, start empty.
function loadLogs() {
  const saved = localStorage.getItem("stayfit-logs");
  if (saved) {
    return JSON.parse(saved);
  }
  return {};
}

function App() {
  // "logs" holds every day the user logged, like { "2026-11-16": { water: 3, ... } }
  const [logs, setLogs] = useState(loadLogs());

  // Save one day: update the data on screen AND in the browser
  function updateDay(date, newDay) {
    const newLogs = Object.assign({}, logs); // make a copy of all logs
    newLogs[date] = newDay;                  // put the new day inside
    setLogs(newLogs);                        // show it on screen
    localStorage.setItem("stayfit-logs", JSON.stringify(newLogs)); // keep it saved
  }

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home logs={logs} />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features logs={logs} />} />
          <Route path="/contact" element={<Contact />} />
          {/* The dynamic page: ":date" changes in the link */}
          <Route path="/log/:date" element={<DayLog logs={logs} updateDay={updateDay} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
