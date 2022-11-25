import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { apiServices } from '../services/apiServices';
import { BuddyWidgetSummary } from '../sections/@dashboard/app';

export default function BuddiesPage() {
  const [availableBuddiess, setAvailableBuddiess] = useState([]);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [buddyInfo, setBuddyInfo] = useState([]);

  useEffect(() => {
    apiServices.get('buddies')
      .then(data => {
        setAvailableBuddiess(data);
      }
      );
  }, []);

  const handleBuddySelection = (selectedBuddy) => {
    let route = 'buddies';
    if (selectedBuddy) {
      route = `buddies/${selectedBuddy}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedBuddy) {
          setBuddyInfo([data]);
        } else {
          setBuddyInfo(data);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Buddies </title>
      </Helmet>

      <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Buddies
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Buddy</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedBuddy(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableBuddiess.map((buddy) => (
                <option key={buddy.id} value={buddy.id}>
                  {buddy.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleBuddySelection(selectedBuddy);
            }}>Buscar</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {buddyInfo.map((buddy) => (
            <Grid item xs={24} sm={12} md={6} key={`randomKey${buddy.id}`}>
              <BuddyWidgetSummary image={`${buddy.icon  }displayicon.png`} name={buddy.name} theme={buddy.theme} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
