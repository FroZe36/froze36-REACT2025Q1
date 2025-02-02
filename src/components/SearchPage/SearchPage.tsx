import { ChangeEvent, Component } from 'react';
import TopSection from '../TopSection/TopSection';
import {
  StarshipShortProperties,
  getStarships,
} from '../../api/StarWarsService';
import BottomSection from '../BottomSection/BottomSection';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface SearchPageState {
  inputValue: string;
  data: StarshipShortProperties[];
  loading: boolean;
  error: null | string;
}

const localStorageKeyName = 'savedInputValue';

class SearchPage extends Component<Record<string, never>, SearchPageState> {
  state = {
    inputValue: '',
    data: [],
    loading: true,
    error: null,
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
    try {
      const data = await getStarships(searchQuery);
      if (data) {
        this.setState({
          data: data,
          loading: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: error.message,
          data: [],
        });
      }
    } finally {
      this.setState({
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
    const { inputValue, loading, data, error } = this.state;

    return (
      <ErrorBoundary>
        <main>
          <TopSection
            handlerChange={this.handleChange}
            handlerSearch={this.handleSearch}
            inputValue={inputValue}
          />
          <ErrorBoundary>
            <BottomSection loadingState={loading} data={data} error={error} />
          </ErrorBoundary>
        </main>
      </ErrorBoundary>
    );
  }
}

export default SearchPage;
