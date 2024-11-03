import * as React from "react";
import { useAuthStore } from "../../stores/authStore";
import { TextField, alert } from "@nativescript/core";

export function RegisterScreen({ navigation }) {
  const { login } = useAuthStore();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        await login(email, password); // In a real app, this would be a register call
      } catch (error) {
        alert({
          title: "Registration Failed",
          message: "Please try again later",
          okButtonText: "OK"
        });
      }
    }
  };

  return (
    <scrollView className="bg-blue-50">
      <stackLayout className="w-full p-8 space-y-4">
        <label className="text-3xl font-bold text-center text-blue-900">
          Create Account
        </label>

        <stackLayout>
          <textField
            className="bg-white p-4 rounded-lg"
            hint="Full Name"
            text={name}
            onTextChange={(args) => setName(args.object.text)}
          />
          {errors.name && (
            <label className="text-red-500 text-sm ml-2">{errors.name}</label>
          )}
        </stackLayout>

        <stackLayout>
          <textField
            className="bg-white p-4 rounded-lg"
            hint="Email"
            keyboardType="email"
            text={email}
            onTextChange={(args) => setEmail(args.object.text)}
          />
          {errors.email && (
            <label className="text-red-500 text-sm ml-2">{errors.email}</label>
          )}
        </stackLayout>

        <stackLayout>
          <textField
            className="bg-white p-4 rounded-lg"
            hint="Password"
            secure={true}
            text={password}
            onTextChange={(args) => setPassword(args.object.text)}
          />
          {errors.password && (
            <label className="text-red-500 text-sm ml-2">{errors.password}</label>
          )}
        </stackLayout>

        <stackLayout>
          <textField
            className="bg-white p-4 rounded-lg"
            hint="Confirm Password"
            secure={true}
            text={confirmPassword}
            onTextChange={(args) => setConfirmPassword(args.object.text)}
          />
          {errors.confirmPassword && (
            <label className="text-red-500 text-sm ml-2">{errors.confirmPassword}</label>
          )}
        </stackLayout>

        <button
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md"
          onTap={handleRegister}
        >
          Create Account
        </button>

        <button
          className="text-blue-500 p-4"
          onTap={() => navigation.navigate("Login")}
        >
          Already have an account? Sign In
        </button>
      </stackLayout>
    </scrollView>
  );
}