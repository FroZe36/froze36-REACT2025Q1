import { ChangeEvent, PureComponent } from 'react';

interface TopSectionInputProp {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}
class TopSectionInput extends PureComponent<TopSectionInputProp> {
  render() {
    const { onChange, inputValue } = this.props;
    return <input type="text" value={inputValue} onChange={onChange}></input>;
  }
}

export default TopSectionInput;
