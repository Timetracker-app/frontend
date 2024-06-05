import { Form } from "react-router-dom";
import {
  FormInput,
  FormCheckbox,
  PageTitle,
  Notification,
} from "../components";
import { customFetch } from "../utils";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";

const url = "/workplace";

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
      notify("Workplace was successfully added!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 104) {
      console.log(error?.response?.data?.errorMsg);
      notify("Workplace with this name already exist!", "error");
    } else {
      console.log("Failed to add workplace", error);
      notify("Failed to add workplace", "error");
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

const AddWorkplace = () => {
  const { notify } = useNotification();

  const [workplace, setWorkplace] = useState("");
  const [checked, setChecked] = useState(0);

  const workplaceChange = (event) => {
    setWorkplace(event.target.value);
  };
  const checkboxChange = (event) => {
    setChecked(event.target.checked ? 1 : 0);
  };

  const handleAddClick = (e) => {
    e.preventDefault();

    const data = {
      stroj: workplace,
      status: checked,
    };
    handleAdd(data, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Workplace" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center">
        <FormInput
          type="text"
          label="Workplace name"
          name="stroj"
          value={workplace}
          onChange={workplaceChange}
          size="select-sm"
        />
        <FormCheckbox
          name="status"
          label="active"
          checked={checked}
          onChange={checkboxChange}
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

export default AddWorkplace;
