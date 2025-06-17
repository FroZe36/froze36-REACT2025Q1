import { ChangeEvent, PureComponent } from 'react';
import TopSectionInput from '../TopSectionInput/TopSectionInput';
import TopSectionButton from '../TopSectionButton/TopSectionButton';
import './TopSection.scss';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export interface TopSectionProp {
  handlerSearch: () => void;
  handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

class TopSection extends PureComponent<TopSectionProp> {
  render() {
    const { handlerChange, handlerSearch, inputValue } = this.props;
    return (
      <ErrorBoundary>
        <section className="topSection">
          <TopSectionInput onChange={handlerChange} inputValue={inputValue} />
          <TopSectionButton onClick={handlerSearch} />
        </section>
      </ErrorBoundary>
    );
  }
}

export default TopSection;
