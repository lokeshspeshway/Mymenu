import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import MenuItemCard from '../components/MenuItemCard';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';

const PublicMenu = () => {
  const { ownerId } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/menu/${ownerId}`)
      .then((res) => setMenu(res.data))
      .finally(() => setLoading(false));
  }, [ownerId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Owner's Menu
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : menu.length > 0 ? (
        <Grid container spacing={3}>
          {menu.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No items found.</Typography>
      )}
    </Container>
  );
};

export default PublicMenu;
