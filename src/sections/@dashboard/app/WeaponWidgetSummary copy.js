import PropTypes, { string } from 'prop-types';
import { Card, Typography } from '@mui/material';

WeaponWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  image: string,
  category: string,
};

export default function WeaponWidgetSummary({ name, category, color = 'primary', sx, image, ...other }) {
  return (
    <Card
      sx={{
        borderColor: '#73f9f9',
        backgroundColor: '#000000',
        borderWidth: '1px',
        py: 4,
        boxShadow: 0,
        color: (theme) => theme.palette[color].lighter,
        borderStyle: 'solid',
        ...sx,
        borderRadius: '40px',
        borderTopRightRadius: '0',
        paddingBottom: '0',
      }}
      {...other}
    >
      <img src={`${image}displayicon.png`} alt="arma" height="80px" />
      <div style={{ backgroundColor: '#2C2C2C', padding: '20px' }}>
        <Typography variant="h5" color="blueTitle">
          {name}
        </Typography>

        <Typography variant="h5Regular" color="blueTitle">
          {category}
        </Typography>
      </div>
    </Card>
  );
}
