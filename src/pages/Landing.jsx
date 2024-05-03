import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>TimeTracker</h1>
      <p>
        Administrator application for simple work tracking. Includes time
        tracking of work, workplaces, projects and workers.
      </p>
      <Link to="/login" className="btn">
        Login
      </Link>
    </div>
  );
};

export default Landing;
