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
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import { z } from "zod";

const validationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async () => {
    // Validate inputs using the Zod schema
    try {
      validationSchema.parse({ username, password });
      setErrors({});

      // Proceed with form submission
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ userId: username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        navigation("/employees");
        alert("Login successful");
      } else {
        alert(data.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(({ path, message }) => {
          fieldErrors[path[0]] = message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ fontSize: 20, textAlign: "center", marginBottom: 3 }}
        >
          LOGIN
        </Typography>
        <Stack
          component="form"
          sx={{ width: "25ch" }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(event) => setUsername(event.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            error={!!errors.password}
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
            Sign In
          </Button>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigation("/signup")}>
          Don't have an account?
        </Button>
      </CardActions>
    </Card>
  );
}
