import { WorkContainer, WorkFilter } from "../components";
import { customFetch } from "../utils";
const url = "/work";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

export const loader = async ({ request }) => {
  var params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(request);

  if (Object.keys(params).length === 0) {
    params = {
      worker: "",
      project: "",
      workplace: "",
      starttime: "",
      endtime: "",
    };
  }

  const response = await customFetch(url, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const work = response.data.result;
  console.log(work);

  const workersResponse = await customFetch("/worker", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workers = workersResponse.data.result;

  const workplacesResponse = await customFetch("/workplace", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workplaces = workplacesResponse.data.result;

  const projectsResponse = await customFetch("/project", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const projects = projectsResponse.data.result;

  return { work, params, workers, projects, workplaces };
};

const Work = () => {
  return (
    <>
      <WorkFilter />
      <WorkContainer />
    </>
  );
};

export default Work;
