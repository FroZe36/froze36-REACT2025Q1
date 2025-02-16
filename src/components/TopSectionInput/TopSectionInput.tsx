import { ChangeEvent, FC } from 'react';

interface TopSectionInputProp {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const TopSectionInput: FC<TopSectionInputProp> = ({ onChange, inputValue }) => {
  return (
    <input
      type="text"
      value={inputValue}
      onChange={onChange}
      placeholder="Type name of Starship ..."
      className="topSection__input"
    />
  );
};

export default TopSectionInput;
