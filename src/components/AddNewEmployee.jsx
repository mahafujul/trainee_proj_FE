import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddNewEmployee({ setChanges }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [employeeData, setEmployeeData] = useState({
    designation: "",
    name: "",
    age: "",
    bio: "",
    url: "",
  });

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Employee
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                name: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="designation"
            name="designation"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                designation: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                age: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="bio"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                bio: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="url"
            name="url"
            label="Photo URL"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                url: event.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={async () => {
              const res = await fetch("http://localhost:3000/create-employee", {
                method: "POST",
                body: JSON.stringify({ ...employeeData }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              if (data.success) {
                setChanges(!changes);
              }
              alert(data.message);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
