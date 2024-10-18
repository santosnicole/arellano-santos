import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Container, TextField, Button, Select, MenuItem, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MovieHolder from './component/MovieHolder';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('short');
  const [openModal, setOpenModal] = useState(false); // State for modal visibility

  const fetchMovies = async (term, year, plot) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=32a71947&s=${encodeURIComponent(term)}${year ? `&y=${encodeURIComponent(year)}` : ''}`
      );
      const data = response.data;

      if (data.Response === "True") {
        const moviesWithPlots = await Promise.all(
          data.Search.map(async (movie) => {
            const movieDetailsResponse = await axios.get(
              `https://www.omdbapi.com/?apikey=32a71947&i=${movie.imdbID}${plot === 'full' ? '&plot=full' : ''}`
            );
            return movieDetailsResponse.data;
          })
        );
        setMovies(moviesWithPlots);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm && year) {
      setOpenModal(true); // Open modal if no title is provided
    } else {
      fetchMovies(searchTerm, year, plot);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Movie Search</Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Movie Title"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Year"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            displayEmpty
          >
            <MenuItem value="short">Short Plot</MenuItem>
            <MenuItem value="full">Full Plot</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
  {movies.map((movie) => (
    <Grid item xs={12} sm={6} md={6} key={movie.imdbID}>
      <MovieHolder movie={movie} />
    </Grid>
  ))}
</Grid>


      {/* Modal for title required */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">The movie title is required when searching by year.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
