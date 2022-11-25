import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { apiServices } from '../services/apiServices';
import { CardWidgetSummary } from '../sections/@dashboard/app';

export default function BuddiesPage() {
  const [availableCards, setAvailableCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    apiServices.get('cards')
      .then(data => {
        setAvailableCards(data);
      }
      );
  }, []);

  const handleCardSelection = (selectedCard) => {
    let route = 'cards';
    if (selectedCard) {
      route = `cards/${selectedCard}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedCard) {
          setCardInfo([data]);
        } else {
          setCardInfo(data);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Player Cards </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Player Cards
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Card</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedCard(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableCards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleCardSelection(selectedCard);
            }}>Buscar</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {cardInfo.map((card) => (
            <Grid item xs={16} sm={8} md={4} key={`randomKey${card.id}`}>
              <CardWidgetSummary name={card.name} image={`url(${card.icon}/wideart.png)`} theme={card.theme} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
