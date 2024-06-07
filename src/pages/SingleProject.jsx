import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import {
  FormInput,
  FormCheckbox,
  PageTitle,
  Notification,
} from "../components";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

export const loader = async ({ params }) => {
  const response = await customFetch(`/project/${params.name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.result);
  return { project: response.data.result };
};

const handleUpdate = async (projectName, updatedData, notify) => {
  console.log(updatedData);

  try {
    const response = await customFetch(`/project/${projectName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedData,
    });
    if (response.status === 204) {
      notify("Project was successfully edited!", "success");
    }
    console.log(response);
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 107) {
      console.log(error?.response?.data?.errorMsg);
      notify("Project does not exist!", "error");
    } else {
      console.log("Failed to edit project", error);
      notify("Failed to edit project", "error");
    }
    console.log(error);

    return null;
  }
};

const handleDelete = async (projectName, notify) => {
  try {
    const response = await customFetch(`/project/${projectName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 204) {
      notify("Project was successfully deleted!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 107) {
      console.log(error?.response?.data?.errorMsg);
      notify("Project does not exist!", "error");
    } else {
      console.log("Failed to delete project", error);
      notify("Failed to delete project", "error");
    }
    return null;
  }
};

const SingleProject = () => {
  const { notify } = useNotification();

  const { project } = useLoaderData();
  const projectName = project.map((item) => item.projekt)[0];
  const time = project.map((item) => item.cas)[0];
  const status = project.map((item) => item.status)[0];

  const [name, setName] = useState(projectName);
  const [activity, setActivity] = useState(status);
  const [reset, setReset] = useState(0);

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const activityChange = (event) => {
    setActivity(event.target.checked ? 1 : 0);
  };
  const resetChange = (event) => {
    setReset(event.target.checked ? 1 : 0);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const updatedTime = reset === 1 ? "00:00:00" : time;

    const updatedData = { projekt: name, status: activity, cas: updatedTime };
    handleUpdate(projectName, updatedData, notify);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(projectName, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Edit Project" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="name"
          name="project name"
          value={name}
          onChange={nameChange}
          disabled={true}
          size="select-sm"
        />
        <FormCheckbox
          name="time"
          label="reset time"
          checked={reset}
          onChange={resetChange}
        />
        <FormCheckbox
          name="status"
          label="active"
          checked={activity}
          onChange={activityChange}
        />
        <button className="bg-base-300 btn btn-sm" onClick={handleUpdateClick}>
          Edit
        </button>
        <button className="btn btn-sm btn-error" onClick={handleDeleteClick}>
          Delete
        </button>
      </Form>
      <Notification />
      <div>
        <dialog id="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this project?
            </h3>
            <p className="py-4">
              If you delete selected project, all associated works will also be
              deleted.{" "}
            </p>
            <p className="py-4">
              We recommend that you mark it as inactive or export the data that
              belong to it before deleting it.{" "}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-error"
                  onClick={handleConfirmationClick}
                >
                  Delete
                </button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
export default SingleProject;
