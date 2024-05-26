import { links } from "./SideLinks";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-base-200">
      <div className="flex flex-col items-start p-4">
        {/* Title */}
        <NavLink to="/" className="btn text-3xl my-4">
          TimeTracker
        </NavLink>
        <div className="lg:flex flex-col w-full">
          <ul className="menu bg-base-200 w-56 rounded-box">
            {links.map((link) => {
              const { id, url, text, icon } = link;
              return (
                <li className="text-lg" key={id}>
                  <NavLink className="capitalize" to={url}>
                    {icon}
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
