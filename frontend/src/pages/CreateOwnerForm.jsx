import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const CreateOwnerForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      alert("Owner created with ID: " + res.data.id);
      setUsername("");
      setPassword("");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 400, mx: "auto", p: 4, mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        Create New Owner
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          disabled={!username || !password}
        >
          Create Owner
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateOwnerForm;
