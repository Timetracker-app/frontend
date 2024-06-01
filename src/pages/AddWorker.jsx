import { Form } from "react-router-dom";
import { FormInput, PageTitle } from "../components";
import { customFetch } from "../utils";
import { useState } from "react";

const url = "/worker";

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

const AddWorker = () => {
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

  return (
    <div>
      <div>
        <PageTitle text="Add Worker" />
      </div>
      <Form
        method="post"
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      >
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
        <button type="submit" className="bg-base-300 btn btn-sm">
          Add
        </button>
      </Form>
    </div>
  );
};

export default AddWorker;
