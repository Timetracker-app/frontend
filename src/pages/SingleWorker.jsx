import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import { FormInput, PageTitle } from "../components";
import { useState } from "react";

export const loader = async ({ params }) => {
  const response = await customFetch(`/worker/${params.name}`);
  console.log(response.data.result);
  return { worker: response.data.result };
};

const handleUpdate = async (workerName, updatedData) => {
  console.log(updatedData);

  try {
    const response = await customFetch(`/worker/${workerName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedData,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const handleDelete = async (workerName) => {
  try {
    const response = await customFetch(`/worker/${workerName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const SingleWorker = () => {
  const { worker } = useLoaderData();
  const workerName = worker.map((item) => item.ime)[0];
  const workerLastName = worker.map((item) => item.priimek)[0];
  const workerEmail = worker.map((item) => item.email)[0];

  const [name, setName] = useState(workerName);
  const [lastName, setLastName] = useState(workerLastName);
  const [email, setEmail] = useState(workerEmail);

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const updatedData = {
      ime: name,
      priimek: lastName,
      email,
    };
    handleUpdate(workerName, updatedData);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(workerName);
  };

  return (
    <div>
      <div>
        <PageTitle text="Edit Worker" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
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
