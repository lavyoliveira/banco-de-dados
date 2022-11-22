import { Helmet } from 'react-helmet-async';

import { Container, Typography } from '@mui/material';

export default function DashboardAppPage() {

  return (
    <>
      <Helmet>
        <title> ValorDash </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ mb: 2 }}>
          Bem-vindo! 
        </Typography>
        <Typography variant="h4">
          Escolha, na lateral esquerda do dashboard, uma das opções para começar consultando informações.
        </Typography>
        <Typography variant="h6" sx={{ mb: 5 }}>
          O pessoal aqui da equipe fez especialmente para você!😋
        </Typography>

      </Container>
    </>
  );
}
