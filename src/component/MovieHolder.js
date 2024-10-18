// component/MovieHolder.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Dialog, DialogContent, DialogTitle, Button, Grid } from '@mui/material';

const MovieHolder = ({ movie }) => {
  const {
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Language,
    Poster
  } = movie;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const shortPlot = Plot.split('. ').slice(0, 3).join('. ') + (Plot.split('. ').length > 3 ? '...' : '');

  return (
    <>
      <Card sx={{ maxWidth: 345, height: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={Poster !== "N/A" ? Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}
          alt={Title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Year:</strong> {Year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Rated:</strong> {Rated}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Runtime:</strong> {Runtime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Genre:</strong> {Genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Director:</strong> {Director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Actors:</strong> {Actors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Language:</strong> {Language}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Plot:</strong> {shortPlot}
            <Button onClick={handleOpenModal} color="primary" size="small">Read more</Button>
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for full poster image and details */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardMedia
                component="img"
                height="400"
                image={Poster !== "N/A" ? Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}
                alt={Title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{Title}</Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Year:</strong> {Year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Rated:</strong> {Rated}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Runtime:</strong> {Runtime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Genre:</strong> {Genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Director:</strong> {Director}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Actors:</strong> {Actors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Language:</strong> {Language}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Plot:</strong> {Plot}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieHolder;
