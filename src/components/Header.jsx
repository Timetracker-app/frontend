import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          TimeTracker
          <Link to="/landing">Sign Out</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
