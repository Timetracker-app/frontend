import WorkerList from "./WorkerList";
import { useLoaderData } from "react-router-dom";

const WorkerContainer = () => {
  const { workers } = useLoaderData();
  const totalWorkers = workers.length;
  console.log(totalWorkers);
  return (
    <>
      <div>
        {totalWorkers === 0 ? (
          <h5>Sorry, no workers matched your search...</h5>
        ) : (
          <WorkerList />
        )}
      </div>
    </>
  );
};

export default WorkerContainer;
