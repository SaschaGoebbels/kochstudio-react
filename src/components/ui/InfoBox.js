import classes from './InfoBox.module.css';
import ButtonRound from './ButtonRound';

const InfoBox = props => {
  const onClickHandler = el => {
    props.clickInfoBox(el);
    if (el === 'x' && props.messageState.dismiss) {
      props.messageState.dismiss(props.messageState.value);
    }
    if (el === 'check' && props.messageState.confirm) {
      props.messageState.confirm(props.messageState.value);
    }
  };
  return (
    <div
      className={`${classes.infoBox}  ${
        props.messageState.hideInfoBox && classes.infoBox__hide
      }`}
    >
      <div className={classes.infoBox__card}>
        <header className={classes.infoBox__header}>
          <h2>{props.messageState.title}</h2>
        </header>
        <div className={classes.infoBox__messageBox}>
          <p>{props.messageState.message}</p>
        </div>
        <footer className={classes.infoBox__footer}>
          {props.messageState.showBtnX && (
            <ButtonRound
              btnId="x"
              className={classes.buttonAddEdit}
              buttonName={'x'}
              color={'#AD5050'}
              iconColor={''}
              isFav={''}
              onClickHandler={onClickHandler}
            />
          )}
          <ButtonRound
            btnId="check"
            className={classes.buttonAddEdit}
            buttonName={'check'}
            color={''}
            iconColor={''}
            isFav={''}
            onClickHandler={onClickHandler}
          />
        </footer>
      </div>
    </div>
  );
};

export default InfoBox;
