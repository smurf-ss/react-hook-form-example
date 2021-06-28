export const textRequiredValidate =
  (messageError?: string) => (value: string) => {
    const message = messageError || "required";
    if (value) return undefined;
    return message;
  };

export const formatEmailValidate =
  (messageError?: string) => (value: string) => {
    const message = messageError || "invalid email format";

    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value) return undefined;

    if (value && validRegex.test(String(value).toLowerCase())) {
      return undefined;
    }

    return message;
  };
