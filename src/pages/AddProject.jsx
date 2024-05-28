import { Form } from "react-router-dom";
import { FormInput, FormCheckbox } from "../components";

const AddProject = () => {
  return (
    <div>
      <div className="text-xl my-4">Add Project</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
        <FormInput
          type="text"
          label="project name"
          name="project"
          size="select-sm"
        />
        <FormCheckbox
          name="status"
          label="active"
          defaultValue="on"
          size="select-sm"
        />
        <button type="submit" className="bg-base-300 btn btn-sm">
          Add
        </button>
      </Form>
    </div>
  );
};

export default AddProject;
