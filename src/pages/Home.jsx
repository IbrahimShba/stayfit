// JOB: the main page. Shows today numbers and the 7-day charts.
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getToday, getDay, totalCalories, totalMinutes, lastDays } from "../utils.js";

function Home({ logs }) {
  const today = getToday();
  const day = getDay(logs, today);

  // Build the data for the chart: one item for each of the last 7 days
  const chartData = lastDays(7).map((date) => {
    const d = getDay(logs, date);
    return { day: date.slice(5), calories: totalCalories(d), minutes: totalMinutes(d) };
  });

  return (
    <>
      <section className="hero text-center mb-5">
        <h1>Your health, one day at a time.</h1>
        <p className="lead mb-4">Log water, meals, workouts and sleep in under a minute.</p>
        <Link to={"/log/" + today} className="btn btn-brand btn-lg px-5">Log today</Link>
      </section>

      <h2 className="h4 mb-3">Today</h2>
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3 text-center">
            <div className="icon">💧</div>
            <div className="number">{day.water}</div>
            glasses of water
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3 text-center">
            <div className="icon">🍎</div>
            <div className="number">{totalCalories(day)}</div>
            calories eaten
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3 text-center">
            <div className="icon">🏃</div>
            <div className="number">{totalMinutes(day)}</div>
            workout minutes
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3 text-center">
            <div className="icon">😴</div>
            <div className="number">{day.sleep}</div>
            hours of sleep
          </div>
        </div>
      </div>

      <h2 className="h4 mb-3">Last 7 days</h2>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-3">
            <h3 className="h6">Calories</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#0e7c86" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card p-3">
            <h3 className="h6">Workout minutes</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#f2b134" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;