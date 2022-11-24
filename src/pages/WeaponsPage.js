import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { AppWidgetSummary } from '../sections/@dashboard/app';

const urlApi = 'http://localhost:3333/';

const mock = [
  {
    id: '63e6c2b6-4a8e-869c-3d4c-e38355226584',
    name: 'Odin',
    category: 'Heavy Weapons',
    icon: 'https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/',
  },
  {
    id: '55d8a0f4-4274-ca67-fe2c-06ab45efdf58',
    name: 'Ares',
    category: 'Heavy Weapons',
    icon: 'https://media.valorant-api.com/weapons/55d8a0f4-4274-ca67-fe2c-06ab45efdf58/',
  },
];

export default function BuddiesPage() {
  // useEffect(() => {
  //   fetch(`${urlApi  }bundles`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setAvailableBundles(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`${urlApi  }info`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setAvailableFields({
  //         'bundles': data.bundles,
  //       });

  //       Object.keys(data).forEach(key => {
  //         if (availableJoins.indexOf(key) !== -1) {
  //           setAvailableJoinsFields(prevState => ({
  //             ...prevState,
  //             [key]: data[key],
  //           }));
  //         }
  //       });
  //     });
  // }, []);

  return (
    <>
      <Helmet>
        <title> Weapons </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" color="blueTitle">
          Weapons
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={20} sm={6} md={3}>
            <AppWidgetSummary name="Task Force 809 Buddy" icon="1" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary name="RGX 11z Pro Buddy" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary name="Gaia's Vengeance Buddy" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary name="Zedd Buddy" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
