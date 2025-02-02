import { Component } from 'react';
import errorImg from './error.gif';

export class ErrorMsg extends Component {
  render() {
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
      />
    );
  }
}
