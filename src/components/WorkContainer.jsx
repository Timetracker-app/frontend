import WorkList from "./WorkList";
import { useLoaderData } from "react-router-dom";

const WorkContainer = () => {
  const { work } = useLoaderData();
  const totalWorks = work.length;
  console.log(totalWorks);
  return (
    <>
      <div>
        {totalWorks === 0 ? (
          <h5>Sorry, no works matched your search...</h5>
        ) : (
          <WorkList />
        )}
      </div>
    </>
  );
};

export default WorkContainer;
