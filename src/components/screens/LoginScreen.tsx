import * as React from "react";
import { useAuthStore } from "../../stores/authStore";
import { TextField, alert } from "@nativescript/core";

export function LoginScreen({ navigation }) {
  const { login } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

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

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
      } catch (error) {
        alert({
          title: "Login Failed",
          message: "Invalid email or password",
          okButtonText: "OK"
        });
      }
    }
  };

  return (
    <flexboxLayout className="h-full bg-blue-50">
      <stackLayout className="w-full p-8 space-y-4">
        <label className="text-3xl font-bold text-center text-blue-900">
          Eye Care Pro
        </label>
        
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

        <button
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md"
          onTap={handleLogin}
        >
          Sign In
        </button>

        <button
          className="text-blue-500 p-4"
          onTap={() => navigation.navigate("Register")}
        >
          Create Account
        </button>
      </stackLayout>
    </flexboxLayout>
  );
}