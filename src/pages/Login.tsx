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

import classes from "./Auth.module.css";
import { Link } from "react-router";
import { checkPassword } from "../utils/helpers";
import { useDisclosure } from "@mantine/hooks";
import { useLogin } from "../hooks/useAuth";
// import { useQueryClient } from "@tanstack/react-query";

type LoginForm = {
  email: string;
  password: string;
};

const LOGIN_FORM_INIT_VALUES: LoginForm = {
  email: "",
  password: "",
};

function Login() {
  const form = useForm<LoginForm>({
    initialValues: LOGIN_FORM_INIT_VALUES,
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      password: (val) => checkPassword(val),
    },
  });
  // const queryClient = useQueryClient();
  const [visible, { open, close }] = useDisclosure(false);
  const loginUser = useLogin();
  // const navigate = useNavigate();

  const loginFormSubmitHandler = () => {
    open();
    loginUser.mutate(
      {
        email: form.values.email,
        password: form.values.password,
      },
      {
        onSettled: () => {
          console.log("logined");
          // queryClient.invalidateQueries({ queryKey: ["user"] });
          close();
          // navigate("/login");
        },
      }
    );
  };

  return (
    <Container size={420} my={30} pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            loginFormSubmitHandler();
          })}
        >
          <TextInput
            label="Email"
            placeholder="Your email address"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
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

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>

          <Group justify="center" mt="lg">
            <Text c="dimmed" size="xs" ta="center" mt={5}>
              Do not have an account yet?{" "}
              <Anchor size="xs" component="button">
                <Link to="/register">Create account</Link>
              </Anchor>
            </Text>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
