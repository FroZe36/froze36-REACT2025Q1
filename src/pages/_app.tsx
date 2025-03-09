import type { AppProps } from 'next/app';
import '@/styles/styles.scss';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { wrapper } from '@/redux/store';
import { FC } from 'react';
import { Provider } from 'react-redux';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
