import { Form } from "react-router-dom";
import { FormInput, Notification, PageTitle } from "../components";
import { customFetch } from "../utils";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";
import useToken from "../features/useToken";

const url = "/worker";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString.token;

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
      notify("Worker was successfully added!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 101) {
      console.log(error?.response?.data?.errorMsg);
      notify("Worker with this name already exist!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 102) {
      console.log(error?.response?.data?.errorMsg);
      notify("Worker with this email already exist!", "error");
    } else {
      console.log("Failed to add worker", error);
      notify("Failed to add worker", "error");
    }
    return null;
  }
};

/*
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
*/

const AddWorker = () => {
  const { notify } = useNotification();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddClick = (e) => {
    e.preventDefault();

    const data = {
      ime: name,
      priimek: lastName,
      email,
      geslo: password,
    };
    handleAdd(data, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Worker" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <FormInput
          type="text"
          label="first name"
          name="ime"
          value={name}
          onChange={nameChange}
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
        <FormInput
          type="password"
          label="password"
          name="geslo"
          value={password}
          onChange={passwordChange}
          size="select-sm"
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

export default AddWorker;
