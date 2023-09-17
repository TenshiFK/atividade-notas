import React from "react";
import './../../style.css';
import Sidebar from "../../Components/Sidebar";


export default function Home(){
    
    return(
        <div className="container">
            <Sidebar/>
            <div className="conteudo-principal">
            </div>
        </div>
    );
}
