import { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("ownerId", res.data.ownerId); // Save ownerId if needed

      alert("Login successful");

      // ✅ Navigate to owner dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Owner Login
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={login}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
