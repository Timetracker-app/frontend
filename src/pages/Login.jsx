import { FormInput, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { useState } from "react";
import PropTypes from "prop-types";

const url = "/login";

export const action =
  (setToken) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post(url, data);
      console.log(response.data);
      const token = response.data;
      setToken(token);
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "Check your credentials!";
      console.log(errorMessage);
      return null;
    }
  };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="email"
          value={email}
          disabled={false}
          onChange={nameChange}
        />
        <FormInput
          type="password"
          label="password"
          name="geslo"
          value={password}
          disabled={false}
          onChange={passwordChange}
        />
        <div className="bg-base-300 mt-4">
          <SubmitBtn text="Login" />
        </div>
      </Form>
    </section>
  );
};

/*
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
*/
export default Login;
