import { ChangeEvent, Component } from 'react';
import TopSection from '../TopSection/TopSection';
import {
  StarshipShortProperties,
  getStarships,
} from '../../api/StarWarsService';
import BottomSection from '../BottomSection/BottomSection';

interface SearchPageState {
  inputValue: string;
  data: StarshipShortProperties[];
  loading: boolean;
}

const localStorageKeyName = 'savedInputValue';

class SearchPage extends Component<Record<string, never>, SearchPageState> {
  state = {
    inputValue: '',
    data: [],
    loading: true,
  };

  async componentDidMount(): Promise<void> {
    const storageData = localStorage.getItem(localStorageKeyName) ?? '';
    this.setState({
      inputValue: storageData,
    });
    await this.setStateResponse(storageData);
  }

  setStateResponse = async (searchQuery: string) => {
    this.setState({
      loading: true,
    });
    const data = await getStarships(searchQuery);
    if (data) {
      this.setState({
        data: data,
        loading: false,
      });
    }
  };

  handleSearch: () => void = async () => {
    const { inputValue } = this.state;
    localStorage.setItem(localStorageKeyName, inputValue);
    await this.setStateResponse(inputValue);
  };
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value.trim(),
    });
  };
  render() {
    const { inputValue, loading, data } = this.state;
    return (
      <main>
        <TopSection
          handlerChange={this.handleChange}
          handlerSearch={this.handleSearch}
          inputValue={inputValue}
        />
        <BottomSection loadingState={loading} data={data} />
      </main>
    );
  }
}

export default SearchPage;
