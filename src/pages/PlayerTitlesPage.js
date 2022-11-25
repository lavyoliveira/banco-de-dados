import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, NativeSelect, InputLabel, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { apiServices } from '../services/apiServices';
import NameDescriptionWidgetSummary from '../sections/@dashboard/app/NameDescriptionWidgetSummary';


export default function BuddiesPage() {
  const [availableTitles, setAvailableTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [titleInfo, setTitleInfo] = useState([]);

  useEffect(() => {
    apiServices.get('titles')
      .then(data => {
        setAvailableTitles(data);
      }
      );
  }, []);

  const handleTitleSelection = (selectedTitle) => {
    let route = 'titles';
    if (selectedTitle) {
      route = `titles/${selectedTitle}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedTitle) {
          setTitleInfo([data]);
        } else {
          setTitleInfo(data);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Player Titles </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Player Titles
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Title</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedTitle(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableTitles.map((bundle) => (
                <option key={bundle.id} value={bundle.id}>
                  {bundle.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleTitleSelection(selectedTitle);
            }}>Buscar</Button>
          </Grid>
        </Grid>

        <div style={{ paddingTop: '40px' }}>
          <Grid container spacing={4}>
            {titleInfo.map((title) => (
              <Grid item xs={20} sm={20} md={20} lg={20} key={`randomKey${title.id}`}>
                <NameDescriptionWidgetSummary name={title.name} description={title.txt} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}
