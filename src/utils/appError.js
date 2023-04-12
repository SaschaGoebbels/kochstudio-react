import { state } from '../components/store/state';

const appError = (err, message) => {
  console.log('✅✅APP ERROR', err);
  console.log('❌❌APP MESSAGE', err.message);
  state.loading = false;
  if (err.TypeError) {
    message({
      title: `Fehler`,
      message: 'Bitte Netzwerkverbindung prüfen!',
      showBtnX: false,
    });
  }
  message({
    title: `Error`,
    message: 'Es ist etwas schief gelaufen !',
    showBtnX: false,
  });
  console.log('✅APP ERROR');
};

export default appError;
