import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Input,
} from "@mui/material";

const OwnerDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`/menu/${ownerId}`);
      setMenu(res.data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]); // base64
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!name || !price || !description || !image) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("/menu", {
        name,
        description,
        price,
        image,
        ownerId,
      });
      fetchMenu();
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      alert("Item added.");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Owner Dashboard
      </Typography>

      {/* Add Item Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add Menu Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input type="file" onChange={handleImage} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAdd}>
              Add Item
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* QR Code */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Menu QR Code
        </Typography>
        <QRCodeSVG value={`http://localhost:3000/menu/${ownerId}`} size={200} />
      </Box>

      {/* Menu Items */}
      <Box>
        <Typography variant="h6" gutterBottom>
          My Menu Items
        </Typography>
        <Grid container spacing={2}>
          {menu.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                    ₹{item.price}
                  </Typography>
                  {item.image && (
                    <Box mt={2}>
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt="menu"
                        width="100%"
                        style={{ borderRadius: 8 }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default OwnerDashboard;
