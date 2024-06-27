const ERRORS: Record<string, string> = {
  is_required: 'Field is required',
  invalid_email: 'Email is invalid',
};

export const getError = (errorKey?: string) => {
  return ERRORS[errorKey || ''] || errorKey;
};
