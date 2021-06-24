export const textRequiredValidate: any =
  (value: string) =>
  (messageError: string = "required") => {
    if (value) return undefined;

    return messageError;
  };
