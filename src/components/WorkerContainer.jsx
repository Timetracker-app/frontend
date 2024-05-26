import WorkerList from "./WorkerList";
import { useLoaderData } from "react-router-dom";

const WorkerContainer = () => {
  const { workers } = useLoaderData();
  const totalWorkers = workers.length;
  console.log(totalWorkers);
  return (
    <>
      <div className="flex-1 p-4">
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
