import { LoginForm, SubmitBtn } from "../components";
import { Form } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <Form method="post">
        <h4>Login</h4>
        <LoginForm
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <LoginForm
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div>
          <SubmitBtn text="Login" />
        </div>
      </Form>
    </section>
  );
};

export default Login;
