const AppError = (err, message) => {
  console.log(Object.keys(err));
  console.log(err.contains('Failed to fetch'));

  // if (err.TypeError) {
  //   message({
  //     title: `Fehler`,
  //     message: 'Bitte Netzwerkverbindung prüfen!',
  //     showBtnX: false,
  //   });
  // }
};

export default AppError;
