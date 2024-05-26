import {
  PaginationContainer,
  WorkContainer,
  WorkFilter,
  AddWork,
} from "../components";
import { customFetch } from "../utils";
const url = "/work";

export const loader = async ({ request }) => {
  console.log(request);
  var params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  if (Object.keys(params).length === 0) {
    params = {
      worker: "",
      project: "",
      workplace: "",
      starttime: "",
      endtime: "",
    };
  }
  console.log(params);

  const response = await customFetch(url, { params });
  const work = response.data.result;
  console.log(work);

  return { work, params };
};

const Work = () => {
  return (
    <>
      <WorkFilter />
      <AddWork />
      <WorkContainer />
      {/*<PaginationContainer /> */}
    </>
  );
};

export default Work;
