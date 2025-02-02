import { PureComponent } from 'react';
import './ButtonError.scss';
class ButtonError extends PureComponent<
  Record<string, never>,
  { isError: boolean }
> {
  state = {
    isError: false,
  };
  setError = () => {
    this.setState({
      isError: true,
    });
  };
  render() {
    if (this.state.isError) {
      throw new Error(
        'The error eject by pressed the button, reload the page to continue!'
      );
    }
    return (
      <button type="button" onClick={this.setError} className="buttonError">
        Throw Error
      </button>
    );
  }
}

export default ButtonError;
