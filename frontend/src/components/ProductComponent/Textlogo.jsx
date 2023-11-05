import { useState } from "react"
import React from 'react'
import { useDispatch } from "react-redux";
import { changeStateText } from "../../states/TextLogoState/LogoTextSlice";
import { changeTextlogoColor } from "../../states/TextLogoColorState/TextLogoColorSlice";


const TextLogo = () => {
    var dispatch=useDispatch()
    const [color, setColor] = useState("black")
    const [text, setText] = useState("")

    const changeColor = (e) => {
        setColor(e.target.value)
        dispatch(changeTextlogoColor(e.target.value))
    }

    const changeText = (e) => {
        setText(e.target.value)
        dispatch(changeStateText(e.target.value))
       
    }
    const textStyle = {
        color: color
    }
    return <>
        <div className="TextlogoOuterBox">
            <div className="TextBox">
                <p style={textStyle}>{text}</p>
            </div>
            <div className="Textediting">
                <div className="text-input">
                    <h3>input text for your text logo maximum 30 charactor</h3>
                    <input type="text" placeholder="your Text logo name" maxLength={30} onChange={changeText} id="textField" />
                </div>
                <div className="color-input">
                    <h3>choose the color for logo</h3>
                    <input type="color" id="textcolor" onChange={changeColor} />
                </div>

                <div className="instruction">
                    <input type="checkbox" id="conformcheckbox" />
                    <label htmlFor="conformcheckbox">
                        you are agree to conform the logo and yow would to printing
                        this logo on your choosed T-shirt
                    </label>
                </div>

            </div>
        </div>


    </>
}

export default TextLogo;