import { FormInput, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

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
      const decodedToken = jwtDecode(JSON.stringify(token));
      if (decodedToken.role === "user") {
        throw new Error("Access denied!");
      }
      setToken(token);
      return redirect("/");
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log(error?.response?.data);
      } else if (error?.response?.data?.error?.message) {
        console.log(error?.response?.data?.error?.message);
      } else {
        console.log(error);
      }
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
    <>
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-16 text-center font-bold">TimeTracker</h1>
        <Form
          method="post"
          className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <h4 className="text-center text-2xl font-bold">Login</h4>
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
    </>
  );
};

export default Login;
