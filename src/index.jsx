import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </>
)
