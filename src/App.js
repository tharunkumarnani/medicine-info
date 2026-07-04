
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"
import GetDiseases from './components/GetDiseases/index'
import CreateDisease from './components/CreateDisease';
import UpdateDelete from './components/UpdateDelete'
import NotFound from './components/NotFound'
import './App.css';

const App=()=>{
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={GetDiseases} />
                <Route exact path="/add-disease" Component={CreateDisease}/>
                <Route exact path="/modify-disease" Component={UpdateDelete }/>
                <Route path="/not-found" Component={NotFound}/>
                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
            </Routes>
        </Router>

    )
}

    
export default App;
