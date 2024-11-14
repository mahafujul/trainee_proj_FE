import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { z } from "zod";

// Define Zod schema for validation
const employeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  age: z
    .string()
    .regex(/^[0-9]+$/, { message: "Age must be a number" })
    .refine((age) => parseInt(age, 10) > 0, {
      message: "Age must be positive",
    }),
  bio: z.string().min(1, { message: "Bio is required" }),
  url: z.string().min(1, { message: "URL is required" }).optional(),
});

export default function AddNewEmployee({ setChanges }) {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    designation: "",
    name: "",
    age: "",
    bio: "",
    url: "",
  });
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate employee data
      const result = employeeSchema.safeParse(employeeData);
      if (!result.success) {
        const errorObj = result.error.format();
        setErrors(
          Object.keys(errorObj).reduce((acc, key) => {
            acc[key] = errorObj[key]?._errors?.[0];
            return acc;
          }, {})
        );
        return;
      }

      // Proceed with submission if validation passes
      setErrors({});
      const res = await fetch(
        "http://localhost:8080/api/employee-controller/add",
        {
          method: "POST",
          body: JSON.stringify({ ...employeeData }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      } else {
        setChanges((prev) => !prev);
        alert("The employee added successfully.");
      }
      setEmployeeData({ designation: "", name: "", age: "", bio: "", url: "" });
      handleClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(({ path, message }) => {
          fieldErrors[path[0]] = message;
        });
        setErrors(fieldErrors);
      }
      console.log("error:", err);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Employee
      </Button>

      <Dialog open={open} onClose={handleClose}>
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
            value={employeeData.name}
            onChange={(event) =>
              setEmployeeData({ ...employeeData, name: event.target.value })
            }
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            required
            margin="dense"
            id="designation"
            name="designation"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
            value={employeeData.designation}
            onChange={(event) =>
              setEmployeeData({
                ...employeeData,
                designation: event.target.value,
              })
            }
            error={!!errors.designation}
            helperText={errors.designation}
          />
          <TextField
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="text"
            fullWidth
            variant="standard"
            value={employeeData.age}
            onChange={(event) =>
              setEmployeeData({ ...employeeData, age: event.target.value })
            }
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            required
            margin="dense"
            id="bio"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="standard"
            value={employeeData.bio}
            onChange={(event) =>
              setEmployeeData({ ...employeeData, bio: event.target.value })
            }
            error={!!errors.bio}
            helperText={errors.bio}
          />
          <TextField
            margin="dense"
            id="url"
            name="url"
            label="Photo URL"
            type="text"
            fullWidth
            variant="standard"
            value={employeeData.url}
            onChange={(event) =>
              setEmployeeData({ ...employeeData, url: event.target.value })
            }
            error={!!errors.url}
            helperText={errors.url}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
