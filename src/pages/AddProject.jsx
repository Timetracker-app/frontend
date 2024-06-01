import { Form } from "react-router-dom";
import { FormInput, FormCheckbox, PageTitle } from "../components";
import { customFetch } from "../utils";
import { useState } from "react";

const url = "/project";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  console.log(request);

  try {
    const response = await customFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const AddProject = () => {
  const [project, setProject] = useState("");
  const [checked, setChecked] = useState(0);

  const projectChange = (event) => {
    setProject(event.target.value);
  };
  const checkboxChange = (event) => {
    setChecked(event.target.checked ? 1 : 0);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Project" />
      </div>
      <Form
        method="post"
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center"
      >
        <FormInput
          type="text"
          label="project name"
          name="projekt"
          value={project}
          onChange={projectChange}
          size="select-sm"
        />
        <FormCheckbox
          name="status"
          label="active"
          checked={checked}
          onChange={checkboxChange}
        />
        <button type="submit" className="bg-base-300 btn btn-sm">
          Add
        </button>
      </Form>
    </div>
  );
};

export default AddProject;
