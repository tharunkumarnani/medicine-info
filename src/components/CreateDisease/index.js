import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'

const initializeStatus={
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

class CreateDisease extends Component{
    state={apiStatus:initializeStatus.initial,succeeded:false,diseaseName:"",diseaseSource:'',byInjection:'',byTablets:'',byNatural:'',imageUrl:'',videoUrl:''}

    onSubmitForm=async (event)=>{
        event.preventDefault()
        this.setState({apiStatus:initializeStatus.loading})
        const getUrl ="https://medical-data-ssbg.onrender.com/get-diseases"
        const getResponse =await fetch(getUrl)
        const getData=await getResponse.json()
        console.log(getData)
        const lastItem=getData[getData.length-1]
        let lengthId=lastItem.id+1
        
        const {diseaseName,diseaseSource,byInjection,byTablets,byNatural,imageUrl,videoUrl}=this.state
        const diseaseDetails={
            id:lengthId,
            diseaseName,
            diseaseSource,
            byInjection,
            byTablets,
            byNatural,
            imageUrl,
            videoUrl
        }
        const url="https://medical-data-ssbg.onrender.com/add-disease"
        const options={
            method:"POST",
            headers:{
                'Content-Type':'Application/Json'
            },
            body:JSON.stringify(diseaseDetails)
        }
        const allTrue=diseaseName!=="" && diseaseSource!=="" && byInjection!=="" && byTablets!=="" && byNatural!==""
        if (allTrue){
            const response=await fetch(url,options)
            if (response.ok){
                this.setState({apiStatus:initializeStatus.success,diseaseName:"",diseaseSource:"",byInjection:"",byTablets:"",byNatural:"",imageUrl:"",videoUrl:""})
            }
        }else{
            this.setState({apiStatus:initializeStatus.failure})
        }
        

        
    }

    onChangeName=(event)=>{
        this.setState({diseaseName:event.target.value})
    }

    onChangeSource=(event)=>{
        this.setState({diseaseSource:event.target.value})
    }

    onChangeInjection=(event)=>{
        this.setState({byInjection:event.target.value})
    }

    onChangeTablets=(event)=>{
        this.setState({byTablets:event.target.value})
    }

    onChangeNatural=(event)=>{
        this.setState({byNatural:event.target.value})

    }

    onChangeImageUrl=(event)=>{
        this.setState({imageUrl:event.target.value})
    }

    onChangeVideoUrl=(event)=>{
        this.setState({videoUrl:event.target.value})
    }

    addOneMore=()=>{
        this.setState({apiStatus:initializeStatus.initial})
    }

    onSuccess=()=>(
        <div className='succeeded-msg'>
                    <p className='des'>Hi, Bhavana Reddy You are Succesfully Added Disease To the Database.</p>
                    <p className='des'>Do you want to add one more!</p>
                    <button className='add-another-btn' type='button' onClick={this.addOneMore}>Add One More</button>
                </div>
    )

    onLoading=()=>(
        <div className='succeeded-msg'>
            <ThreeDots type="Threedots" width={80} height={80} color="#c3cad9" />
        </div>
    )

    onInitial=()=>(
        <form onSubmit={this.onSubmitForm}  className='form-style'>
                    <h1 className='heading'>Add Disease in Database</h1>
                    <label className='label-style'>Disease Name</label>
                    <input onChange={this.onChangeName} type='text' className='input-style' placeholder='Enter Disease Name' />
                    <label className='label-style'>Disease Source</label>
                    <textarea onChange={this.onChangeSource} className='input-style' placeholder='Enter Source of Disease' rows={4}></textarea>
                    <label className='label-style'>Medication By Injection</label>
                    <textarea onChange={this.onChangeInjection} className='input-style' placeholder='Enter Medication By Injection' rows={4}></textarea>
                    <label className='label-style'>Medication By Tablets</label>
                    <textarea onChange={this.onChangeTablets} className='input-style' placeholder='Enter Medication By Tablets' rows={4}></textarea>
                    <label className='label-style'>Medication By Natural</label>
                    <textarea onChange={this.onChangeNatural} className='input-style' placeholder='Enter Medication By Natural' rows={4}></textarea>
                    <label className='label-style'>Disease Image Url</label>
                    <input onChange={this.onChangeImageUrl} className='input-style' placeholder='Image URL' />
                    <label className='label-style'>Disease Video Url</label>
                    <input onChange={this.onChangeVideoUrl} className='input-style' placeholder='Video URL' />
                    <button className='submit-btn' type='submit' >Create Disease</button>

                </form>
    )

    onFailure=()=>(
        <div className='succeeded-msg'>
            <p className='des'>Hey Bhavana, Some Details Are Empty</p>
            <button className='add-another-btn' type='button' onClick={this.addOneMore}>Try Again</button>
        </div>
    )

    onInitialize=()=>{
        const {apiStatus}=this.state
        switch (apiStatus){
            case initializeStatus.loading:
                return this.onLoading()
            case initializeStatus.success:
                return this.onSuccess()
            case initializeStatus.initial:
                return this.onInitial()
            case initializeStatus.failure:
                return this.onFailure()
            default:
                return null
        }
    }

    render(){
        return (
            <div className='create-bg'>
                {this.onInitialize()}
            </div>
        )
    }
}

export default CreateDisease