import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-4 overflow-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Home;
