import errorImg from './error.gif';

const ErrorMsg = () => {
  return (
    <img
      style={{
        display: 'block',
        width: '200px',
        height: '200px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={errorImg}
      alt="Error"
      data-testid="errorElement"
    />
  );
};

export default ErrorMsg;
