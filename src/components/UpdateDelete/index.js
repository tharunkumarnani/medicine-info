import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'

import './index.css'

const selectMethod=[
    {
        methodId:"UPDATE",
        displayText:"Update"
    },{
        methodId:"DELETE",
        displayText:"Delete"
    }
]
const initializeStatus={
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

class UpdateDelete extends Component{
    state={responseMsg:"",apiStatus:initializeStatus.initial,diseaseId:"",apiMethod:selectMethod[1].methodId,imageUrl:"",videoUrl:""}

    onChangeMethod=(event)=>{
        this.setState({apiMethod:event.target.value})
    }

    onChangeDiseaseId=(event)=>{
        this.setState({diseaseId:event.target.value})
    }

    onChangeImageUrl=(event)=>{
        this.setState({imageUrl:event.target.value})
    }

    onChangeVideoUrl=(event)=>{
        this.setState({videoUrl:event.target.value})
    }

    onLoading=()=>(
        <div className='succeeded-msg'>
            <ThreeDots type="Threedots" width={80} height={80} color="#c3cad9" />
        </div>
    )

    updateDiseaseFinal=async(event)=>{
        event.preventDefault()
        this.setState({apiStatus:initializeStatus.loading})
        const {diseaseId,imageUrl,videoUrl}=this.state
        const diseaseIdInt=parseInt(diseaseId)
        const diseaseDetails={
            imageUrl,
            videoUrl
        }
        const options={
            method:"PUT",
            headers:{
                'Content-Type':'Application/Json'

            },
            body:JSON.stringify(diseaseDetails)
        }
        const updateUrl=`https://medical-data-ssbg.onrender.com/update-disease/${diseaseIdInt}`
        const response=await fetch(updateUrl,options)
        if (response.ok){
            this.setState({apiStatus:initializeStatus.success,responseMsg:`Hi, Bhavana Reddy You are Succesfully Updated the Disease.`})
        }
        else{
            this.setState({apiStatus:initializeStatus.failure})
        }
    }

    deleteDiseaseFinal=async(event)=>{
        event.preventDefault()
        this.setState({apiStatus:initializeStatus.loading})
        const {diseaseId}=this.state
        const diseaseIdInt=parseInt(diseaseId)
        const options={
            method:"DELETE"
        }
        const deleteUrl=`https://medical-data-ssbg.onrender.com/delete-disease/${diseaseIdInt}`
        const response =await fetch(deleteUrl,options)
        if (response.ok){
            this.setState({apiStatus:initializeStatus.success,responseMsg:`Hi, Bhavana Reddy You are Succesfully Deleted the Disease.`})
        }
        else{
            this.setState({apiStatus:initializeStatus.failure})
        }
    }

    updateMethodForm=()=>{
        return (
            <form className='form-style' onSubmit={this.updateDiseaseFinal}>
                <label htmlFor='diseaseId' className='label-style'>Enter Disease Id</label>
                <input id="diseaseId" className='input-style' placeholder='Enter ID' onChange={this.onChangeDiseaseId} />
                <label htmlFor='imgaeUrl' className='label-style'>Image Url</label>
                <input id="imageUrl" className='input-style' placeholder='Enter Image Url' onChange={this.onChangeImageUrl} />
                <label htmlFor='videoUrl' className='label-style' >Video Url</label>
                <input id="videoUrl" className='input-style' placeholder='Enter Video Url' onChange={this.onChangeVideoUrl} />
                <button className='submit-btn' type="submit" >Update</button>
            </form>
        )
    }

    deleteMethodForm=()=>{
        return (
            <form className='form-style' onSubmit={this.deleteDiseaseFinal}>
                <label htmlFor='diseaseId' className='label-style'>Enter Disease Id</label>
                <input id="diseaseId" className='input-style' placeholder='Enter ID' onChange={this.onChangeDiseaseId} />
                <button className='submit-btn' type="submit" >Delete</button>
            </form>
        )
    }

    methodRender=()=>{
        const {apiMethod}=this.state
        switch (apiMethod) {
            case selectMethod[0].methodId:
                return this.updateMethodForm()
            case selectMethod[1].methodId:
                return this.deleteMethodForm()
            default:
                return null
        }
    }

    modifyOneMore=()=>{
        this.setState({apiSuccess:initializeStatus.initial})
    }

    onSuccess=()=>{
        const {responseMsg}=this.state
        return (
            <div className='succeeded-msg'>
            <p >{responseMsg}</p>
            <button className='add-one-more' onClick={this.modifyOneMore}>Modify One More</button>
            </div>
        )
    }
    

    tryAgain=()=>{
        this.setState({apiStatus:initializeStatus.initial})
    }

    onFailure=()=>(
        <div className='succeeded-msg'>
        <p >Something Went Wrong</p>
        <button className='add-one-more' onClick={this.tryAgain}>Try Again</button>
        </div>
    )

    onInitialShow=()=>{
        const {apiMethod}=this.state
        return (
            <><select onChange={this.onChangeMethod} className='select-style' value={apiMethod}>
                    {selectMethod.map(each=><option value={each.methodId} key={each.methodId}>{each.displayText}</option>)}
                </select>
                <h1 className='method'>{apiMethod} Disease</h1>
                {this.methodRender()}
            </>
        )
    }
    

    initializeDisplay=()=>{
        const {apiStatus}=this.state
        switch (apiStatus){
            case initializeStatus.initial:
                return this.onInitialShow()
            case initializeStatus.loading:
                return this.onLoading()
            case initializeStatus.success:
                return this.onSuccess()
            case initializeStatus.failure:
                return this.onFailure()
            default :
                return null
        }
    }

    render(){
        
        return (
            <div className='bg-cont'>
                {this.initializeDisplay()}
            </div>
        )
    }
}

export default UpdateDelete