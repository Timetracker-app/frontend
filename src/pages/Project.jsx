import { ProjectContainer } from "../components";
import { customFetch } from "../utils";
const url = "/project";

export const loader = async () => {
  const response = await customFetch(url);
  const projects = response.data.result;
  console.log(projects);

  return { projects };
};

const Project = () => {
  return (
    <>
      <ProjectContainer />
    </>
  );
};

export default Project;
