import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigation = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employees
          </Typography>
          <Button
            color="inherit"
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:3000/clear-cookie", {
                  method: "GET",
                  credentials: "same-origin",
                });
                const data = await res.json();
                console.log(data);
              } catch (err) {
                console.log("There is something wrong while logout");
                console.log(err);
              }
              navigation("/");
            }}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
