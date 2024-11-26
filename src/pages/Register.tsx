import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router";

import classes from "./Auth.module.css";
import { checkPassword } from "../utils/helpers";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  reenterPassword: string;
};

const REGISTER_FORM_INIT_VALUES: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  reenterPassword: "",
};

function Register() {
  const form = useForm<RegisterForm>({
    initialValues: REGISTER_FORM_INIT_VALUES,
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      phone: (val) =>
        /^(\+91|91|0)?[-\s]?[6-9]\d{2}[-\s]?\d{3}[-\s]?\d{4}$/.test(val)
          ? null
          : "Invalid mobile number",
      password: (val) => checkPassword(val),
      reenterPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
    },
  });

  const registerFormSubmitHandler = () => {};

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            registerFormSubmitHandler();
          })}
        >
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            value={form.values.fullName}
            onChange={(event) =>
              form.setFieldValue("fullName", event.currentTarget.value)
            }
            required
          />

          <TextInput
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            required
          />

          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            value={form.values.phone}
            onChange={(event) =>
              form.setFieldValue("phone", event.currentTarget.value)
            }
            error={form.errors.phone}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            required
            mt="md"
          />

          <PasswordInput
            label="Reenter Password"
            placeholder="Enter your password again"
            value={form.values.reenterPassword}
            onChange={(event) =>
              form.setFieldValue("reenterPassword", event.currentTarget.value)
            }
            error={form.errors.reenterPassword}
            required
            mt="md"
          />

          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </form>

        <Group justify="center" mt="lg">
          <Text c="dimmed" size="xs" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="xs" component="button">
              <Link to="/login">Login</Link>
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}

export default Register;
