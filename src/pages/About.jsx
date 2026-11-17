// JOB: explains what the app is and who made it.
function About() {
  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <h1>About StayFit</h1>
        <p>
          StayFit is a personal wellness tracker. Many people want to eat better,
          move more and sleep well, but they forget what they did during the week.
          StayFit lets you write it down in seconds and see it in simple charts.
        </p>
        <h2 className="h4 mt-4">How it works</h2>
        <p>
          You pick a day, add your water, meals, workouts and sleep, and the app adds
          everything up for you. Your data is saved in your own browser, so nothing is
          sent to a server.
        </p>
        <h2 className="h4 mt-4">Built with</h2>
        <ul>
          <li>React and React Router</li>
          <li>Bootstrap for the responsive layout</li>
          <li>Recharts for the charts</li>
          <li>Git, GitHub and Vercel</li>
        </ul>

      </div>

      {/* Who made the app: its own full-width block, so the card sits in the center */}
      <div className="col-12">
        <div className="card stat-card p-4 mt-4 mx-auto text-center" style={{ maxWidth: "600px" }}>
          <h2 className="h5 mb-1">Created by Ibrahim Shbaklo</h2>
          <p className="mb-0">Built solo as a project for CSCI426 Advanced Web Programming.</p>
        </div>
      </div>
    </div>
  );
}

export default About;