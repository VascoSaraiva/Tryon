import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Games() {
    const [searchTerm, setSearchTerm] = useState("");
    const [games, setGames] = useState("");
    const [img, setImg] = useState([]);
    const [allData, setAllData] = useState([]);
    const { id } = useParams();


    useEffect(() => { 
        axios.all([

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields name,id,cover.url; where name= ("Forza Horizon 5", "Overwatch 2", "Grand Theft Auto V", "World of Warcraft", "Counter-Strike: Global Offensive", "Ark: Survival Evolved", "PUBG: BATTLEGROUNDS", "League of Legends", "Rainbow Six Extraction", "Hearthstone") & category = 0;'

            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields name,id,cover.url; where name= ("Dota 2", "Team Fortress 2", "Apex Legends", "Rocket League", "Genshin Impact", "FIFA 23", "VALORANT", "MultiVersus", "NBA 2K23" , "Halo: The Master Chief Collection") & category = 0;'
            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },
                data: 'fields name,id,cover.url; where name= ("Super Smash Bros. Ultimate", "Roblox", "Clash of Clans", "Marvel Snap", "Call of Duty: Modern Warfare 2", "Gran Turismo 7", "Splatoon 3", "Gartic Phone", "Fall Guys", "Escape from Tarkov") & category = 0;'
            })
            
        ])

            .then(axios.spread((data1, data2, data3) => {

                if (allData.length === 0) {

                    data1.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data2.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data3.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                }

            }))
           

        AOS.init();
    }, [])




    return (

        <main id="header" className="container-fluid mb-5">

            <header className="header_feed">
                <h1 data-aos="fade-up" data-aos-duration="1000" className="titulo_header">GAMES</h1>
                <p data-aos="fade-up" data-aos-duration="1000" className="texto_header"><span>Find your favourite games</span> to play with other teammates and have <span>fun
                    together.</span></p>
            </header>

            <section className="row justify-content-center mx-auto text-center">
                <div className="App ">
                    <input type="search" id='searchbar1' className="searchbar1 mt-5 mb-3" placeholder="Search your game here..."
                        onInput={event => { setSearchTerm(event.target.value); }} />
                    <button className="botao_searchbar d-none d-md-inline"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </section>

            <section className="row mt-3">
                <div className="col-12 w-100 mb-4 borda_filtros_feed"></div>
            </section>

            <section data-aos="fade-up" data-aos-duration="700" className="container">
                {/* <div className='jogos_estilos'> */}
                <div className="lista_games_search row justify-content-center">

                    {
                        allData.filter((jogo) => {
                            if (searchTerm == "") {
                                return jogo;
                            } else if (jogo.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return jogo;
                            }
                        }).map((jogo, key) => {
                            return (

                                <Link key={jogo.id} to={`/about_game/${jogo.name}`} className="text-decoration-none text-center col-8 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div className="mt-2 mx-3">
                                    <img className="games_jogo img-fluid" src={jogo.cover.url.replace("t_thumb", "t_cover_big")} /><p className="text-white">{jogo.name}</p>
                                </div>
                                </Link>

                            );
                        })}
                </div>
            </section>


        </main>
    )
}