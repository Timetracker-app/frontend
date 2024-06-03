import { Link, useNavigate } from "react-router-dom";
import useToken from "../features/useToken";

const Header = () => {
  const navigate = useNavigate();
  const { removeToken } = useToken();
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);

  const handleLogout = (token) => {
    removeToken(token);
    navigate("/login");
  };
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        <div className="flex gap-x-2 sm:gap-x-8 items-center">
          <p className="text-xs sm:text-sm">Hello, {user.user}</p>
          <button className="btn btn-sm btn-ghost " onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
