import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import { FormCheckbox } from "../components";

export const loader = async ({ params }) => {
  const response = await customFetch(`/project/${params.name}`);
  console.log(response.data.result);
  return { project: response.data.result };
};

const SingleProject = () => {
  const { project } = useLoaderData();
  const projectName = project.map((item) => item.projekt)[0];
  const time = project.map((item) => item.cas)[0];
  const status = project.map((item) => item.status)[0];

  return (
    <div>
      <div className="text-xl my-4">Edit Project</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="name"
          name="project name"
          size="select-sm"
          defaultValue={projectName}
        />
        <FormCheckbox
          name="time"
          label="reset time"
          defaultValue=""
          size="select-sm"
        />
        <FormCheckbox
          name="status"
          label="active"
          defaultValue={status === 1 ? "on" : ""}
          size="select-sm"
        />
        <button type="submit" className="bg-base-300 btn btn-sm">
          Edit
        </button>
        <button className="btn btn-sm btn-error">Delete</button>
      </Form>
    </div>
  );
};
export default SingleProject;
