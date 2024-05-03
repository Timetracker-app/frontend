import { WorkplaceContainer } from "../components";
import { customFetch } from "../utils";
const url = "/workplace";

export const loader = async () => {
  const response = await customFetch(url);
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
