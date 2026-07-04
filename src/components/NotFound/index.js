import {Link} from "react-router-dom"
import './index.css'

const NotFound =(props)=>{
    const returnHome=()=>{
        
        // const {history}=props
        // history.replace('/')
    }
    return(
        <div className="not-found-cont">
    <div className='empty-disease'>
                <img alt="not found" className='not-found-img' src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"/>
                <h1 className='not-found-heading'>The page You are looking for is not found.</h1>
                <Link to="/" onClick={returnHome} type='button' className="add-request-wtapp">
                 Return to Home   
                </Link>
            </div>
            </div>
)
}
export default NotFound