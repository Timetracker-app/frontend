import ProjectList from "./ProjectList";
import { useLoaderData } from "react-router-dom";

const ProjectContainer = () => {
  const { projects } = useLoaderData();
  const totalProjects = projects.length;
  console.log(totalProjects);
  return (
    <>
      <div className="flex-1 p-4">
        {totalProjects === 0 ? (
          <h5>Sorry, no projects matched your search...</h5>
        ) : (
          <ProjectList />
        )}
      </div>
    </>
  );
};

export default ProjectContainer;
