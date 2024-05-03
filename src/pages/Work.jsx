import { WorkContainer, WorkFilter } from "../components";
import { customFetch } from "../utils";
const url = "/work";

export const loader = async () => {
  const response = await customFetch(url);
  const work = response.data.result;
  console.log(work);

  return { work };
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
