import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <h2>TimeTracker</h2>
          <Link to="/landing">Sign Out</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
