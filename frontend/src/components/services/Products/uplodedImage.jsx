
import { useState } from "react"
import axios from "axios"

var bufferImage="";
var base64String="";

const ImageUpload = () => {


    const [File, setFile] = useState("none")
    const [Image, setImage] = useState("none");
    const [data,setData]=useState([]);

    const GetPath = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        
        

    }

    const showPath=(e)=>{
        e.preventDefault();
        console.log(File)
    }

    // const PostImage = (e) => {
    //     e.preventDefault();

    //     const formdata = new FormData();
    //     formdata.append("photo", File)
    //     formdata.append('name', "shubham")
    //     const config = {
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //         },
    //     };

    //     let URL = "http://localhost:8000/addcart/upload";

    //     axios.post(URL, formdata, config).then((res) => {
            
    //         setImage(res.data.toString("base64"));
    //         console.log(Image)
    //     })

    // }


    const GetImage = async () => {
        var Alldata;
        await axios.get("http://localhost:8000/addcart/upload").then((res) => {
            Alldata=res.data;
            setData(Alldata)

            console.log(Alldata)

            

        }).catch((err) => {
            console.log(err)
        })
    }




    return <>

        <form encType="multipart/form-data">
            <input type="file" name="filename" id="fileopenLogo" accept="image/*" multiple onChange={GetPath} />
            <label htmlFor="fileopenLogo">  <i class="uil uil-camera-plus"></i></label><br></br>
            <button type="submit" onClick={showPath}>showPath</button>
        </form>

        <div>
            {/* <button onClick={GetImage}>get Image</button> */}

          
            
            {/* <img src={`data:image/png;base64,${Image}`} /> */}
         

        



            <div>

            </div>
        </div>


    </>
}

export default ImageUpload;