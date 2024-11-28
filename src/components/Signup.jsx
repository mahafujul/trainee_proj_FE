import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigation = useNavigate();

  // Password Input Component related
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      // Validate inputs
      validationSchema.parse({ name, username, email, password });
      setErrors({}); // Clear any previous errors
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert array of errors to a key-value object
        const formattedErrors = error.errors.reduce((acc, currentError) => {
          acc[currentError.path[0]] = currentError.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }

    try {
      const response = await fetch("http://51.20.86.172:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          userId: username,
          name,
          password,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
      } else {
        navigation("/");
        alert(data.message);
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ fontSize: 20, textAlign: "center", marginBottom: 3 }}
          >
            CREATE AN ACCOUNT
          </Typography>
          <Stack
            component="form"
            sx={{ width: "25ch" }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              error={!!errors.password} // Add this to highlight the input field with an error
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigation("/")}>
            have an account?
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
