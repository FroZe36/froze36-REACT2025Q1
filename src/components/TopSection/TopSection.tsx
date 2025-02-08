import { ChangeEvent } from 'react';
import TopSectionInput from '../TopSectionInput/TopSectionInput';
import TopSectionButton from '../TopSectionButton/TopSectionButton';
import './TopSection.scss';
interface TopSectionProp {
  handlerSearch: () => void;
  handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const TopSection = (props: TopSectionProp) => {
  const { handlerChange, handlerSearch, inputValue } = props;
  return (
    <section className="topSection">
      <TopSectionInput onChange={handlerChange} inputValue={inputValue} />
      <TopSectionButton onClick={handlerSearch} />
    </section>
  );
};

export default TopSection;
