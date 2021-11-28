import React from "react";
import './NotFound.css';
import {Button} from "@mui/material";

function NotFound(){
    const handleHome = (event) => {
        window.location.href = "/";
    };
    return(
        <div id="main">
            <div className="fof">
                <h1>Error 404</h1>
                <div>
                    <Button onClick={handleHome} style={{backgroundColor:"blue", color:"#FFF", padding:10}}>Go Gome</Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;