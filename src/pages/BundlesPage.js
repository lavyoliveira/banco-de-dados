import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button, Card, Modal, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiServices } from '../services/apiServices';

const cardStyle = {
  maxWidth: '632px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  textAlign: 'flex-start',
  color: '#fff',
  backgroundColor: '#000',
  padding: '1rem',
  margin: '1rem',
  borderRadius: '30px 0px 30px 0px',
  boxShadow: 'none',
  border: '2px solid #22A7B8;',
};

const cardChildStyle = {
  backgroundColor: '#000',
  opacity: '0.8',
  borderRadius: '5px 5px 5px 5px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  border: '2px solid #000',
  p: 4,
  width: '80vw',
  maxHeight: '80vh',
};

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function Bundles() {
  const [availableBundles, setAvailableBundles] = useState([]);
  const [selectedBundles, setSelectedBundles] = useState('');
  const [bundleInfo, setBundleInfo] = useState([]);

  useEffect(() => {
    apiServices.get('bundles')
      .then(data => {
        setAvailableBundles(data);
      }
      );
  }, []);

  const handleBundleSelection = (selectedBundle) => {
    let route = 'bundles';
    if (selectedBundle !== '') {
      route = `bundles/${selectedBundle}`;
    }

    apiServices.get(route)
      .then(data => {
        if (selectedBundle !== 'all' && selectedBundle !== '') {
          setBundleInfo([data]);
        } else {
          setBundleInfo(data);
        }
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          <Grid item xs={12} sm={6} md={5}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Bundle</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedBundles(event.target.value);
              }}
            >
              <option value="" selected>Todos</option>
              {availableBundles.map((bundle) => (
                <option key={bundle.id} value={bundle.id}>
                  {bundle.name}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              handleBundleSelection(selectedBundles);
            }}>Buscar</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            {
              bundleInfo.length > 0 && (
                <Button variant="text" sx={{ width: '100%', mb: 3 }} onClick={
                  handleOpen
                }>Informações</Button>
              )
            }
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {bundleInfo.map((bundle) => (
            <Grid xs={24} sm={12} md={6} key={bundle.id}>
              <Card sx={
                {
                  ...cardStyle,
                  backgroundImage: `url(${bundle.icon}/displayicon.png)`,
                  backgroundSize: 'cover',
                }
              }>
                <Card sx={cardChildStyle}>
                  <Typography variant="overline" sx={{ opacity: 1 }}>
                    Bundle: {bundle.name}
                  </Typography>
                  <Typography variant="overline" sx={{ opacity: 1 }}>
                    Descrição: {bundle.description}
                  </Typography>
                </Card>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Informações
          </Typography>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Country
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

