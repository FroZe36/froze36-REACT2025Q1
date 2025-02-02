import { ChangeEvent, Component } from 'react';
import TopSection from '../TopSection/TopSection';
import BottomSection from '../BottomSection/BottomSection';

interface SearchPageState {
  inputValue: string;
  data: string[] | [];
}

const localStorageKeyName = 'savedInputValue';

class SearchPage extends Component<Record<string, never>, SearchPageState> {
  state = {
    inputValue: '',
    data: [],
  };

  componentDidMount(): void {
    const storageData = localStorage.getItem(localStorageKeyName) ?? '';
    this.setState({
      inputValue: storageData,
    });
  }

  handleSearch = () => {
    const { inputValue } = this.state;
    localStorage.setItem(localStorageKeyName, inputValue);
    console.log(inputValue);
  };
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value.trim(),
    });
  };
  render() {
    const { inputValue } = this.state;
    return (
      <main>
        <TopSection
          handlerChange={this.handleChange}
          handlerSearch={this.handleSearch}
          inputValue={inputValue}
        />
        <BottomSection />
      </main>
    );
  }
}

export default SearchPage;
