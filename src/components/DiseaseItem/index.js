import styled from "styled-components";
import './index.css'

const LeftPart=styled.div`
width:50%;
height:auto;
padding-left:${(props) => (props.index%2===0 ? 0 : 10)}px;
order: ${(props) => (props.index%2===0 ? 0 : 1)};
@media (max-width:768px){
    width:100%;
    order:0;
}
`;
const RightPart=styled.div`
width:50%;
color: white;
padding-left:${(props) => (props.index%2===0 ? 10 : 0)}px;
order: ${(props) => (props.index%2===0 ? 1 : 0)};
@media (max-width:768px){
    width:100%;
    order:1;
    padding-bottom:20px;
    margin-top:10px;
}
`;

const DiseaseItem=(props)=>{
    const {diseaseDetails,index}=props
    const {id,diseaseName,diseaseSource,byInjection,byTablets,byNatural,imageUrl}=diseaseDetails
    return (
        <li className='item-style'>
            <LeftPart index={index}>
                <img src={imageUrl} className="disease-img" alt="Disease" />
            </LeftPart>
            <RightPart index={index}>
                <h1 className='heading'>{diseaseName}.{id}</h1>
                <p className='para'>{diseaseSource}</p>
                <p className='medication'>Medication_by_injection: <span className='span-style'>{byInjection}</span></p>
                <p className='medication'>Medication_by_tablets: <span className='span-style'>{byTablets}</span></p>
                <p className='medication'>Medication_by_natural: <span className='span-style'>{byNatural}</span></p>
            </RightPart>
        </li>
    )
}

export default DiseaseItem