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
import clickHandler from "../helper/autoDataEntry";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  // Password Input Component related
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // Password Input Component related

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
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(event) => setUsername(event.target.value)}
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={async () => {
              const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify({
                  username,
                  password,
                }),
                credentials: "include", // Don't forget to specify this if you need cookies
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              if (data.success) {
                navigation("/employees");
                <Alert severity="success">This is a success Alert.</Alert>;
                console.log(document.cookie);
              }
              alert(data.message);
            }}
          >
            Sign In
          </Button>
          {/* <Button onClick={() => clickHandler()}>Add data</Button> */}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigation("/signup")}>
          Don't have an account ?
        </Button>
      </CardActions>
    </Card>
  );
}
