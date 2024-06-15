import { Form } from "react-router-dom";
import {
  FormInput,
  FormCheckbox,
  PageTitle,
  Notification,
} from "../components";
import { customFetch } from "../utils";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";

const url = "/project";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

const handleAdd = async (data, notify) => {
  console.log(data);
  try {
    const response = await customFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    console.log(response);
    if (response.status === 201) {
      notify("Project was successfully added!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 106) {
      console.log(error?.response?.data?.errorMsg);
      notify("Project with this name already exist!", "error");
    } else {
      console.log("Failed to add project", error);
      notify("Failed to add project", "error");
    }
    return null;
  }
};

const AddProject = () => {
  const { notify } = useNotification();

  const [project, setProject] = useState("");
  const [checked, setChecked] = useState(0);

  const projectChange = (event) => {
    setProject(event.target.value);
  };
  const checkboxChange = (event) => {
    setChecked(event.target.checked ? 1 : 0);
  };

  const handleAddClick = (e) => {
    e.preventDefault();

    const data = {
      projekt: project,
      status: checked,
    };
    handleAdd(data, notify, token);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Project" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
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
        <button
          type="submit"
          className="bg-base-300 btn btn-sm"
          onClick={handleAddClick}
        >
          Add
        </button>
      </Form>
      <Notification />
    </div>
  );
};

export default AddProject;
