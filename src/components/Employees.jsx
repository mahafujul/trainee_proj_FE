import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "./Header";
import AddNewEmployee from "./AddNewEmployee";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const responce = await fetch(
        "http://localhost:8080/api/employee-controller",
        {
          //http://localhost:3000/get-all-employees
          method: "GET",
        }
      );
      const data = await responce.json();
      // setEmployees(data.employees);
      setEmployees(data);
      setLoading(false);
    })();
  }, [changes]);

  const navigation = useNavigate();

  if (document.cookie == null) {
    console.log("I am inside if block.");
    navigation("/");
  } else {
    if (loading) {
      return (
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center" }}
        >
          <h1>Loading...</h1>
        </div>
      );
    }
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Header></Header>
        </div>
        <div
          style={{ display: "flex", marginBottom: 10, justifyContent: "right" }}
        >
          <AddNewEmployee setChanges={setChanges} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {employees?.map((employee, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="400"
                        image={
                          employee.url
                            ? `${employee.url}`
                            : "/passport_photo_male.jpg"
                        }
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {employee.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {employee.designation}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {employee.bio}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    );
  }
}
