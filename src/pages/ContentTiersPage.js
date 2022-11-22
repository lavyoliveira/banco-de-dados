import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

export default function BuddiesPage() {

  return (
    <>
      <Helmet>
        <title> Content Tiers </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Content Tiers
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
