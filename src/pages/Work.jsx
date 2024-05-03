import { customFetch } from "../utils";
const url = "/work";

export const loader = async () => {
  const response = await customFetch(url);
  console.log(response);
  return response.data;
};

const Work = () => {
  return <div>Work</div>;
};

export default Work;
