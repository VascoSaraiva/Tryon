import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img_age_rating from "../imgs/others/restricao_idade.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import age_rating1 from "../imgs/others/ESRB_Teen.png";
import pc_img from "../imgs/icones_plataformas/pc_icon.svg";
import ps_img from "../imgs/icones_plataformas/playstation_icon.svg";
import xbox_img from "../imgs/icones_plataformas/xbox_icon.svg";
import nintendo_img from "../imgs/icones_plataformas/nintendo_icon.svg";
import mobile_img from "../imgs/icones_plataformas/mobile_icon.svg";
import age_rating2 from "../imgs/others/grac_rating.png";

export default function About_game_info() {
    const { id } = useParams();
    const [rating, setRating] = useState("");
    const [gamemodes, setGamemodes] = useState([]);
    const [perspective, setPerspective] = useState("");
    const [themes, setThemes] = useState("");
    const [keywords, setKeywords] = useState("");
    const [keywords1, setKeywords1] = useState("");
    const [keywords2, setKeywords2] = useState("");
    const [ager, setAger] = useState("");

    const [social, setSocial] = useState("");
    const [twitter, setTwitter] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")
    const [website, setWebiste] = useState("")

    const [release, setRelease] = useState("")
    const [platforms, setPlatforms] = useState("");
    const [title, setTitle] = useState("");
    const [nameId, setNameId] = useState("");
    const [ager2, setAger2] = useState("");
    const [similarName, setSimilarName] = useState("");
    const [similarImg, setSimilarImg] = useState("");
    const [allData, setAllData] = useState([]);
    const [genre, setGenre] = useState([])
    const [similar, setSimilar] = useState([])
    const [tudo, setTudo] = useState([]);
    const [genreCheck, setGenreCheck] = useState(false);

    useEffect(() => {
        axios.all([

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields  name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.date,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Forza Horizon 5", "Overwatch 2", "Grand Theft Auto V", "World of Warcraft", "Counter-Strike: Global Offensive", "Ark: Survival Evolved", "PUBG: BATTLEGROUNDS", "League of Legends", "Rainbow Six Extraction", "Hearthstone") & category = 0;'

            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },

                data: 'fields  name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.date,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Dota 2", "Team Fortress 2", "Apex Legends", "Rocket League", "Genshin Impact", "FIFA 23", "VALORANT", "MultiVersus", "NBA 2K23" , "Halo: The Master Chief Collection") & category = 0;'
            }),

            axios({
                url: "/games",
                method: 'POST',
                headers: {
                    'Client-ID': 'ddx2zb827lb6pkmclcez6nyd9phjkh',
                    'Authorization': 'Bearer fprf7c52ogvliebes50jmjxlxg5qwh',
                },
                data: 'fields  name,id,genres.name,platforms.name,game_modes.name,player_perspectives.name,release_dates.date,release_dates.human,themes.name,age_ratings,screenshots.url,artworks.url,keywords.name,websites.category,websites.url,involved_companies.company.name,summary,cover.url,total_rating; where name= ("Super Smash Bros. Ultimate", "Roblox", "Clash of Clans", "Marvel Snap", "Call of Duty: Modern Warfare 2", "Gran Turismo 7", "Splatoon 3", "Gartic Phone", "Fall Guys", "Escape from Tarkov") & category = 0;'
            })
        ])

            .then(axios.spread((data1, data2, data3) => {

                if (allData.length === 0) {

                    data1.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data2.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                    data3.data.forEach(game => { setAllData(oldData => [...oldData, game]) })

                }

            }));
    }, [])

    console.log(allData)

    if (gamemodes == "") {

        allData.forEach(element => {


            switch (id) {
                case element.name:
                    setRating(element.total_rating)

                    //console.log(element)

                    let allDates = []
                    element.release_dates.map(date =>
                        allDates.push(date.date)
                    )

                    element.release_dates.map(date => {
                        if(date.date === Math.min(...allDates)){
                            setRelease(date.human)
                        }
                    })                        

                    if (element.player_perspectives == undefined) {
                        setPerspective("No information to display.")
                    } else {
                        element.player_perspectives.forEach(ppct => setPerspective(oldArray => [...oldArray, <div key={ppct.id}>{ppct.name}</div>]));
                    }
                    if (element.themes == undefined) {
                        setThemes("No information to display.")
                    } else {
                        element.themes.forEach(theme => setThemes(oldArray => [...oldArray, <div key={theme.id}>{theme.name}</div>]));
                    }
                    if (element.keywords == undefined) {
                        setKeywords("No information to display.")
                        setKeywords1("")
                        setKeywords2("")
                    } else {


                        setKeywords(element.keywords[0].name)


                        if (element.keywords[1]) {
                            setKeywords1(element.keywords[1].name)
                        }

                        if (element.keywords[2]) {
                            setKeywords2(element.keywords[2].name)
                        }

                    }
                    if (element.game_modes == undefined) {
                        setGamemodes("No information to display")
                    } else {
                        element.game_modes.forEach(gm => setGamemodes(oldArray => [...oldArray, <div key={gm.id}>{gm.name}</div>]));
                    }

                    setNameId(element.name)

                    element.websites.map(website => {
                        

                        switch (website.category) {
                            case 1:
                                setWebiste(website.url)
                                break;
                            case 4:
                                setFacebook(website.url)
                                break;
                            case 5:
                                setTwitter(website.url)
                                break;
                            case 8:
                                setInstagram(website.url)
                                break;
                            case 9:
                                setYoutube(website.url)
                                break;
                        }
                    })

                    setSocial(element.websites[0].url)
                    setAger(age_rating1);
                    setAger2(age_rating2);

                    console.log(element)

                    if (element.genres == undefined) {
                        setGenre("no info");
                    } else {
                        element.genres.forEach(genre => {
                            setGenre(oldArray => [...oldArray, genre])
                        })
                    }


                    //element.platforms.forEach(plat=> setPlatforms(oldArray=>[...oldArray, <div key={plat.id}>{plat.name}</div>]))

                    let playstation_check = false;
                    let pc_check = false;
                    let xbox_check = false;
                    let nintendo_check = false;
                    let mobile_check = false;
                    let others_check = false;


                    element.platforms.map(plat => {
                        if (plat.name == "PC (Microsoft Windows)" || plat.name == "Mac" || plat.name == "Linux" || plat.name == "Web browser") {
                            if (pc_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><img width={"29px"} src={pc_img} className="cor_pc" /><b> PC</b></li>]);
                                pc_check = true;
                            }
                        }

                        if (plat.name == "PlayStation 4" || plat.name == "PlayStation 5" || plat.name == "PlayStation 3") {
                            if (playstation_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><img width={"29px"} src={ps_img} className="cor_playstation" /><b> Playstation</b>
                                </li>])
                                playstation_check = true;
                            }
                        }

                        if (plat.name == "Xbox One" || plat.name == "Xbox 360" || plat.name == "Xbox Series X|S") {
                            if (xbox_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><img width={"29px"} src={xbox_img} className="cor_xbox" /> <b> Xbox</b></li>])
                                xbox_check = true;
                            }
                        }

                        if (plat.name == "Nintendo Switch") {
                            if (nintendo_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><img width={"29px"} src={nintendo_img} className=" cor_nintendo" /><b> Switch</b></li>
                                ])
                                nintendo_check = true;
                            }
                        }

                        if (plat.name == "Mobile" || plat.name == "Android" || plat.name == "iOS") {
                            if (mobile_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><img width={"29px"} src={mobile_img} className="cor_mobile" /><b> Mobile</b></li>
                                ])
                                mobile_check = true;
                            }
                        }

                        if (plat.name == "Google Stadia") {
                            if (others_check == false) {
                                setPlatforms(oldArray => [...oldArray, <li key={plat.id} className="mx-auto ms-xl-0 w-75"><i className="fa-solid fa-ring ps-1 pe-2"></i><b className="pe-1"> Others</b></li>
                                ])
                                others_check = true;
                            }
                        }
                    })
            }


        })


    }

    const refreshPage = () => {
        window.reload()
    }


    useEffect(() => {

        let arrayJogos = []

        genre.forEach(genero_jogo_pag => {

            allData.forEach(jogo => {

                setGenreCheck(false);

                console.log(jogo.name)
                console.log(jogo.genres)

                jogo.genres.forEach(genero_jogo_lista => {

                    if (jogo.name != id) {
                        if (genero_jogo_pag.name == genero_jogo_lista.name && genreCheck === false && arrayJogos.length < 6) {
                            setGenreCheck(true);

                            let linkJogo = <Link to={`/about_game/${jogo.name}`} style={{width: "fit-content"}} className="text-center text-white text-decoration-none nome_jogo_games" key={jogo.id} onClick={refreshPage}><li style={{width: "fit-content"}}><img className="img-fluid" src={jogo.cover.url.replace("t_thumb", "t_cover_big")} alt="jogo" /><p>{jogo.name}</p></li></Link>

                            let jogoIncluido = false

                            arrayJogos.forEach(jogo => {
                                if (jogo.key == linkJogo.key) {
                                    jogoIncluido = true
                                }
                            })

                            if (jogoIncluido === false) {
                                arrayJogos.push(linkJogo)
                            }


                        }
                    }

                })
            })



        })

        setSimilar(arrayJogos)

    }, [genre])




    //console.log("OLA: "+similarName+similarImg)




    return (
        <section className="game_info_about_container">
            <section className="game_info_about row justify-content-center">

                <article id="game_reviews" className="d-flex justify-content-center justify-content-xl-start col-12 col-lg-4 col-xl-3 text-center text-xl-start">
                    <article className="m-0 p-0">
                        <h1>Game Reviews</h1>
                        <hr className="mx-auto ms-xl-0" />
                        <div className="mx-auto ms-xl-0">
                            <h2>{parseInt(Number(rating))}</h2>
                        </div>
                        <label>Based on users and critics ratings</label>
                    </article>
                </article>

                <div className="col-12 col-xl-9 px-0">
                    <div className="row">

                        <article id="game_modes" className="col-12 col-md-4 col-lg-4 text-center text-xl-start">
                            <h1>Game Modes</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul>
                                <li>{gamemodes}</li>
                            </ul>
                        </article>

                        <article id="game_prespective" className="col-12 col-md-4 col-lg-4 text-center text-xl-start">
                            <h1>Prespective</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul>
                                <li>{perspective}</li>
                            </ul>
                        </article>

                        <article id="game_themes" className="col-12 col-md-4 col-lg-4 text-center text-xl-start">
                            <h1>Themes</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul>
                                <li>{themes}</li>

                            </ul>
                        </article>

                    </div>

                    <div className="row justify-content-center justify-content-xl-start">

                        <article id="game_keywords" className="col-12 col-md-4 col-lg-4 text-center text-xl-start">
                            <h1>Keywords</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul>
                                <li className="mb-0">{keywords}</li>
                                <li className="mb-0">{keywords1}</li>
                                <li className="mb-0">{keywords2}</li>
                            </ul>
                        </article>

                        <article id="game_keywords" className="col-12 col-md-4 col-lg-4 text-center text-xl-start">
                            <h1>Release Date</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul>
                                <li className="mb-0">{release}</li>
                            </ul>
                        </article>

                        <article id="game_social_media" className="col-12 col-md-4 col-xl-4 text-center text-xl-start">
                            <h1>Social Media</h1>
                            <hr className="mx-auto ms-xl-0" />
                            <ul className="justify-content-center justify-content-xl-start">

                                {twitter != "" ? <li>
                                    <a href={twitter} target="_blank" className="fa-stack">
                                        <i className="fa-solid fa-circle fa-stack-2x"></i>
                                        <i className="fa-brands fa-twitter fa-stack-1x fa-inverse"></i>
                                    </a>
                                </li> : ""}
                                
                                {facebook != "" ? <li>
                                    <a href={facebook} target="_blank" className="fa-stack">
                                        <i className="fa-solid fa-circle fa-stack-2x"></i>
                                        <i className="fa-brands fa-facebook fa-stack-1x fa-inverse"></i>
                                    </a>
                                </li> : ""}

                                {instagram != "" ?  <li>
                                    <a href={instagram} target="_blank" className="fa-stack">
                                        <i className="fa-solid fa-circle fa-stack-2x"></i>
                                        <i className="fa-brands fa-instagram fa-stack-1x fa-inverse"></i>
                                    </a>
                                </li> : "" }


                                {youtube != "" ?  <li>
                                    <a href={youtube} target="_blank" className="fa-stack">
                                        <i className="fa-solid fa-circle fa-stack-2x"></i>
                                        <i className="fa-brands fa-youtube fa-stack-1x fa-inverse"></i>
                                    </a>
                                </li> : "" }
                               

                                {website != "" ?  <li>
                                    <a href={website} target="_blank" className="fa-stack">
                                        <i className="fa-solid fa-circle fa-stack-2x"></i>
                                        <i className="fa-solid fa-globe fa-stack-1x fa-inverse"></i>
                                    </a>
                                </li> : ""}
                               
                            
                            </ul>
                        </article>

                    </div>
                </div>

                <div className="row px-0">

                    <article id="game_release" className="col-12 col-md-4 col-xl-3 text-center text-xl-start">
                        <h1>Platforms</h1>
                        <hr className="mx-auto ms-xl-0" />
                        <ul>
                            {platforms}
                        </ul>
                    </article>

                    <article id="game_similiar_games" className="col-12 col-md-8 col-xl-9 text-center text-xl-start">
                        <h1>Similar Games</h1>
                        <hr className="mx-auto ms-xl-0" />
                        <ul className="justify-content-center justify-content-xl-start">
                            {similar}
                            <br />

                        </ul>
                    </article>
                    {

                        // fazer loop para correr jogos - verificar quais tem o mesmo genre - meter no maximo 6



                    }

                </div>

            </section>
        </section>
    )

}