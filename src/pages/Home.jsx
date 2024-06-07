import { Outlet, useNavigation } from "react-router-dom";
import { Header, Footer, Sidebar, Loading } from "../components";

const Home = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {isPageLoading ? (
          <section className="flex-1 p-4 overflow-auto">
            <Loading />
          </section>
        ) : (
          <section className="flex-1 p-4 overflow-auto">
            <Outlet />
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
