import { Form, useLoaderData, Link } from "react-router-dom";
import { FormInput } from "../components";
import { customFetch } from "../utils";
import { useState } from "react";

export const loader = async () => {
  const userString = JSON.parse(localStorage.getItem("token"));
  const user = userString.user;
  const response = await customFetch(`/worker/${user}`);
  console.log(response.data.result[0].ime);
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

const Profile = () => {
  const { worker } = useLoaderData();

  const [lastName, setLastName] = useState(worker[0].priimek);
  const [email, setEmail] = useState(worker[0].email);

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
      ime: worker[0].ime,
      priimek: lastName,
      email,
    };
    handleUpdate(updatedData.ime, updatedData);
  };

  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="first name"
          name="ime"
          defaultValue={worker[0].ime}
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
    </div>
  );
};

export default Profile;
