import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

CardWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  image: PropTypes.string,
  theme: PropTypes.string,
};

const cardStyle = {
  maxWidth: '632px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  textAlign: 'flex-start',
  color: '#fff',
  backgroundColor: '#000',
  padding: '1rem',
  margin: '1rem',
  borderRadius: '30px 0px 30px 0px',
  boxShadow: 'none',
  border: '2px solid #22A7B8;',
};

const cardChildStyle = {
  backgroundColor: '#000',
  opacity: '0.8',
  borderRadius: '5px 5px 5px 5px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

export default function CardWidgetSummary({ name, image, theme, color = 'primary', sx, ...other }) {
  return (
    <Card sx={
      {
        ...cardStyle,
        backgroundImage: `${image}`,
        backgroundSize: 'cover',
      }
    }>
      <Card sx={cardChildStyle}>
        <Typography variant="overline" sx={{ opacity: 1 }}>
          Card: {name}
        </Typography>
        <Typography variant="overline" sx={{ opacity: 1 }}>
          Theme: {theme}
        </Typography>
      </Card>
    </Card>
  );
}
