import PropTypes, { string } from 'prop-types';
import { Card, Typography } from '@mui/material';

NameDescriptionWidgetSummary.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  description: string,
};

export default function NameDescriptionWidgetSummary({ name, description, color = 'primary', sx, ...other }) {
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
        borderBottomLeftRadius: '0',
        padding: '20px',
      }}
      {...other}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '0.5fr  1.5fr' }}>
        <div
          style={{ borderWidth: '0px 1px 0px 0px', borderStyle: 'solid', borderColor: '#73f9f9', paddingLeft: '50px' }}
        >
          <Typography variant="h5" color="blueTitle">
            {name}
          </Typography>
        </div>
        <div style={{ paddingLeft: '80px' }}>
          <Typography variant="h5Regular" color="blueTitle">
            {description}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
