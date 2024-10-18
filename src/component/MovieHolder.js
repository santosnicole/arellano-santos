// component/MovieHolder.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

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
      <Card sx={{ display: 'flex', height: '100%', width: 560 }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={Poster !== "N/A" ? Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}
          alt={Title}
        />
        <CardContent sx={{ flex: '1' }}>
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

      {/* Modal for full poster image */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height="300"
            image={Poster !== "N/A" ? Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}
            alt={Title}
          />
          <Typography variant="body2" color="text.secondary" mt={2}>
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
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              overflow: 'hidden', 
              display: '-webkit-box', 
              WebkitBoxOrient: 'vertical', 
              WebkitLineClamp: 2
            }}
          >
            <strong>Plot:</strong> {Plot}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieHolder;
