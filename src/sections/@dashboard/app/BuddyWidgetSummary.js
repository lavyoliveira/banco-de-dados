import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

BuddyWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  image: PropTypes.string,
  theme: PropTypes.string,
};

export default function BuddyWidgetSummary({ name, image, theme, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderStyle: 'solid',
        borderColor: ' #22A7B8',
        borderWidth: '3px',
        py: 4,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].lighter,
        bgcolor: '#000000',
        ...sx,
        padding: '20px'
      }}
      {...other}
    >

      <div style={{ display: 'grid', gridTemplateColumns: '150px 0.1fr auto' }}>
        <img src={`${image}`} alt="imagem" style={{
          width: '150px',
          height: '150px',
          margin: 'auto',
          objectFit: 'contain',
        }}/>
        <div style={{ width: '2px', height: '90%', backgroundColor: '#73f9f9', margin: 'auto 20px' }}/>
        <div style={{ paddingLeft: '30px' }}>
          <Typography variant="h5" color="blueTitle">
            {name}
          </Typography>
          <Typography variant="h5Regular" color="blueTitle">
            {theme}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
