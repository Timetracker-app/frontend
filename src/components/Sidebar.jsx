import { links } from "./SideLinks";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <div className="sidebar-header"></div>
      <ul className="links">
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <NavLink to={url}>
                {icon}
                {text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
