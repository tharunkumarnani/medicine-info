import {Component} from 'react'
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

class UpdateDelete extends Component{
    state={responseMsg:"",apiSuccess:false,diseaseId:"",apiMethod:selectMethod[1].methodId,imageUrl:"",videoUrl:""}

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

    updateDiseaseFinal=async(event)=>{
        event.preventDefault()
        const {diseaseId,imageUrl,videoUrl}=this.state
        const diseaseIdInt=parseInt(diseaseId)
        const diseaseDetails={
            imageUrl,
            videoUrl
        }
        const options={
            method:"PUT",
            headers:{
                'Content-Type':'Application-Json'

            },
            body:JSON.stringify(diseaseDetails)
        }
        const updateUrl=`https://medical-data-ssbg.onrender.com/update-disease/${diseaseIdInt}`
        const response=await fetch(updateUrl,options)
        const data=await response.json()
        console.log(data)
        if (response.ok){
            this.setState({apiSuccess:true,responseMsg:`Hi, Bhavana Reddy You are Succesfully Updated the Disease.`})
        }
    }

    deleteDiseaseFinal=async(event)=>{
        event.preventDefault()
        const {diseaseId}=this.state
        const diseaseIdInt=parseInt(diseaseId)
        const options={
            method:"DELETE"
        }
        const deleteUrl=`https://medical-data-ssbg.onrender.com/delete-disease/${diseaseIdInt}`
        const response =await fetch(deleteUrl,options)
        if (response.ok){
            this.setState({apiSuccess:true,responseMsg:`Hi, Bhavana Reddy You are Succesfully Deleted the Disease.`})
        }
    }

    updateMethodForm=()=>{
        console.log('Update Method')
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
        console.log('Delete Method')
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
        this.setState({apiSuccess:false})
    }

    render(){
        const {apiMethod,apiSuccess,responseMsg}=this.state
        return (
            <div className='bg-cont'>
                {apiSuccess&& <> <p >{responseMsg}</p>
                                <button className='add-one-more' onClick={this.modifyOneMore}>Modify One More</button></>}
                {!apiSuccess&& <><select onChange={this.onChangeMethod} className='select-style' value={apiMethod}>
                    {selectMethod.map(each=><option value={each.methodId} key={each.methodId}>{each.displayText}</option>)}
                </select>
                <h1 className='method'>{apiMethod} Disease</h1>
                {this.methodRender()}
                </>

        }
            </div>
        )
    }
}

export default UpdateDelete