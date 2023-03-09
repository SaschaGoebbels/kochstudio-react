import React, { useState, useEffect } from 'react';
import classes from './Loading.module.css';
import { useSnapshot } from 'valtio';
import { state } from '../components/store/state';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const snap = useSnapshot(state);
  useEffect(() => {
    setLoading(state.loading);
  }, [snap.loading]);

  return (
    <div className={`${classes.background} ${!loading && classes.displayNone}`}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Loading;
