import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, InputLabel, NativeSelect, Button, FormGroup, FormControlLabel, Checkbox, FormLabel, FormControl, Select, MenuItem, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Paper, IconButton, Collapse } from '@mui/material';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'phosphor-react';
import { Box } from '@mui/system';
import { tables } from '../utils/reportsInfo';
import { apiServices } from '../services/apiServices';


Row.propTypes = {
  row: Object,
};


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </TableCell>
        {
          Object.keys(row).map((key, index) => (
            <TableCell key={index} align="left">
              {typeof row[key] !== 'object' ? row[key] : '-'}
            </TableCell>
          ))
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {
                row.complement && Object.keys(row.complement).map((key, index) => (
                  <>
                    <Typography key={index} variant="h6" gutterBottom component="div">
                      {key}
                    </Typography>
                    <Table size="small" aria-label="purchases" key={index}>
                      <TableHead>
                        <TableRow>
                          {
                            row.complement[key] && row.complement[key].length > 0 && Object.keys(row.complement[key][0]).map((key2, index2) => (
                              <TableCell key={index2} align="left">
                                {key2}
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          row.complement[key] && row.complement[key].length > 0 && row.complement[key].map((row2, index2) => (
                            <TableRow key={index2}>
                              {
                                Object.keys(row2).map((key2, index3) => (
                                  <TableCell key={index3} align="left">
                                    {row2[key2]}
                                  </TableCell>
                                ))
                              }
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </>
                ))
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [finalQuery, setFinalQuery] = useState({});
  const [finalInfo, setFinalInfo] = useState(null);

  const getReport = () => {
    setFinalInfo(null);

    apiServices.post('reports', finalQuery).then((data) => {
      console.log(data[0]);
      setFinalInfo(data);
    }).catch(error => console.log(error));
  };

  return (
    <>
      <Helmet>
        <title> Relatório Avançado </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }} color="blueTitle">
          Relatório Avançado
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="select-multiple-native">Selecionar Informação</InputLabel>

            <NativeSelect
              multiple
              inputProps={{ id: 'select-multiple-native' }}
              sx={{ width: '100%' }}
              onChange={(event) => {
                setSelectedReport(parseInt(event.target.value, 10));
                setSelectedConnection([]);
                setFinalInfo(null);

                const order = {};

                (tables.find((table) => table.id === parseInt(event.target.value, 10)).fields).forEach((field) => {
                  order[field.name] = '';
                });

                setFinalQuery({
                  ...finalQuery,
                  primaryTable: {
                    table: tables.find((table) => table.id === parseInt(event.target.value, 10)).route,
                    fields: tables.find((table) => table.id === parseInt(event.target.value, 10)).fields,
                    filters: [],
                    order,
                  },
                  secondaryTables: [],
                });
              }}
            >
              <option value="" selected>Selecionar</option>
              {tables.map((report) => (
                <option value={report.id} key={report.id}>{report.name}</option>
              ))}
            </NativeSelect>
          </Grid>
          {
            selectedReport && (
              <Grid item xs={12} sm={6} md={2}>
                <InputLabel htmlFor="select-multiple-native">Recursos Relacionados</InputLabel>

                <FormGroup>
                  {tables.map((report) => (
                    report.id === selectedReport && report.connectionAvailable.map((connection) => (
                      <FormControlLabel control={<Checkbox />} label={tables.find((table) => table.id === connection).name} key={connection}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedConnection([...selectedConnection, connection]);
                            setFinalInfo(null);

                            const fields = [];

                            for (let i = 0; i < tables.find((table) => table.id === connection).fields.length; i += 1) {
                              const fieldName = tables.find((table) => table.id === connection).fields[i].name;

                              if (fieldName === 'id' || fieldName === 'id_bundle' || fieldName === 'id_weapon' || fieldName === 'id_skin' || fieldName === 'name') {
                                fields.push(tables.find((table) => table.id === connection).fields[i]);
                              }
                            }

                            const order = {};

                            fields.forEach((field) => {
                              order[field.name] = '';
                            });

                            setFinalQuery({
                              ...finalQuery,
                              secondaryTables: [
                                ...finalQuery.secondaryTables,
                                {
                                  table: tables.find((table) => table.id === connection).route,
                                  fields,
                                  filters: [],
                                  order,
                                },
                              ],
                            });
                          } else {
                            setSelectedConnection(selectedConnection.filter((item) => item !== connection));
                            setSelectedFields(selectedFields.filter((item) => item.connection !== connection));

                            setFinalQuery({
                              ...finalQuery,
                              secondaryTables: finalQuery.secondaryTables.filter((item) => item.table !== tables.find((table) => table.id === connection).route),
                            });
                          }
                        }}
                      />
                    ))
                  ))}
                </FormGroup>
              </Grid>
            )
          }
          {
            selectedReport && (
              <Grid item xs={12} sm={6} md={2}>
                <InputLabel htmlFor="select-multiple-native" sx={{ mb: 3 }}>Selecionar Campos</InputLabel>

                <FormGroup sx={{ mb: 3 }}>
                  <FormLabel component="legend">{tables.find((table) => table.id === selectedReport).name}</FormLabel>
                  {tables.map((report) => (
                    report.id === selectedReport && report.fields.map((field) => (
                      <FormControlLabel control={<Checkbox disabled checked />} label={field.name} key={field.name} />
                    ))
                  ))}
                </FormGroup>

                {
                  selectedConnection.map((connection) => (
                    <FormGroup key={connection}>
                      <FormLabel component="legend">{tables.find((table) => table.id === connection).name}</FormLabel>
                      {tables.map((report) => (
                        report.id === connection && report.fields.map((field) => (
                          (field.name === 'id' || field.name === 'id_bundle' || field.name === 'id_weapon' || field.name === 'id_skin' || field.name === 'name') && (
                            <FormControlLabel control={<Checkbox disabled checked />} label={field.name} key={field.name} />
                          ) || (
                            <FormControlLabel control={<Checkbox />} label={field.name} key={field.name}
                              onChange={(event) => {
                                console.log(event.target);

                                if (event.target.checked) {
                                  setFinalQuery({
                                    ...finalQuery,
                                    secondaryTables: finalQuery.secondaryTables.map((item) => {
                                      if (item.table === tables.find((table) => table.id === connection).route) {
                                        return {
                                          ...item,
                                          fields: [...item.fields, {
                                            name: field.name,
                                            type: field.type,
                                          }],
                                          order: {
                                            ...item.order,
                                            [field.name]: '',
                                          },
                                        };
                                      }
                                      return item;
                                    }),
                                  });
                                } else {
                                  setFinalQuery({
                                    ...finalQuery,
                                    secondaryTables: finalQuery.secondaryTables.map((item) => {
                                      if (item.table === tables.find((table) => table.id === connection).route) {
                                        const newSelectedFields = selectedFields.filter((item) => item.connection !== connection);

                                        setSelectedFields(newSelectedFields);

                                        return {
                                          ...item,
                                          fields: item.fields.filter((item) => item.name !== field.name),
                                          order: Object.keys(item.order).reduce((acc, key) => {
                                            if (key !== field.name) {
                                              acc[key] = item.order[key];
                                            }
                                            return acc;
                                          }, {}),
                                        };
                                      }
                                      return item;
                                    }),
                                  });
                                }
                              }}
                            />
                          )
                        ))
                      ))}

                    </FormGroup>
                  ))
                }
              </Grid>
            )
          }
          {
            selectedReport && (
              <Grid item xs={12} sm={6} md={2}>
                <InputLabel htmlFor="select-multiple-native" sx={{ mb: 3 }}>Ordenação</InputLabel>

                <InputLabel id="demo-simple-select-label" sx={{ mb: 5 }}>{tables.find((table) => table.route === finalQuery.primaryTable.table).name}</InputLabel>

                {
                  finalQuery.primaryTable.fields.map((field) => (
                    <FormControl fullWidth key={field.name} sx={{ mb: 1 }}>
                      <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={finalQuery.primaryTable.order[field.name]}
                        label={field.name}
                        onChange={(event) => {
                          setFinalQuery({
                            ...finalQuery,
                            primaryTable: {
                              ...finalQuery.primaryTable,
                              order: {
                                ...finalQuery.primaryTable.order,
                                [field.name]: event.target.value,
                              },
                            },
                          });
                        }}
                      >
                        <MenuItem value="">
                          <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value="ASC">Crescente</MenuItem>
                        <MenuItem value="DESC">Decrescente</MenuItem>
                      </Select>
                    </FormControl>
                  ))
                }
              </Grid>
            )
          }
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="outlined" sx={{ width: '100%', mb: 3 }} onClick={() => {
              getReport();
            }}>Gerar</Button>
          </Grid>
        </Grid>

      </Container>

      {
        finalInfo && (
          <Container maxWidth="xl">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" style={{ background: '#161616' }}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {
                      finalInfo.length > 0 && Object.keys(finalInfo[0]).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    finalInfo.length > 0 && finalInfo.map((row) => (
                      <Row key={row.name} row={row} />
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )
      }
    </>
  );
}
