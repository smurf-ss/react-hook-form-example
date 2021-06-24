import { useForm, useWatch, Control } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Paper from "../components/Paper";
import Input from "../components/atoms/Input";

function FirstNameWatched({ control }: { control: Control<FormValues> }) {
  const firstName = useWatch({
    control,
    name: "firstName", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "", // default value before the render
  });
  return <p>Watch FirstName: {firstName}</p>; // only re-render at the component level, when firstName changes
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
};

const FormExample = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {},
    mode: "onBlur",
  });
  const onSubmit = (data: FormValues) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} width={300}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name='age'
              required={true}
              inputProps={{
                label: "Age",
              }}
            />
          </Grid>
        </Grid>
        <FirstNameWatched control={control} />
        <Button variant='contained' color='primary' type='submit'>
          submit
        </Button>
        {/* <input type='submit' /> */}
      </Paper>
    </form>
  );
};

export default FormExample;
