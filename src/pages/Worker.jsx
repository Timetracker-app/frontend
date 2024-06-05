import { WorkerContainer } from "../components";
import { customFetch } from "../utils";
const url = "/worker";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString.token;

export const loader = async () => {
  const response = await customFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
