import {Component} from 'react'
import { IoMdSearch } from "react-icons/io";
import {ThreeDots} from 'react-loader-spinner'
import DiseaseItem from '../DiseaseItem'
import './index.css'

const serverStatus={
    initial:"INITIAL",
    loading:'LOADING',
    success:'SUCCESS',
    failed:'FAIL'
}

class GetDiseases extends Component{
    state={diseaseList:[],status:serverStatus.initial,userSearch:""}

    componentDidMount(){
        this.getdiseases()
    }

    getdiseases=async ()=>{
        this.setState({status:serverStatus.loading})
        const options={
            method:'GET',
            Headers:{
                'content-type':'application-json'
            }
        }
        const url="https://medical-data-ssbg.onrender.com/get-diseases"
        const response=await fetch(url,options)
        const data=await response.json()
        if (response.ok){
            const updateData=data.map(each=>({
                id:each.id,
                imageUrl:each.disease_image_url,
                diseaseName:each.disease_name,
                diseaseSource:each.disease_source,
                byInjection:each.medication_by_injection,
                byTablets:each.medication_by_tablets,
                byNatural:each.medication_by_natural,
                videoUrl:each.video_url
            }))
            this.setState({diseaseList:updateData,status:serverStatus.success})
        }else{
            this.setState({status:serverStatus.failed})
        }
    }
    
    onLoading=()=>(
        <div className='loading'>
            <ThreeDots type="ThreeDots" color="#ffffff" width={80} height={50} /> 
        </div>
    )

    onFailed=()=>(
        <div className='failed'>
            <img className='fail-img' alt="failure img" src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"/>
            <h1 className='fail-head'>Oops! Something Went Wrong..</h1>
            <p className='des'>We cannot seem to find the page you are looking for.</p>
            <button className='retry-btn' type="button" onClick={this.getdiseases}>Retry</button>
        </div>
    )

    onEmptyDisease=()=>{
        const {userSearch}=this.state
        return (
            <div className='empty-disease'>
                <img alt="not found" className='not-found-img' src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"/>
                <h1 className='not-found-heading'>Are you not finding the disease you are looking for? </h1>
                <p className=''>Dont lose hope click the below request the disease button.</p>
                <button type='button' className="add-request-wtapp">
                    
                    <a href={`https://wa.me/916302543583?text=Add%20this%20Disease%20${userSearch}`} className='link'>
                        <p className='descrip'>Request The Disease</p>
                        <img alt='whatsapp' className='wt-logo' src="https://eu-images.contentstack.com/v3/assets/blt6d90778a997de1cd/bltf26ad58ff670f528/64f1596bbe19834065d99176/whatsapp_solomon7_shutterstock.jpg?width=850&auto=webp&quality=95&format=jpg&disable=upscale"/>
                    </a>
                </button>
            </div>
        )
    }

    onSuccess=()=>{
        const {diseaseList,userSearch}=this.state
        const filterList=diseaseList.filter(each=>each.diseaseName.toLowerCase().includes(userSearch.toLowerCase()))
        if (filterList.length===0){
            return this.onEmptyDisease()
        }
        return (
            <ul className='disease-list'>
                {filterList.map((each,index)=><DiseaseItem index={index} diseaseDetails={each} key={each.id} />
                )}
            </ul>)
    }

    onChangeSearch=(event)=>{
        this.setState({userSearch:event.target.value})
    }

    onInitial=()=>{
        const {status}=this.state
        switch (status){
            case serverStatus.loading:
                return this.onLoading()
            case serverStatus.success:
                return this.onSuccess()
            case serverStatus.failed:
                return this.onFailed()
            default:
                return null

        }
    }
    render(){
        const {userSearch}=this.state
        return (
            <div className='home'>
                <div className='search-cont'>
                    <input onChange={this.onChangeSearch} value={userSearch} placeholder='Search By Disease Name' className='search' type="search" />
                    <IoMdSearch className='search-icon' />
                </div>
                <div className='card'>{this.onInitial()}</div>
            </div>
        )
    }
}

export default GetDiseases