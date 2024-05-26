import WorkplaceList from "./WorkplaceList";
import { useLoaderData } from "react-router-dom";

const WorkplaceContainer = () => {
  const { workplaces } = useLoaderData();
  const totalWorkplaces = workplaces.length;
  console.log(totalWorkplaces);
  return (
    <>
      <div className="flex-1 p-4">
        {totalWorkplaces === 0 ? (
          <h5>Sorry, no workplaces matched your search...</h5>
        ) : (
          <WorkplaceList />
        )}
      </div>
    </>
  );
};

export default WorkplaceContainer;
