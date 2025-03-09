import { useState } from 'react';
import styles from './ButtonError.module.scss';

const { buttonError } = styles;
const ButtonError = () => {
  const [error, setError] = useState<boolean>(false);

  if (error) {
    throw new Error(
      'The error eject by pressed the button, reload the page to continue!'
    );
  }

  return (
    <button
      type="button"
      onClick={() => setError(!error)}
      className={buttonError}
    >
      Throw Error
    </button>
  );
};

export default ButtonError;
