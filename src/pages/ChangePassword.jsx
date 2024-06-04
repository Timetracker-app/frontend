import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const updatedData = {
    geslo: data.currentPassword,
    novoGeslo: data.newPassword,
  };
  console.log(data);
  console.log(updatedData);
  console.log(request);

  const userString = JSON.parse(localStorage.getItem("token"));
  const user = userString.user;

  try {
    if (data.newPassword != data.confirmPassword) {
      throw new Error("Passwords don't match!");
    }
    const response = await customFetch(`/worker/change-password/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedData,
    });
    console.log(response);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.status || "An error occurred");
    }
    return response;
  } catch (error) {
    console.log(error.message);
    if (error.message) {
      return { error: error.message };
    } else if (error.response?.status)
      if (error.response.status === "Request failed with status code 401") {
        return { error: "Wrong password!" };
      }

    return { error: error.message || error.response?.status || 500 };
  }
};

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const actionData = useActionData();

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const newPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  if (actionData && actionData.error && error !== actionData.error) {
    setError(actionData.error);
  }
  return (
    <div>
      <Form
        method="put"
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center"
      >
        <FormInput
          type="password"
          label="current password"
          name="currentPassword"
          value={password}
          onChange={passwordChange}
          size="select-sm"
        />
        <FormInput
          type="password"
          label="new password"
          name="newPassword"
          value={newPassword}
          onChange={newPasswordChange}
          size="select-sm"
        />
        <FormInput
          type="password"
          label="confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={confirmPasswordChange}
          size="select-sm"
        />
        <button type="submit" className="bg-base-300 btn btn-sm">
          Change Password
        </button>
      </Form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ChangePassword;
