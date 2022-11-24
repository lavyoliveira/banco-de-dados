import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, FormGroup, FormControlLabel, Checkbox, NativeSelect, Button, FormLabel } from '@mui/material';
import { useState , useEffect } from 'react';
import { AppWidgetSummary } from '../sections/@dashboard/app';


const urlApi = 'http://localhost:3333/';

export default function Bundles() {
  const [availableBundles, setAvailableBundles] = useState([]);
  const [availableFields, setAvailableFields] = useState({
    'bundles': ['id', 'name', 'description', 'icon'],
  });
  const [availableJoins, setAvailableJoins] = useState(['buddies', 'cards', 'skins', 'sprays', 'titles']);
  const [availableJoinsFields, setAvailableJoinsFields] = useState({});
  const [selectedFields, setSelectedFields] = useState({
    'bundles': ['id', 'name', 'description', 'icon'],
  });
  const [selectedJoins, setSelectedJoins] = useState([]);

  useEffect(() => {
    fetch(`${urlApi  }bundles`)
      .then(response => response.json())
      .then(data => {
        setAvailableBundles(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${urlApi  }info`)
      .then(response => response.json())
      .then(data => {
        setAvailableFields({
          'bundles': data.bundles,
        });

        Object.keys(data).forEach(key => {
          if (availableJoins.indexOf(key) !== -1) {
            setAvailableJoinsFields(prevState => ({
              ...prevState,
              [key]: data[key],
            }));
          }
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Bundles </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bundles
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Bundle</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
            >
              <option value="all" selected>Todos</option>
              {availableBundles.map((bundle) => (
                <option key={bundle.id} value={bundle.id}>
                  {bundle.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" sx={{ width: '100%', mb: 3 }} onClick={() => {
              console.log(selectedFields);
              console.log(selectedJoins);
            }}>Buscar</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


