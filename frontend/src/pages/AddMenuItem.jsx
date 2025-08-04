import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputLabel,
} from "@mui/material";
import axios from "axios";

export default function AddMenuItem() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("image", image);

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/owner/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Menu item added!");
      // Reset fields
      setName("");
      setDesc("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload menu item.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 500, mx: "auto", p: 4, mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Add Menu Item
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Description"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Price"
          type="number"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />

        <Box>
          <InputLabel htmlFor="upload-image">Upload Image</InputLabel>
          <input
            id="upload-image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={upload}
          disabled={!name || !desc || !price || !image}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
    