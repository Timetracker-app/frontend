import { Form } from "react-router-dom";
import { FormInput, FormCheckbox } from "../components";

const AddWorker = () => {
  return (
    <div>
      <div className="text-xl my-4">Add Worker</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <FormInput
          type="text"
          label="first name"
          name="worker name"
          size="select-sm"
        />
        <FormInput
          type="text"
          label="last name"
          name="worker last name"
          size="select-sm"
        />
        <FormInput
          type="email"
          label="email"
          name="worker email"
          size="select-sm"
        />
        <FormInput
          type="password"
          label="password"
          name="worker password"
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
