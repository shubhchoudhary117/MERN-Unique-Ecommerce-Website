
import { Link } from "react-router-dom";
const TshirtBox=(props)=>{

    return<>
    
                {/* start tshirt box */}
                <Link to={`/product/${JSON.stringify(props.Tshirt)}`} id="link">
                <div className="Tbox">
                    <div className="image"><img src={process.env.PUBLIC_URL + `/photos/tshirts/${props.Tshirt.frontimage} `} alt="" /></div>
                    <div className="content">
                        <div className="price"><i className="uil uil-rupee-sign"></i>{props.Tshirt.itemPrice}</div>
                        <div className="dilavery"><strong>{props.Tshirt.dilavery}</strong></div>
                        <div className="rating">
                            <span className="digit">{props.Tshirt.rating}<i className="uil uil-star"></i></span>
                        </div>
                        <div className="hintText">{props.Tshirt.hint}</div>
                    </div>
                </div>
                </Link>
    
    </>
}

export default TshirtBox;