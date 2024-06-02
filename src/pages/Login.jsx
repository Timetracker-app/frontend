import { FormInput, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";

const url = "/login";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post(url, data);
      console.log(response.data);
      store.dispatch(loginUser(response.data));
      return null;
    } catch (error) {
      console.log("napaka");
      const errorMessage =
        error?.response?.data?.error?.message || "Check your credentials!";
      console.log(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="email" disabled={false} />
        <FormInput
          type="password"
          label="password"
          name="geslo"
          disabled={false}
        />
        <div className="bg-base-300 mt-4">
          <SubmitBtn text="Login" />
        </div>
      </Form>
    </section>
  );
};

export default Login;
