import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ name, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 4,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette.background.red,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h5" sx={{ opacity: 0.72 }}>
        {name}
      </Typography>
    </Card>
  );
}
