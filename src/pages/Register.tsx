import {
  Anchor,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router";
import { v4 as uuid4 } from "uuid";

import classes from "./Auth.module.css";
import { checkPassword } from "../utils/helpers";
import { useDisclosure } from "@mantine/hooks";
import { useRegister } from "../hooks/useAuth";

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
  const [visible, { open, close }] = useDisclosure(false);
  const registerUser = useRegister();
  const navigate = useNavigate();

  const registerFormSubmitHandler = () => {
    open();
    registerUser.mutate(
      {
        id: uuid4(),
        fullName: form.values.fullName,
        email: form.values.email,
        phone: form.values.phone,
        password: form.values.password,
      },
      {
        onSettled: () => {
          console.log("registered");
          close();
          navigate("/login");
        },
      }
    );
  };

  return (
    <Container size={420} my={40} pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
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
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
            required
          />

          <TextInput
            label="Email"
            placeholder="Your email"
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email}
            required
          />

          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
            error={form.errors.phone}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
            error={form.errors.password}
            required
            mt="md"
          />

          <PasswordInput
            label="Reenter Password"
            placeholder="Enter your password again"
            key={form.key("reenterPassword")}
            {...form.getInputProps("reenterPassword")}
            error={form.errors.reenterPassword}
            required
            mt="md"
          />

          <Button type="submit" fullWidth mt="xl">
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
