import './index.css'

const NotFound =(props)=>{
    const returnHome=()=>{
        const {history}=props
        history.replace('/')
    }
    return(
    <div className='empty-disease'>
                <img alt="not found" className='not-found-img' src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"/>
                <h1 className='not-found-heading'>The page You are looking for is not found.</h1>
                <button onClick={returnHome} type='button' className="add-request-wtapp">
                 Return to Home   
                </button>
            </div>
)
}
export default NotFound