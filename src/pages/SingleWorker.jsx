import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import FormInput from "../components/FormInput";

export const loader = async ({ params }) => {
  const response = await customFetch(`/worker/${params.name}`);
  console.log(response.data.result);
  return { worker: response.data.result };
};

const SingleWorker = () => {
  const { worker } = useLoaderData();
  const name = worker.map((item) => item.ime)[0];
  const lastName = worker.map((item) => item.priimek)[0];
  const email = worker.map((item) => item.email)[0];

  return (
    <div>
      <div className="text-xl my-4">Edit Worker</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
        <FormInput
          type="text"
          label="first name"
          name="worker name"
          size="select-sm"
          defaultValue={name}
        />
        <FormInput
          type="text"
          label="last name"
          name="worker last name"
          size="select-sm"
          defaultValue={lastName}
        />
        <FormInput
          type="email"
          label="email"
          name="worker email"
          size="select-sm"
          defaultValue={email}
        />
        <button type="submit" className="bg-base-300 btn btn-sm">
          Edit
        </button>
        <button className="btn btn-sm btn-error">Delete</button>
      </Form>
    </div>
  );
};
export default SingleWorker;
