import ReactDOM from 'react-dom/client'
import routes from './routes'
import './style/theme-variables.scss'
import './style/font.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </Provider>
)
