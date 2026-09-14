import {useEffect, useRef, useState} from 'react';

import classes from './ResetLabel.module.css';

const CONFIRMATION_MS = 1200;

interface ResetLabelProps {
  trigger: number;
}

export const ResetLabel = ({trigger}: ResetLabelProps) => {
  const [confirmed, setConfirmed] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    setConfirmed(true);
    const timeoutId = window.setTimeout(() => {
      setConfirmed(false);
    }, CONFIRMATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [trigger]);

  return (
    <span className={classes.resetLabel} aria-hidden="true">
      <span className={classes.resetLabelTrack} data-confirmed={confirmed}>
        <span className={classes.resetLabelRow}>Reset to Defaults</span>
        <span className={classes.resetLabelRow}>Reset!</span>
      </span>
    </span>
  );
};
