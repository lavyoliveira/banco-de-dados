import PropTypes from 'prop-types';
import { Card,  Typography } from '@mui/material';

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  image: PropTypes.string,
};

export default function AppWidgetSummary({ name, image, theme, color = 'primary', sx, ...other }) {
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
      }}
      {...other}
    >

<div style={{ display: 'grid', gridTemplateColumns: '0.5fr 0.1fr 1.3fr' }}>
<img src={`${image}fulltransparenticon.png`} alt="imagem" width="150"/>
        <div
          style={{ borderWidth: '0px 1px 0px 0px', borderStyle: 'solid', borderColor: '#73f9f9'}}
        />
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
