import React, { useCallback } from "react";

import { useForm, useFieldArray, Control } from "react-hook-form";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import Input from "../components/atoms/Input";
import Paper from "../components/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `${name}.hobby`, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onAddHobby = useCallback(() => {
    prepend("");
  }, [prepend]);

  const onDeleteHobby = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <Grid container spacing={3} justify='center' direction='column'>
      <Grid item xs={4}>
        <Button variant='contained' color='primary' onClick={onAddHobby}>
          Add Hobby
        </Button>
      </Grid>

      {fields.map((field, index) => {
        return (
          <Grid item xs={10}>
            <Paper elevation={3} key={field.id} width={"100%"}>
              <Button
                variant='contained'
                color='secondary'
                onClick={onDeleteHobby(index)}
                startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Input
                control={control}
                name={`${name}.hobby.${index}`}
                required={true}
                inputProps={{
                  label: `Hobby # ${index + 1}`,
                }}
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

const RenderMember = ({ control }: { control: Control<any> }) => {
  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "member", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onAddMember = useCallback(() => {
    prepend({ firstName: "", lastName: "" });
  }, [prepend]);

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
          <React.Fragment key={field.id}>
            <Grid item xs={10}>
              <Paper elevation={3} width={"100%"}>
                <Typography variant='h5' gutterBottom>
                  Member # {index + 1}
                </Typography>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={onDeleteMember(index)}
                  startIcon={<DeleteIcon />}>
                  Delete
                </Button>
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
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <RenderHobby control={control} name={`member.${index}`} />
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

const FieldArrayExample = () => {
  const { control, handleSubmit } = useForm<FieldArrayValues>({
    defaultValues: { member: [] },
    mode: "onBlur",
  });

  const onSubmit = (data: FieldArrayValues) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} width={600}>
        <Grid container spacing={6} justify='center'>
          <Grid item xs={10}>
            <Input
              control={control}
              name='clubName'
              required={true}
              inputProps={{
                label: "clubName",
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <RenderMember control={control} />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default FieldArrayExample;
