import { ChangeEvent } from 'react';

interface TopSectionInputProp {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const TopSectionInput = (props: TopSectionInputProp) => {
  const { onChange, inputValue } = props;
  return (
    <input
      type="text"
      value={inputValue}
      onChange={onChange}
      placeholder="Search Pokemon name"
      className="topSection__input"
    />
  );
};

export default TopSectionInput;
