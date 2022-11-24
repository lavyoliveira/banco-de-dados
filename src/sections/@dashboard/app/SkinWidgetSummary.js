import PropTypes, { string } from 'prop-types';
import { Card, Typography } from '@mui/material';

SkinWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  image: string,
  tier: string,
  tema: string,
  preco: string
};

export default function SkinWidgetSummary({ name, tier, tema, preco, color = 'primary', sx, image, ...other }) {
  return (
    <Card
      sx={{
        border: '2px solid #22A7B8;',
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
        display: 'flex',
        flexDirection: 'column',
      }}
      {...other}
    >
      <img src={`${image}`} alt="arma" height="80px" style={{ margin: 'auto' }} />
      <div style={{ 
        backgroundColor: '#2C2C2C', 
        padding: '20px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Typography variant="h5" color="blueTitle" style={{
            marginBottom: '10px',
        }}>
          {
            name.length > 31 ? `${name.substring(0, 31)  }...` : name
          }
        </Typography>
        <Typography variant="h5Regular" color="#A5C1C8">
          {tier} 
          <br />
          {tema}
        </Typography>
        <Typography variant="h5" color="blueTitle" style={{
            marginTop: '10px',
        }}>
          {
            preco === null ? 'Indisponível' : `${preco}` 
          }
        </Typography>
      </div>
    </Card>
  );
}