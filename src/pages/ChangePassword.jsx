import { useState } from "react";
import { Form } from "react-router-dom";
import { FormInput, Notification } from "../components";
import { customFetch } from "../utils";
import { useNotification } from "../features/NotificationContext";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

const handleUpdate = async (updatedData, confirmPassword, notify) => {
  console.log(updatedData);
  const userString = JSON.parse(localStorage.getItem("token"));
  const user = userString.user;

  try {
    if (updatedData.novoGeslo != confirmPassword) {
      throw new Error("Passwords don't match!");
    }
    const response = await customFetch(`/worker/change-password/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedData,
    });
    console.log(response);
    if (response.status === 204) {
      notify("Password was successfully changed!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      console.log(error?.response);
      notify("Wrong password!", "error");
    } else {
      console.log(error);
      notify("Password don't match!", "error");
    }
    return null;
  }
};

const ChangePassword = () => {
  const { notify } = useNotification();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const newPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();

    const updatedData = {
      geslo: password,
      novoGeslo: newPassword,
    };
    handleUpdate(updatedData, confirmPassword, notify);
  };

  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
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
        <button
          type="submit"
          className="bg-base-300 btn btn-sm"
          onClick={handleUpdateClick}
        >
          Change Password
        </button>
      </Form>
      <Notification />
    </div>
  );
};

export default ChangePassword;
