import "../../css/MessagesStyling/NocartsStyling.css"
import { Link } from "react-router-dom";
const NoCartsAdded=()=>{
    return <>
    <main>
        <div className="NocartsContainer">
            <div className="NocartsContent">
                <img src={process.env.PUBLIC_URL+"/photos/WebsitePhotos/nocartsLogo.png"} alt="" />
                <div className="content">
                    <div className="title">Your cart is empty</div>
                    <Link to="/" id="button">View products</Link>
                </div>
            </div>
        </div>
    </main>
    
    </>
}

export default NoCartsAdded;