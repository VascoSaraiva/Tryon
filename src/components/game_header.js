import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import header_game from "../imgs/headers/fundo_games.png"
import loading from '../imgs/others/loading-img.svg'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

export default function Game_header() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [developer, setDeveloper] = useState("");
    const [description, setDescription] = useState("");
    const [verifiedDscription, setVerifiedDscription] = useState("");
    const [genre, setGenre] = useState("");
    const [platforms, setPlatforms] = useState("");
    const [img, setImg] = useState("");
    const [bg, setBG] = useState();
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        axios.all([

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Forza Horizon 5", "Overwatch 2", "Grand Theft Auto V", "World of Warcraft", "Counter-Strike: Global Offensive", "Ark: Survival Evolved", "PUBG: BATTLEGROUNDS", "League of Legends", "Rainbow Six Extraction", "Hearthstone") & category = 0;'

            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Dota 2", "Team Fortress 2", "Apex Legends", "Rocket League", "Genshin Impact", "FIFA 23", "VALORANT", "MultiVersus", "NBA 2K23" , "Halo: The Master Chief Collection") & category = 0;'
            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },
                data: 'fields name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Super Smash Bros. Ultimate", "Roblox", "Clash of Clans", "Marvel Snap", "Call of Duty: Modern Warfare 2", "Gran Turismo 7", "Splatoon 3", "Gartic Phone", "Fall Guys", "Escape from Tarkov") & category = 0;'
            })
        ])
            .then(axios.spread((data1, data2, data3) => {

                if (allData.length === 0) {

                    data1.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data2.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data3.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                }

            }))


    }, [])


    if (description == "") {

        allData.forEach(element => {
            switch (id) {
                case element.name:
                    setTitle(element.name)
                    //console.log(element.name)
                    setDeveloper(element.involved_companies[0].name)
                    setDescription(element.summary)
                    

                    
                    if(window.innerWidth < 728){
                        if(element.summary.split(' ').length >= 70){
                            let shortDescription = element.summary.split(' ').slice(0,70).join(' ') + "..."
                            setDescription(shortDescription)
                        }
                    }

                    

                    element.genres.forEach(genr => setGenre(oldArray => [...oldArray, <a key={genr.id}>{genr.name}</a>, "  |  "]))
                    setImg(element.cover.url.replace("t_thumb", "t_cover_big"))


                    if (element.platforms == undefined) {
                        setPlatforms("No information to display.")
                    } else {
                        element.platforms.forEach(plat => setPlatforms(oldArray => [...oldArray, plat.name, "  |  "]))
                    }
                    if (element.screenshots == undefined) {
                        setBG(header_game)
                    } else {
                        setBG(element.screenshots[0].url.replace("t_thumb", "t_1080p"))
                    }
            }
        })

       

    }
        
        
        

       
        
    

   


    if (img === "") {
        return (
            <header className="header_game d-flex justify-content-center align-items-center">
            <img style={{ padding: '4rem' }} src={loading} alt="Capa Jogo" />
            </header>
        )
    } else {
        return (
            <header className="header_game">


                <div className="background_jogo_header" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 115%), url(${bg})` }}></div>

                <div className="conteudo_jogo_header row align-items-center justify-content-center">
                    <figure className="col-12 col-lg-5 capa_jogo_header text-lg-end">
                        <img className="imagem_capa_jogo_header" src={img} alt="Capa Jogo" />

                    </figure>
                    <article className="col-12 col-lg-7">

                    <h1 className="titulo_jogo_header my-2 text-center text-lg-start mt-lg-0">{title}</h1>
                    <h2 className="subtitulo_jogo_header text-center text-lg-start">{developer}</h2>

                        <p className="texto_jogo_header mx-0">{description}</p>
                        <div className="texto_jogo_header"><span>Genre</span>: {genre}</div>
                        <div className="texto_jogo_header"><span>Platforms</span>: {platforms}
                        </div>

                        <Link style={{width: "fit-content"}} className="btn btn-primary mt-4 d-block mx-auto mx-lg-0" to={`/feed_game/${id}`}>Find Players</Link>
                    </article>

                </div>

            </header>
        )
    }



}

