import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

const mock = [
  {
      "id": "3d2bcfc5-442b-812e-3c08-9180d6b36077",
      "id_bundle": "ed453815-44aa-4c4d-f3aa-77b4bcf048d7",
      "name": "Caught on Camera Spray",
      "category": "",
      "theme": "Glitchpop",
      "icon": "https://media.valorant-api.com/sprays/3d2bcfc5-442b-812e-3c08-9180d6b36077/",
      "animation": ""
  },
  {
      "id": "81c68821-46d3-9176-294c-abba0bc64e0b",
      "id_bundle": "ed453815-44aa-4c4d-f3aa-77b4bcf048d7",
      "name": "Chicken Out Spray",
      "category": "",
      "theme": "Glitchpop",
      "icon": "https://media.valorant-api.com/sprays/81c68821-46d3-9176-294c-abba0bc64e0b/",
      "animation": ""
  }
]

export default function BuddiesPage() {

  return (
    <>
      <Helmet>
        <title> Sprays </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Sprays
        </Typography>

        <Grid container spacing={2}>
        {mock.map((spray) => (
          <Grid item xs={24} sm={12} md={6} key={`randomKey${spray.id}`}>
            <AppWidgetSummary name={spray.name} image={spray.icon} theme={spray.theme}/>
          </Grid> 
          ))}
        </Grid>
      </Container>
    </>
  );
}
