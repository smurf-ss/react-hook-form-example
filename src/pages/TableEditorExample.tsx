import React from "react";

import { useForm, useFieldArray } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";
import Paper from "@components/Paper";

type TableEditorValues = {
  dataSource: {
    name: string;
    category: string;
    fat: number;
    carbs: number;
    protein: number;
  }[];
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
});

function createData(
  name: string,
  category: string,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, category, fat, carbs, protein };
}

const rows = new Array(500).fill(
  createData("Frozen yoghurt", "A", 6.0, 24, 4.0)
);

const TableEditorExample = () => {
  const classes = useStyles();

  const { control, handleSubmit } = useForm<TableEditorValues>({
    defaultValues: { dataSource: rows },
    mode: "onBlur",
  });

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "dataSource",
  });

  const onSubmit = (data: TableEditorValues) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.root}>
        <Typography variant='h4' gutterBottom>
          Table editor Example (500 rows)
        </Typography>
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='right'>Calories</TableCell>
                <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                <TableCell align='right'>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    <Input
                      name={`dataSource.${rowIndex}.name`}
                      control={control}
                      defaultValue={row.name}
                      required={true}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Select
                      control={control}
                      name={`dataSource.${rowIndex}.category`}
                      selectProps={{
                        label: "Category",
                      }}
                      defaultValue={row.category}
                      options={[
                        {
                          label: "Category A",
                          value: "A",
                        },
                        {
                          label: "Category B",
                          value: "B",
                        },
                        {
                          label: "Category C",
                          value: "C",
                        },
                      ]}
                    />
                    {/* <Input
                    name={`dataSource.${rowIndex}.calories`}
                    control={control}
                    defaultValue={row.calories}
                  /> */}
                  </TableCell>
                  <TableCell align='right'>
                    <Input
                      name={`dataSource.${rowIndex}.fat`}
                      control={control}
                      defaultValue={row.fat}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Input
                      name={`dataSource.${rowIndex}.carbs`}
                      control={control}
                      defaultValue={row.carbs}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Input
                      name={`dataSource.${rowIndex}.protein`}
                      control={control}
                      defaultValue={row.protein}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container justify='flex-end' item style={{ paddingTop: 20 }}>
        <Button variant='contained' color='primary' type='submit'>
          submit
        </Button>
      </Grid>
    </form>
  );
};

export default TableEditorExample;
