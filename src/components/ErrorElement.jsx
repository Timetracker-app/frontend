import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  if (error?.response?.status === 404) {
    return <h4>No data was found...</h4>;
  }

  return <h4>There was an error...</h4>;
};
export default ErrorElement;
