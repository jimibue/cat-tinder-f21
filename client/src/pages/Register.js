import React, { useContext, useState } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from "react-router";

const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("123456");
  const [passwordConfirmation, setPasswordConfirmation] = useState("123456");
  const { handleRegister, error, loading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    if (password !== passwordConfirmation) {
      alert("passwords do not match");
      return;
    }
    handleRegister({ email, password, name }, history);
  };
  return (
    <div>
      <h1>register</h1>
      {error && (
        <Message negative>
          <code>{JSON.stringify(error)}</code>
        </Message>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={email}
          onChange={(e, { value }) => {
            setEmail(value);
          }}
          label={"Email"}
        />
        <Form.Input
          value={name}
          onChange={(e, { value }) => {
            setName(value);
          }}
          label={"Name"}
        />
        <Form.Input
          value={password}
          onChange={(e, { value }) => {
            setPassword(value);
          }}
          label={"Password"}
        />
        <Form.Input
          value={passwordConfirmation}
          onChange={(e, { value }) => {
            setPasswordConfirmation(value);
          }}
          label={"Password Confirmation"}
        />
        <Button loading={loading} disabled={loading}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
