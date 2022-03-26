import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer g4gOmZQNh6bL84dzom4DWmpcSmG2';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

