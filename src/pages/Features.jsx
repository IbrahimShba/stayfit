// JOB: lists the features and all the days the user logged.
import { Link } from "react-router-dom";
import { getToday, getDay, totalCalories } from "../utils.js";

const features = [
  { icon: "💧", title: "Water", text: "Tap once for every glass you drink." },
  { icon: "🍎", title: "Meals", text: "Write what you ate and its calories. We add them up." },
  { icon: "🏃", title: "Workouts", text: "Save the exercise you did and for how many minutes." },
  { icon: "😴", title: "Sleep", text: "Write how many hours you slept last night." },
];

function Features({ logs }) {
  // Dates that have data, newest first
  const dates = Object.keys(logs).sort().reverse();

  return (
    <>
      <h1>Features</h1>
      <div className="row g-3 my-2">
        {features.map((f) => (
          <div className="col-12 col-sm-6 col-lg-3" key={f.title}>
            <div className="card stat-card p-3 h-100 text-center">
              <div className="icon">{f.icon}</div>
              <h2 className="h5">{f.title}</h2>
              <p className="mb-0">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Link to={"/log/" + getToday()} className="btn btn-brand my-3">Log today</Link>

      <h2 className="h4 mt-3">Your logged days</h2>
      {dates.length === 0 && <p>Nothing logged yet. Start with today.</p>}
      <ul className="list-group">
        {dates.map((date) => (
          <li className="list-group-item d-flex justify-content-between" key={date}>
            <Link to={"/log/" + date}>{date}</Link>
            <span>{totalCalories(getDay(logs, date))} calories</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Features;