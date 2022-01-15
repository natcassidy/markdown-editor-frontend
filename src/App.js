import './App.css'
import Documents from './Components/Documents'
import FullEditor from './Components/FullEditor'
import Authentication from './Components/Authentication'
import PrivateRoute from './Components/PrivateRoute'
import LoginRedirect from './Components/LoginRedirect'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { UserContextProvider } from './UserContext'
import { SettingsContextProvider } from './SettingsContext'

function App() {
  

  return (
    <UserContextProvider>
      <SettingsContextProvider>
        <Router>
          <div className="w-screen h-screen flex flex-col">
            <Routes>
              <Route path="/" exact element={<LoginRedirect><Authentication /></LoginRedirect>} />
              <Route path="/editor" exact element={<PrivateRoute><FullEditor /></PrivateRoute>} />
              <Route path="/editor/:id" element={<PrivateRoute><FullEditor /></PrivateRoute>} />
              <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </SettingsContextProvider>
    </UserContextProvider>
  );
}

export default App;