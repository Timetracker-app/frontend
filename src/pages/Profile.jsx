import { Form, useLoaderData, Link } from "react-router-dom";
import { FormInput } from "../components";
import { customFetch } from "../utils";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";
import Notification from "../components/Notification";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString.token;

export const loader = async () => {
  const userString = JSON.parse(localStorage.getItem("token"));
  const user = userString.user;
  const response = await customFetch(`/worker/${user}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    notify("Profile was successfully edited!", "success");
    return response;
  } catch (error) {
    console.log(error);
    notify("Failed to edit profile", "error");
    return null;
  }
};

const Profile = () => {
  const { notify } = useNotification();

  const { worker } = useLoaderData();

  const [lastName, setLastName] = useState(worker[0].priimek);
  const [email, setEmail] = useState(worker[0].email);

  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const updatedData = {
      ime: worker[0].ime,
      priimek: lastName,
      email,
    };
    handleUpdate(updatedData.ime, updatedData, notify);
  };

  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="first name"
          name="ime"
          value={worker[0].ime}
          disabled={true}
          size="select-sm"
        />
        <FormInput
          type="text"
          label="last name"
          name="priimek"
          value={lastName}
          onChange={lastNameChange}
          size="select-sm"
        />
        <FormInput
          type="email"
          label="email"
          name="email"
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
        <Link to={"/change-password"} className="btn btn-sm bg-base-300">
          Change Password
        </Link>
      </Form>
      <Notification />
    </div>
  );
};

export default Profile;
