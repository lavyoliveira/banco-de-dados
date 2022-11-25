import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Button, NativeSelect, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import { SprayWidgetSummary } from '../sections/@dashboard/app';
import { apiServices } from '../services/apiServices';


export default function BuddiesPage() {
  const [availableSprays, setAvailableSprays] = useState([]);
  const [selectedSpray, setSelectedSpray] = useState(null);
  const [sprayInfo, setSprayInfo] = useState([]);
  const [imageType, setImageType] = useState('fulltransparenticon.png');

  useEffect(() => {
    apiServices.get('sprays')
      .then(data => {
        setAvailableSprays(data);
      }
      );
  }, []);

  const handleSpraySelection = (selectedSpray) => {
    let route = 'sprays';
    if (selectedSpray) {
      route = `sprays/${selectedSpray}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedSpray) {
          setSprayInfo([data]);
        } else {
          setSprayInfo(data);
        }
      });
  };

  const handleChange = (event) => {
    setImageType(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Sprays </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Sprays
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Spray</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedSpray(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableSprays.map((spray) => (
                <option key={spray.id} value={spray.id}>
                  {spray.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleSpraySelection(selectedSpray);
            }}>Buscar</Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={imageType}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="fulltransparenticon.png" control={<Radio />} label="png" />
              <FormControlLabel value="animation.gif" control={<Radio />} label="gif" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {sprayInfo.map((spray) => (
            <Grid item xs={24} sm={12} md={6} key={`randomKey${spray.id}`}>
              <SprayWidgetSummary name={spray.name} image={spray.icon + imageType} theme={spray.theme} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
