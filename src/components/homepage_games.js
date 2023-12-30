import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Homepage_games() {
    
    useEffect(() => {
        AOS.init();
      }, [])


    
    const [jogo_0, setJogo0] = useState("");
    const [jogo_1, setJogo1] = useState("");
    const [jogo_2, setJogo2] = useState("");
    const [jogo_3, setJogo3] = useState("");
    const [jogo_4, setJogo4] = useState("");
    const [jogo_0Img, setJogo0Img] = useState("");
    const [jogo_1Img, setJogo1Img] = useState("");
    const [jogo_2Img, setJogo2Img] = useState("");
    const [jogo_3Img, setJogo3Img] = useState("");
    const [jogo_4Img, setJogo4Img] = useState("");
   
    useEffect(()=>{
       axios({
       url: "/games",
       method: 'POST',
       headers: {
           'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
           'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
       },
       data: 'fields name,cover.url; where name= ("FIFA 23", "Overwatch 2", "Apex Legends", "Grand Theft Auto V", "League of Legends") & category = 0;'
     })
       .then(response => {
           setJogo0(response.data[0]);
           setJogo1(response.data[1]);
           setJogo2(response.data[2]);
           setJogo3(response.data[3]);
           setJogo4(response.data[4]);
           setJogo0Img(response.data[0].cover.url.replace("t_thumb", "t_cover_big"))
            setJogo1Img(response.data[1].cover.url.replace("t_thumb", "t_cover_big"))
            setJogo2Img(response.data[2].cover.url.replace("t_thumb", "t_cover_big"))
            setJogo3Img(response.data[3].cover.url.replace("t_thumb", "t_cover_big"))
            setJogo4Img(response.data[4].cover.url.replace("t_thumb", "t_cover_big"))
           
       })
       .catch(err => {
           console.error(err);
       });
    }, [])

    
    return (
        
        <section className="jogos_homepage"  data-aos="fade-up" data-aos-duration="1000">

            <div className="background_jogos_homepage"></div>

            <div className="content_jogos_homepage">
                <h1>Explore Games</h1>

                <div className="listagem_jogos_homepage row justify-content-center pb-5">
                    
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0"> 
                        <Link className="text-white text-decoration-none" to={`/about_game/${jogo_0.name}`}><img className="capa_jogo" src={jogo_0Img} alt="Jogo" /><p>{jogo_0.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0"> 
                        <Link className="text-white text-decoration-none" to={`/about_game/${jogo_1.name}`}><img className="capa_jogo" src={jogo_1Img} alt="Jogo" /><p>{jogo_1.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0"> 
                        <Link className="text-white text-decoration-none" to={`/about_game/${jogo_2.name}`}><img className="capa_jogo" src={jogo_2Img} alt="Jogo" /><p>{jogo_2.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0"> 
                        <Link className="text-white text-decoration-none" to={`/about_game/${jogo_3.name}`}><img className="capa_jogo" src={jogo_3Img} alt="Jogo" /><p>{jogo_3.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0"> 
                        <Link className="text-white text-decoration-none" to={`/about_game/${jogo_4.name}`}><img className="capa_jogo" src={jogo_4Img} alt="Jogo" /><p>{jogo_4.name}</p></Link>
                    </figure>
                    
                   


                </div>

                <Link to='/game_list'><button className="btn btn-primary">See more</button></Link>

            </div>


        </section>

    )
}