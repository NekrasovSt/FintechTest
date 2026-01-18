import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          Управление кодами
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" gap={3}>
          <Button 
            component={Link} 
            to="/list" 
            variant="contained" 
            color="primary" 
            size="large"
            style={{ minWidth: '200px' }}
          >
            Список кодов
          </Button>
          <Button 
            component={Link} 
            to="/create" 
            variant="contained" 
            color="secondary" 
            size="large"
            style={{ minWidth: '200px' }}
          >
            Создать коды
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;