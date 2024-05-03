import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Home;
