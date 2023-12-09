
import {HashRouter as Router,Route,Routes} from "react-router-dom"
import GetDiseases from './components/GetDiseases/index'
import CreateDisease from './components/CreateDisease';
import UpdateDelete from './components/UpdateDelete'
import NotFound from './components/NotFound'
import './App.css';

const App=()=>{
    return (
        <Router>
                <Route exact path="/" Component={GetDiseases} />
                <Route exact path="/add-disease" Component={CreateDisease}/>
                <Route exact path="/modify-disease" Component={UpdateDelete }/>
                <Route Component={NotFound}/>
            
        </Router>

    )
}

    
export default App;
