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
  const response = await customFetch(`/workplace/${params.name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.result);
  return { workplace: response.data.result };
};

const handleUpdate = async (workplaceName, updatedData, notify) => {
  console.log(updatedData);

  try {
    const response = await customFetch(`/workplace/${workplaceName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedData,
    });
    if (response.status === 204) {
      notify("Workplace was successfully edited!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 105) {
      console.log(error?.response?.data?.errorMsg);
      notify("Workplace does not exist!", "error");
    } else {
      console.log("Failed to edit workplace", error);
      notify("Failed to edit workplace", "error");
    }

    return null;
  }
};

const handleDelete = async (workplaceName, notify) => {
  try {
    const response = await customFetch(`/workplace/${workplaceName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 204) {
      notify("Workplace was successfully deleted!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 105) {
      console.log(error?.response?.data?.errorMsg);
      notify("Workplace does not exist!", "error");
    } else {
      console.log("Failed to delete workplace", error);
      notify("Failed to delete workplace", "error");
    }
    return null;
  }
};

const SingleWorkplace = () => {
  const { notify } = useNotification();

  const { workplace } = useLoaderData();
  const workplaceName = workplace.map((item) => item.stroj)[0];
  const time = workplace.map((item) => item.cas)[0];
  const status = workplace.map((item) => item.status)[0];

  const [name, setName] = useState(workplaceName);
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

    const updatedData = { stroj: name, status: activity, cas: updatedTime };
    handleUpdate(workplaceName, updatedData, notify);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(workplaceName, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Edit Workplace" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="name"
          name="workplace name"
          value={name}
          onChange={nameChange}
          disabled={true}
          size="select-sm"
          defaultValue={workplaceName}
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
        <button
          type="submit"
          className="bg-base-300 btn btn-sm"
          onClick={handleUpdateClick}
        >
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
              Are you sure you want to delete this workplace?
            </h3>
            <p className="py-4">
              If you delete selected workplace, all associated works will also
              be deleted.{" "}
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
export default SingleWorkplace;
