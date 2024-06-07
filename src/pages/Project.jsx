import { ProjectContainer } from "../components";
import { customFetch } from "../utils";

const url = "/project";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

export const loader = async () => {
  const response = await customFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
