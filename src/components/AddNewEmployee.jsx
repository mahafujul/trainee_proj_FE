import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material.DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { z } from "zod";

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

  const employeeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    designation: z.string().min(1, { message: "Designation is required" }),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age must be a positive number",
    }),
    bio: z.string().min(1, { message: "Bio is required" }),
    url: z
      .string()
      .url({ message: "Invalid URL format" })
      .optional()
      .or(z.literal("")),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const validatedData = employeeSchema.parse(formJson);
      const res = await fetch("http://localhost:3000/create-employee", {
        method: "POST",
        body: JSON.stringify(validatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setChanges((prev) => !prev);
        alert(data.message);
      } else {
        alert(data.message);
      }
      handleClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorObject = err.format();
        setErrors(errorObject);
      }
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
          {["name", "designation", "age", "bio", "url"].map((field) => (
            <TextField
              key={field}
              autoFocus={field === "name"}
              required
              margin="dense"
              id={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) =>
                setEmployeeData({
                  ...employeeData,
                  [field]: event.target.value,
                })
              }
              error={!!errors[field]}
              helperText={errors[field]?._errors?.[0] || ""}
            />
          ))}
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
