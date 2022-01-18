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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChessRook, faUserCircle, faPlus, faTrash, faSave, faFile, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContextProvider } from './UserContext'
import { SettingsContextProvider } from './SettingsContext'


library.add(faChessRook, faUserCircle, faPlus, faTrash, faSave, faSignOutAlt, faFile)

function App() {
    return (
    <UserContextProvider>
      <SettingsContextProvider>
        <Router>
          <div className="w-screen h-screen flex flex-col">
            <div className="w-full h-16 bg-gray-700  flex items-center pl-8" >
              <FontAwesomeIcon icon="chess-rook" color="white" />
              <h2 className="font-bold text-lg text-white pl-4">Ultimate Editor</h2>
            </div>
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