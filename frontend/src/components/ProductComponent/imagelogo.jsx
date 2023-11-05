
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUplodedImageUrl } from "../../states/ImageLogoState/ImageLogoSlice";
import { ChangeUplodedImageFilePath } from "../../states/ImageLogoState/uplodedimagefielPath";

const ImageLogo = (props) => {
    const [upload, setUpload] = useState(false)
    const [img, setImg] = useState("")
    const [File, setFile] = useState("fielPath")

    const dispatch = useDispatch()

    const file = document.getElementById("fileopenLogo")

    // remove uploded image

    const removeImageLogo = () => {
        dispatch(ChangeUplodedImageUrl(false))
        setImg("none")
        setUpload(false)
    }

    // upload image
    const getImage = (e) => {
        // using preventDefault function for nonreloadeble page
        e.preventDefault();
        // change Redux satate after file upload 
        dispatch(ChangeUplodedImageFilePath(e.target.files[0]));

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])

        reader.onload = () => {
            dispatch(ChangeUplodedImageUrl(reader.result))
            setImg(reader.result)
            setUpload(true)


        }

    }

    return <>
        <div className="imageuploadContainer">
            <div className="imgBox">
                <form encType="multipart/form-data">
                    <input type="file" name="filename" id="fileopenLogo" accept="image/*" multiple onChange={getImage} />
                    <label htmlFor="fileopenLogo" style={{ display: upload ? "none" : "block" }}>  <i class="uil uil-camera-plus"></i></label>
                </form>
                <div className="uploadedImage">
                    <img src={img} style={{ display: upload ? "block" : "none" }} />
                </div>
            </div>
            <div className="removeLogo" style={{ display: upload ? "block" : "none" }}>Remove Logo <i class="uil uil-image-times" onClick={removeImageLogo}></i></div>
        </div>

    </>
}

export default ImageLogo;