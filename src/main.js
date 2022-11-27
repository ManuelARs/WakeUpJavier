import Win from "./scenes/Win.js";
import GameOver from "./scenes/GameOver.js";
import NivelA from "./scenes/NivelA.js";
import NivelA1 from "./scenes/NivelA1.js";
import SceneA from "./scenes/SceneA.js";
import SceneB from "./scenes/SceneB.js";
import Menu from "./scenes/Menu.js";
import Bootloader from "./scenes/Bootloader.js";
import HUD from "./scenes/HUD.js";
import NivelA3 from "./scenes/NivelA3.js";

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
    backgroundColor: "#34495e", 	//Color de fondo del canvas ()
    scene: [Bootloader,Menu,
        NivelA, NivelA1,NivelA3,
        SceneA,SceneB,HUD,GameOver,Win],    //Aquí irá la lista de scenas del juego
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
        debug: true
        }
        },
        scale: {

            mode: Phaser.Scale.FIT,
    
            autoCenter: Phaser.Scale.CENTER_BOTH,
    
        },
};

const game = new Phaser.Game(config);