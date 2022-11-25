import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiServices } from '../services/apiServices';

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

export default function Bundles() {
  const [availableBundles, setAvailableBundles] = useState([]);
  const [selectedBundles, setSelectedBundles] = useState('');
  const [bundleInfo, setBundleInfo] = useState([]);

  useEffect(() => {
    apiServices.get('bundles')
      .then(data => {
        setAvailableBundles(data);
      }
      );
  }, []);

  const handleBundleSelection = (selectedBundle) => {
    let route = 'bundles';
    if (selectedBundle !== '') {
      route = `bundles/${selectedBundle}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedBundle !== 'all' && selectedBundle !== '') {
          setBundleInfo([data]);
        } else {
          setBundleInfo(data);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Bundles </title>
      </Helmet>

      <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Bundles
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Bundle</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedBundles(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableBundles.map((bundle) => (
                <option key={bundle.id} value={bundle.id}>
                  {bundle.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleBundleSelection(selectedBundles);
            }}>Buscar</Button>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {bundleInfo.map((bundle) => (
            <Grid xs={24} sm={12} md={6} key={bundle.id}>
              <Card sx={
                {
                  ...cardStyle,
                  backgroundImage: `url(${bundle.icon}/displayicon.png)`,
                  backgroundSize: 'cover',
                }
              }>
                <Card sx={cardChildStyle}>
                  <Typography variant="overline" sx={{ opacity: 1 }}>
                    Bundle: {bundle.name}
                  </Typography>
                  <Typography variant="overline" sx={{ opacity: 1 }}>
                    Descrição: {bundle.description}
                  </Typography>
                </Card>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

