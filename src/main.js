import Win from "./scenes/Win.js";
import GameOver from "./scenes/GameOver.js";
import NivelA from "./scenes/NivelA.js";
import NivelA1 from "./scenes/NivelA1.js";
import Menu from "./scenes/Menu.js";
import Bootloader from "./scenes/Bootloader.js";
import HUD from "./scenes/HUD.js";
import NivelA2 from "./scenes/NivelA2.js";
import NivelA3 from "./scenes/NivelA3.js";
import NivelA6 from "./scenes/NivelA6.js";
import NivelA4 from "./scenes/NivelA4.js";
import NivelA5 from "./scenes/NivelA5.js";
import NivelA7 from "./scenes/NivelA7.js";
//NIVEL B
import NivelB1 from "./scenes/NivelB1.js";
import NivelB2 from "./scenes/NivelB2.js";
import NivelB3 from "./scenes/NivelB3.js";
import NivelB4 from "./scenes/NivelB4.js";
import NivelB5 from "./scenes/NivelB5.js";
//NIVEL C
import NivelC1 from "./scenes/NivelC1.js";
import NivelC2 from "./scenes/NivelC2.js";
import NivelC4 from "./scenes/NivelC4.js";
import NivelC5 from "./scenes/NivelC5.js";
import NivelC6 from "./scenes/NivelC6.js";
import NivelC7 from "./scenes/NivelC7.js";
import NivelC8 from "./scenes/NivelC8.js";
import NivelC9 from "./scenes/NivelC9.js";
import NivelC10 from "./scenes/NivelC10.js";
import NivelD from "./scenes/NivelD.js";


const config = {
    title: "Curso Phaser",		    //Nombre del juego (opcional)
    url: "http://google.es",	    //Dirección de la página del juego (opcional)
    version: "0.0.1",		        //Versión alfanumérica (opcional)
    type: Phaser.AUTO,		        //Tipo de renderizado (WEBGL, CANVAS, AUTO)
                                    // AUTO: busca primero WEBGL y si no está disponible eligirá CANVAS
    width: 1580,			            //Ancho de pantalla del juego
    height: 780, 			        //Alto de pantalla del juego
    parent: "contenedor",		    //Nombre del id del elemento <div> en el index.html
                                    // se refiere a dónde se pondrá el canvas o lienzo
    pixelArt: true,		            //Diseño con pixeles definidos (no borrosos)
    backgroundColor: "black", 	//Color de fondo del canvas ()
    scene: [Bootloader,HUD,
        NivelA, NivelA1,NivelA2, NivelA3,NivelA4,NivelA6,
        NivelA5,NivelA7,NivelB1,NivelB2,NivelB3,NivelB4,NivelB5,
        NivelC1, NivelC2,NivelC4,NivelC5,NivelC6,NivelC7,NivelC8,
        NivelC9,NivelC10,NivelD,GameOver,Win,Menu],    //Aquí irá la lista de scenas del juego
    banner:{
        hidePhaser: true,
        text: "#fff00f",
        background: [
                "#16a085",
                "#2ecc71",
                "#e74c3c", 
                "#000000"]
    },
    physics: {
        default: 'arcade',
        arcade: {
        gravity: {
        y: 800
        },
        //MOVER
        debug: false
        }
        },
        scale: {

            mode: Phaser.Scale.FIT,
    
            autoCenter: Phaser.Scale.CENTER_BOTH,
    
        },
};

const game = new Phaser.Game(config);