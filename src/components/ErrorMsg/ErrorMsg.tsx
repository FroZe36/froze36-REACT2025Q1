import errorImg from './error.gif';
import Image from 'next/image';
const ErrorMsg = () => {
  return (
    <Image
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
