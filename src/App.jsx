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
    // d-flex flex-column min-vh-100 = the page is at least as tall as the screen,
    // so the footer is pushed to the bottom even on short pages
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {/* flex-grow-1 = the main part takes all the free space */}
      <main className="container py-4 flex-grow-1">
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
    </div>
  );
}

export default App;