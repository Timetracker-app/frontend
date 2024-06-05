import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import {
  FormCheckbox,
  FormInput,
  PageTitle,
  Notification,
} from "../components";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString.token;

export const loader = async ({ params }) => {
  const response = await customFetch(`/worker/${params.name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.result);
  return { worker: response.data.result };
};

const handleUpdate = async (workerName, updatedData, notify) => {
  console.log(updatedData);

  try {
    const response = await customFetch(`/worker/${workerName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedData,
    });
    console.log(response);
    if (response.status === 204) {
      notify("Worker was successfully edited!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 103) {
      console.log(error?.response?.data?.errorMsg);
      notify("Worker does not exist!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 102) {
      console.log(error?.response?.data?.errorMsg);
      notify("Email already exist!", "error");
    } else {
      console.log("Failed to edit worker", error);
      notify("Failed to edit worker", "error");
    }

    return null;
  }
};

const handleDelete = async (workerName, notify) => {
  try {
    const response = await customFetch(`/worker/${workerName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 204) {
      notify("Worker was successfully deleted!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 103) {
      console.log(error?.response?.data?.errorMsg);
      notify("Worker does not exist!", "error");
    } else {
      console.log("Failed to delete worker", error);
      notify("Failed to delete worker", "error");
    }
    return null;
  }
};

const SingleWorker = () => {
  const { notify } = useNotification();
  const { worker } = useLoaderData();
  const workerName = worker.map((item) => item.ime)[0];
  const workerLastName = worker.map((item) => item.priimek)[0];
  const workerEmail = worker.map((item) => item.email)[0];
  const workerRole = worker.map((item) => item.role)[0];

  const [name, setName] = useState(workerName);
  const [lastName, setLastName] = useState(workerLastName);
  const [email, setEmail] = useState(workerEmail);
  const [role, setRole] = useState(workerRole === "user" ? 0 : 1);

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const roleChange = (event) => {
    setRole(event.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const updatedData = {
      ime: name,
      priimek: lastName,
      email,
    };
    handleUpdate(workerName, updatedData, notify);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(workerName, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Edit Worker" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <FormInput
          type="text"
          label="first name"
          name="worker name"
          value={name}
          onChange={nameChange}
          disabled={true}
          size="select-sm"
        />
        <FormInput
          type="text"
          label="last name"
          name="worker last name"
          value={lastName}
          onChange={lastNameChange}
          size="select-sm"
        />
        <FormInput
          type="email"
          label="email"
          name="worker email"
          value={email}
          onChange={emailChange}
          size="select-sm"
        />
        <FormCheckbox
          name="status"
          label="admin"
          checked={role}
          onChange={roleChange}
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
            <h3 className="font-bold text-lg">Warning</h3>
            <p className="py-4">Are you sure you want to delete this worker?</p>
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
export default SingleWorker;
