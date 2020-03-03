import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={`not found tab`}>
      <Typography align="center" variant="h5" gutterBottom>
        The page you are looking for could not be found
      </Typography>

    </div>
  );
};
export default NotFound;
