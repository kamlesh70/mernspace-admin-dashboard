export const apiErrorHandler = async (cb: any, message: string) => {
  try {
    return await cb();
  } catch (error: any) {
    console.log(error, error?.response?.data?.errors[0]?.msg);
    const errMessage = error?.response?.data?.errors[0]?.msg;
    throw new Error(errMessage || message || 'Internal server error !');
  }
};
