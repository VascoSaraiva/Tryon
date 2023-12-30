import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useState, useEffect } from "react";


import { useParams } from "react-router";



import axios from "axios";

import { isCompositeComponent } from "react-dom/test-utils";



export default function About_game_slider() {



    const [allData, setAllData] = useState([]);

    const { id } = useParams();

    const [img, setImg] = useState("");

    const [img1, setImg1] = useState("");

    const [img2, setImg2] = useState("");

    const [img3, setImg3] = useState("");

    const [art, setArt] = useState("");

    const [art1, setArt1] = useState("");



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





    }, []);





    if (img == "") {

        allData.forEach(element => {

            //console.log(element);

            switch (id) {

                case element.name:

                    element.screenshots.forEach(scrn => setImg(oldArray => [...oldArray, <figure key={scrn.id} className="mx-1"><img src={scrn.url.replace("t_thumb", "t_1080p")} alt="" /></figure>]))

                    if (element.artworks == undefined) {

                        setArt("");

                    } else {

                        element.artworks.forEach(artw => setArt(oldArray => [...oldArray, <figure key={artw.id} className="mx-1"><img src={artw.url.replace("t_thumb", "t_1080p")} alt="" /></figure>]))

                    }



            }

        });

    }







    const windowWidth = window.innerWidth

    let valor;



    if (windowWidth < 576) {

        valor = 1;

    }



    if (windowWidth >= 576 && windowWidth < 768) {

        valor = 1

    }



    if (windowWidth >= 768 && windowWidth < 1200) {

        valor = 2

    }



    if (windowWidth >= 1200) {

        valor = 3

    }







    if (img !== "") {

        return (



            <div id="game_slider" className="content">



                <div className="game_info_about_container">

                    <div className="game_info_about row">

                        <article className="col-12 col-xl-4 text-center text-xl-start my-0">

                            <h1>Game Media</h1>

                            <hr className="mx-auto ms-xl-0" />

                        </article>

                    </div>



                </div>



                <div className="container-fluid">

                    <OwlCarousel dotsEach={true} items={valor} className="owl-theme">

                        {img}{art}

                    </OwlCarousel>

                </div>

            </div>



        )



    } else {

        <div className="text-center mx-auto">Loading media...</div>

    }






}