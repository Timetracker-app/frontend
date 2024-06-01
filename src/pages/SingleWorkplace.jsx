import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import { FormInput, FormCheckbox, PageTitle } from "../components";
import { useState } from "react";

export const loader = async ({ params }) => {
  const response = await customFetch(`/workplace/${params.name}`);
  console.log(response.data.result);
  return { workplace: response.data.result };
};

const handleUpdate = async (workplaceName, updatedData) => {
  console.log(updatedData);

  try {
    const response = await customFetch(`/workplace/${workplaceName}`, {
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

const handleDelete = async (workplaceName) => {
  try {
    const response = await customFetch(`/workplace/${workplaceName}`, {
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

const SingleWorkplace = () => {
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
    const stroj = name;
    const cas = updatedTime;
    const status = activity;

    const updatedData = { stroj, status, cas };
    handleUpdate(workplaceName, updatedData);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(workplaceName);
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
      <div>
        <dialog id="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Warning</h3>
            <p className="py-4">
              Are you sure you want to delete this workplace?
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
