import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import WeaponWidgetSummary from '../sections/@dashboard/app/WeaponWidgetSummary';
import { apiServices } from '../services/apiServices';

export default function BuddiesPage() {
  const [availableWeapons, setAvailableWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [weaponInfo, setWeaponInfo] = useState([]);

  useEffect(() => {
    apiServices.get('weapons')
      .then(data => {
        setAvailableWeapons(data);
      }
      );
  }, []);

  const handleWeaponSelection = (selectedWeapon) => {
    let route = 'weapons';
    
    if (selectedWeapon) {
      route = `weapons/${selectedWeapon}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedWeapon) {
          setWeaponInfo([data]);
        } else {
          setWeaponInfo(data);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Weapons </title>
      </Helmet>

      <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Weapons
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Weapon</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedWeapon(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableWeapons.map((weapon) => (
                <option key={weapon.id} value={weapon.id}>
                  {weapon.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleWeaponSelection(selectedWeapon);
            }}>Buscar</Button>
          </Grid>
        </Grid>

        <div style={{ paddingTop: '40px' }}>
          <Grid container spacing={8}>
            {weaponInfo.map((arma) => (
              <Grid item xs={20} sm={6} md={4} lg={3} key={`randomKey${arma.id}`}>
                <WeaponWidgetSummary name={arma.name} image={arma.icon} category={arma.category} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}
