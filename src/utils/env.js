//
export const baseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '✅ NODE.ENV: ',
      // process.env.NODE_ENV,
      process.env.REACT_APP_URL_DEV
    );
    return process.env.REACT_APP_URL_DEV;
  }
  if (process.env.NODE_ENV === 'production') {
    console.log('✅ NODE.ENV: ', process.env.NODE_ENV);
    return process.env.REACT_APP_URL_PROD;
  }
};
