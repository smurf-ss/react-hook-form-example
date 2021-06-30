import { useForm } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Select from "@components/atoms/Select";
import Input from "@components/atoms/Input";
import FieldWatched from "@components/hook-form/FieldWatched";
import Paper from "@components/Paper";

import { formatEmailValidate } from "@utils/hook-form-validator";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  category: string;
};

const useSimpleFormExample = () => {
  const onSubmit = (data: FormValues) => alert(JSON.stringify(data));
  return { onSubmit };
};

const SimpleFormExample = () => {
  const { handleSubmit, control, reset, getValues } = useForm<FormValues>({
    defaultValues: { category: "" },
    mode: "onBlur",
  });

  const { onSubmit } = useSimpleFormExample();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} width='100%'>
        <Typography variant='h4' gutterBottom>
          Simple Form Example
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Input
              control={control}
              name='firstName'
              required={true}
              inputProps={{
                label: "FirstName",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name='lastName'
              required={true}
              inputProps={{
                label: "LastName",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name='email'
              required={true}
              inputProps={{
                label: "Email",
              }}
              validates={[formatEmailValidate()]}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name='age'
              required={true}
              inputProps={{
                label: "Age",
                type: "number",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              name='category'
              selectProps={{
                label: "Category",
              }}
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
          </Grid>
        </Grid>
        <FieldWatched control={control} name='email' />
        <Grid container justify='flex-end' spacing={2}>
          <Grid item>
            <Button variant='contained' color='primary' type='submit'>
              submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => {
                console.log("getValues", getValues());

                reset({
                  firstName: "",
                  lastName: "",
                  email: "",
                  age: "",
                  category: "",
                });
              }}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default SimpleFormExample;
