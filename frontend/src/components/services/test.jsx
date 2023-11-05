import { useDispatch, useSelector } from "react-redux";
import { changeTotal } from "../../states/Testtotal/testt";

const Total=()=>{
    const total=useSelector((state)=> state.total.Total);
    const dispatch=useDispatch()

    const showTotal=()=>{
        const obj=[
            {
                ToTal:10
            },
            {
                ToTal:10
            },
            {
                ToTal:10
            },
            {
                ToTal:10
            },
        ];

        obj.forEach((e)=>{
           
            console.log(e.ToTal)
            dispatch(changeTotal(e.ToTal))
        })
    }


    return<>

    <button onClick={showTotal}>show total</button><br></br>
    <br></br>

    <p>{total}</p>
    
    
    
    </>
}

export default Total;