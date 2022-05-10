export const isRequired = (value) =>
  value.length ? undefined : "The field is required";

const minLength = (length) => (value) => {
  return value.length >= length
    ? undefined
    : `The min lenght must be ${length}`;
};

export const minLength3 = minLength(3);

const maxLength = (length) => (value) => {
  return value.length <= length
    ? undefined
    : `The min lenght must be ${length}`;
};

export const maxLength20 = maxLength(20);
