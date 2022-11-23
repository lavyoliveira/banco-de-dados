import { Helmet } from 'react-helmet-async';

import { Typography } from '@mui/material';

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> ValorDash </title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          marginLeft: '86px',
          justifyContent: 'start',
          alignContent: 'center',
          height: '100%',
        }}
      >
        <div style={{ width: '660px', marginTop: '5%' }}>
          <Typography variant="h2" color="#22a7b8">
            Bem-vindo!
          </Typography>
          <Typography variant="h4" color="#a5c1c8">
            Escolha, no menu lateral, uma das opções para começar consultando informações.
          </Typography>
          <Typography variant="h5" color="#a5c1c8">
            O pessoal aqui da equipe fez especialmente para você!
          </Typography>
        </div>
      </div>
    </>
  );
}
