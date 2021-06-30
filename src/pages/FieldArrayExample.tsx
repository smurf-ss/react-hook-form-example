import { useCallback } from "react";

import { useForm, useFieldArray, Control } from "react-hook-form";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import Input from "@components/atoms/Input";
import Paper from "@components/Paper";

type MemberOptions = { firstName: string; lastName: string; hobby: string[] };

type FieldArrayValues = {
  clubName: string;
  member: MemberOptions[];
};

const RenderHobby = ({
  control,
  name,
}: {
  control: Control<any>;
  name: string;
}) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `${name}.hobby`, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onAddHobby = useCallback(() => {
    append("");
  }, [append]);

  const onDeleteHobby = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <Grid
      container
      spacing={1}
      justify='center'
      direction='column'
      style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Grid item xs={4}>
        <Button variant='contained' color='primary' onClick={onAddHobby}>
          Add Hobby
        </Button>
      </Grid>

      {fields.map((field, index) => {
        return (
          <Grid item xs={12}>
            <Grid container spacing={1} justify='center' alignItems='flex-end'>
              <Grid item xs={1}>
                <Typography variant='subtitle1' gutterBottom>
                  Hobby # {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Input
                  control={control}
                  name={`${name}.hobby.${index}`}
                  required={true}
                  inputProps={{
                    label: `Hobby # ${index + 1}`,
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={onDeleteHobby(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const RenderMember = ({ control }: { control: Control<any> }) => {
  const { fields, remove, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "member", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onAddMember = useCallback(() => {
    append({ firstName: "", lastName: "" });
  }, [append]);

  const onDeleteMember = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <Grid container spacing={3} justify='center' direction='column'>
      <Grid item xs={4}>
        <Button variant='contained' color='primary' onClick={onAddMember}>
          Add Member
        </Button>
      </Grid>

      {fields.map((field, index) => {
        return (
          <Grid item xs={12} key={field.id}>
            <Paper width={"100%"}>
              <Grid container spacing={3} justify='space-between'>
                <Grid item>
                  <Typography variant='h5' gutterBottom>
                    Member # {index + 1}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={onDeleteMember(index)}
                    startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
              <Input
                control={control}
                name={`member.${index}.firstName`}
                required={true}
                inputProps={{
                  label: "firstName",
                }}
              />
              <Input
                control={control}
                name={`member.${index}.lastName`}
                required={true}
                inputProps={{
                  label: "LastName",
                }}
              />

              <RenderHobby control={control} name={`member.${index}`} />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

const useFieldArrayExample = () => {
  const onSubmit = (data: FieldArrayValues) => alert(JSON.stringify(data));

  return { onSubmit };
};

const FieldArrayExample = () => {
  const { control, handleSubmit } = useForm<FieldArrayValues>({
    defaultValues: { member: [] },
    mode: "onBlur",
  });

  const { onSubmit } = useFieldArrayExample();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} width='100%'>
        <Typography variant='h4' gutterBottom>
          React Hook Form
        </Typography>
        <Typography variant='h5' gutterBottom>
          Field Arrays Example
        </Typography>
        <Typography variant='h6' gutterBottom>
          Integrating with Material UI
        </Typography>
        <Grid container spacing={6} justify='center'>
          <Grid item xs={12}>
            <Input
              control={control}
              name='clubName'
              required={true}
              inputProps={{
                label: "clubName",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RenderMember control={control} />
          </Grid>
        </Grid>
      </Paper>
      <Grid container justify='flex-end' item style={{ paddingTop: 20 }}>
        <Button variant='contained' color='primary' type='submit'>
          submit
        </Button>
      </Grid>
    </form>
  );
};

export default FieldArrayExample;
