import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, NativeSelect, InputLabel, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { SkinWidgetSummary } from '../sections/@dashboard/app';
import { apiServices } from '../services/apiServices';

export default function SkinsPage() {
  const [availableBundles, setAvailableBundles] = useState([]);
  const [selectedBundles, setSelectedBundles] = useState('');
  const [availableWeapons, setAvailableWeapons] = useState([]);
  const [selectedWeapons, setSelectedWeapons] = useState('');
  const [skinsInfo, setSkinsInfo] = useState([]);

  useEffect(() => {
    apiServices.get('bundles')
      .then(data => {
        setAvailableBundles(data);
      }
    );
  }, []);

  useEffect(() => {
    apiServices.get('weapons')
      .then(data => {
        setAvailableWeapons(data);
      }
    );
  }, []);

  const handleInfoSelection = (selectedBundle, selectedWeapon) => {
    let route = 'skins';

    if (selectedBundle !== '') {
      route += `/bundle/${selectedBundle}`;
    }

    if (selectedWeapon !== '') {
      route += `/weapon/${selectedWeapon}`;
    }

    apiServices.get(route)
      .then(data => {
        console.log(data);
        setSkinsInfo(data);
      });
  };

  return (
    <>
      <Helmet>
        <title>Skins</title>
      </Helmet>

      <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Skins
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="select-multiple-native-bundle">Selecionar Bundle</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native-bundle' }}
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
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="select-multiple-native-weapon">Selecionar Weapon</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native-weapon' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedWeapons(event.target.value);
              }}
            >
              <option value="" selected>Todas</option>
              {availableWeapons.map((weapon) => (
                <option key={weapon.id} value={weapon.id}>
                  {weapon.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
          <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleInfoSelection(selectedBundles, selectedWeapons);
            }}>Buscar</Button>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mb: 3, mt: 3}} style={{ gap: '20px' }}>
          {skinsInfo.map((skin) => (
            <Grid xs={24} sm={12} md={6} key={skin.id} style={{ maxWidth: '360px' }}>
              <SkinWidgetSummary image={`${skin.icon}/displayicon.png`} name={skin.name} tier={skin.tier} tema={skin.theme} preco={skin.price} style={{ margin: 'auto' }}/>
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  );
}
