import { WorkplaceContainer } from "../components";
import { customFetch } from "../utils";
const url = "/workplace";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

export const loader = async () => {
  const response = await customFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workplaces = response.data.result;
  console.log(workplaces);

  return { workplaces };
};

const Workplace = () => {
  return (
    <>
      <WorkplaceContainer />
    </>
  );
};

export default Workplace;
