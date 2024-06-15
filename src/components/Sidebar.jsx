import { useSelector } from "react-redux";
import { links } from "./SideLinks";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-base-200">
      <div className="flex flex-col items-start p-4">
        <NavLink to="/" className="btn text-3xl my-4">
          TimeTracker
        </NavLink>
        <div className="lg:flex flex-col w-full">
          <ul className="menu bg-base-200 w-56 rounded-box">
            {links.map((link) => {
              const { id, url, text, icon, subLinks } = link;
              return (
                <li className="text-lg" key={id}>
                  <NavLink className="capitalize" to={url}>
                    {icon}
                    {text}
                  </NavLink>
                  {subLinks && subLinks.length > 0 && (
                    <ul className="menu bg-base-200 w-56 rounded-box">
                      {subLinks.map((subLink) => {
                        const {
                          id: subId,
                          url: subUrl,
                          text: subText,
                          icon: subIcon,
                        } = subLink;
                        return (
                          <li className="text-sm" key={subId}>
                            <NavLink className="capitalize" to={subUrl}>
                              {subIcon}
                              {subText}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
