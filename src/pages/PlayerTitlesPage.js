import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import NameDescriptionWidgetSummary from '../sections/@dashboard/app/NameDescriptionWidgetSummary';

const mock = [
  {
    id: '48d870a2-4493-ebf8-7d6f-979be914dc43',
    id_bundle: null,
    name: 'Fortune Title',
    txt: 'Fortune',
  },
  {
    id: 'f8c974b0-4e0c-c0e6-174d-c1b6d990b2a6',
    id_bundle: null,
    name: 'Tiger Title',
    txt: 'Tiger',
  },
];

export default function BuddiesPage() {
  return (
    <>
      <Helmet>
        <title> Player Titles </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" color="blueTitle">
          Player Titles
        </Typography>

        <div style={{ paddingTop: '40px' }}>
          <Grid container spacing={4}>
            {mock.map((arma) => (
              <Grid item xs={20} sm={20} md={20} lg={20} key={`randomKey${arma.id}`}>
                <NameDescriptionWidgetSummary name={arma.name} description={arma.txt} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}
