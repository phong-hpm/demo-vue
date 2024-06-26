const ERRORS: Record<string, string> = {
  is_required: 'Field is required',
};

export const getError = (errorKey?: string) => {
  return ERRORS[errorKey || ''] || '';
};
