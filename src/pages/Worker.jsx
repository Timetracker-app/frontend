import { WorkerContainer } from "../components";
import { customFetch } from "../utils";
const url = "/worker";

export const loader = async () => {
  const response = await customFetch(url);
  const workers = response.data.result;
  console.log(workers);

  return { workers };
};

const Worker = () => {
  return (
    <>
      <WorkerContainer />
    </>
  );
};

export default Worker;
