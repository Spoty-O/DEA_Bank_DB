import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientData = () => {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClientData;
