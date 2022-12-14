class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }
    preload() {
        //PARA MENU
        this.load.path = './assets/';
        this.load.image(['Menu/nube','Menu/fondo2','Menu/play','Menu/logo2','Menu/noobLovers']);
        this.load.audio('pop', ['./pop.mp3']);
        this.load.audio('InicioM', ['./InicioM2.mp3']);
        //PARA NIVEL A
        this.load.audio('nivelAM', ['NivelA/nivelA.mp3']);   
        this.load.image(['NivelA/Eliminar-mirror', 'NivelA/fondo_opc1', 'NivelA/espejo', 'NivelA/espejo2','NivelA/instrucciones1']);
        this.load.atlas('Javier', 'JavierSprite/javier.png', 'JavierSprite/javier.json');
        this.load.atlas('Gata', 'gataSprite/gata.png', 'gataSprite/gata.json');
        //PARA NIVEL A1
        this.load.audio('nivel1M', ['NivelA1/nivel1.mp3']);
        this.load.audio('abejaM', ['NivelA1/abejas.mp3']);
        this.load.atlas('Dog', 'dogSprite/dog.png', 'dogSprite/dog.json');
        this.load.image(['NivelA1/NivelA1', 'NivelA1/banca', 'NivelA1/dogCara','NivelA1/fondoDialogo', 'NivelA1/gataCara','NivelA1/dialogo1_1','NivelA1/dialogo1_2','NivelA1/instrucciones2']);
        //PARA NIVEL A2
        this.load.image(['NivelA2/NivelA2','NivelA2/panal','NivelA2/mesa','NivelA2/dialogo2_1','NivelA2/dialogo2_2']);
        //PARA NIVEL A3
        this.load.image([ 'NivelA3/fondoPuzzle', 'NivelA3/puzzleAtras','NivelA3/1','NivelA3/2','NivelA3/3','NivelA3/4','NivelA3/5','NivelA3/6', 'NivelA3/7', 'NivelA3/8', 'NivelA3/9', 'NivelA3/10', 'NivelA3/11', 'NivelA3/12', 'NivelA3/13', 'NivelA3/14', 'NivelA3/15', 'NivelA3/16','NivelA3/marco','NivelA3/javier','NivelA3/instrucciones']);
        //PARA NIVELA4
        this.load.image([ 'NivelA4/NivelA4', 'NivelA4/panal', 'NivelA4/mesa', 'NivelA4/abeja', 'NivelA4/dialogo4_1', 'NivelA4/dialogo4_2']);
        //PARA NIVELA5
        this.load.image(['NivelA5/nivelA5']);
        this.load.atlas('DogB', 'badDogSprite/pastor.png', 'badDogSprite/pastor.json');
        this.load.image(['NivelA5/nivelA5', 'NivelA5/hidrante', 'NivelA5/hueso', 'NivelA5/tronco', 'NivelA5/dialogo5_1', 'NivelA5/dialogo5_2', 'NivelA5/pastorCara']);
        //PARA NIVEL A6
        this.load.image(['NivelA6/abeja', 'NivelA6/casa', 'NivelA6/gato', 'NivelA6/hidrante', 'NivelA6/huellas', 'NivelA6/hueso', 'NivelA6/javier', 'NivelA6/lentes', 'NivelA6/pastor', 'NivelA6/pelota', 'NivelA6/fondo_memorama', 'NivelA6/back','NivelA6/instrucciones','NivelA6/fondoDialogo','NivelA6/dialogo6_1','NivelA6/pastorCara']);
        this.load.atlas('Dog2', 'NivelA6/dog2.png', 'NivelA6/dog2.json');
        //PARA NIVELA7
        this.load.image(['NivelA7/nivelA7','NivelA7/espejoCallejon','NivelA7/espejoCallejon2','NivelA7/fondoDialogo','NivelA7/dialogo7_1','NivelA7/dialogo7_2','NivelA7/dialogo7_3','NivelA7/dialogo7_4','NivelA7/dialogo7_5']);
        this.load.audio('acierto', ['./pop.mp3']);
        this.load.audio('ganaste', ['./ganaste.mp3']);

        //PARA NIVEL B1
        this.load.audio('nivel2M', ['NivelB1/nivel2.mp3']);
        this.load.image(['NivelB1/NivelB1','NivelB1/monsterAldea','NivelB1/caraMonstruo','NivelB1/caraMonstruoCafe','NivelB1/caraArmadillo',
                        'NivelB1/dialogo1_1','NivelB1/dialogo1_2' ,'NivelB1/dialogo1_3','NivelB1/dialogo1_4','NivelB1/dialogo1_5',
                        'NivelB1/dialogo1_6','NivelB1/dialogo1_7'
                        ]);
        this.load.atlas('Monster', 'monsterSprite/monstruo.png', 'monsterSprite/monstruo.json');
        //PARA NIVEL B2
        this.load.image(['NivelB2/NivelB2','NivelB2/agua','NivelB2/pasto1','NivelB2/pasto2','NivelB2/tronco','NivelB2/boton','NivelB2/boton2','NivelB2/tronco2','NivelB2/flecha','NivelB2/puente']);
        //PARA NIVEL B3
        this.load.image(['NivelB3/NivelB3', 'NivelB3/monstruo', 'NivelB3/mora', 'NivelB3/tronco', 'NivelB3/tuerca', 'NivelB3/monstruo_cara', 'NivelB3/dialogo3_1', 'NivelB3/dialogo3_2', 'NivelB3/dialogo3_3', 'NivelB3/caraMonstruo']);
        //PARA NIVEL B4
        this.load.audio('nivel2DM', ['NivelB4/nivel2_dificil.mp3']);
        this.load.atlas('Randal', 'badMonster/randal.png', 'badMonster/randal.json');
        this.load.atlas('Abi', 'abiSprite/abi.png', 'abiSprite/abi.json');
        this.load.image(['NivelB4/NivelB4', 'NivelB4/boton', 'NivelB4/maquina', 'NivelB4/nube', 'NivelB4/pino', 'NivelB4/tierra', 'NivelB4/tronco', 'NivelB4/tierra2', 'NivelB4/piedra', 'NivelB4/caraEnemigo', 'NivelB4/dialogo4_1', 'NivelB4/dialogo4_2', 'NivelB4/dialogo4_3', 'NivelB4/dialogo4_4', 'NivelB4/dialogo4_5', 'NivelB4/maquina2','NivelB4/caraAbi' ]);
        //PARA NIVEL B5
        this.load.audio('nivel2CM', ['NivelB5/carta.mp3']);
        this.load.image(['NivelB5/NivelB5_2','NivelB5/agua','NivelB5/agua2','NivelB5/pino','NivelB5/tierra','NivelB5/tierra2','NivelB5/reflejoMonstruo','NivelB5/tierra3','NivelB5/fondoDialogo','NivelB5/aleta','NivelB5/dialogo5_1','NivelB5/dialogo5_2','NivelB5/dialogo5_3','NivelB5/dialogo5_4','NivelB5/dialogo5_5','NivelB5/sobre','NivelB5/carta']);

        //PARA NIVEL C1
        this.load.audio('nivelC', ['NivelC1/musicaFondo.mp3']);
        this.load.atlas('Samurai', 'samuraiSprite/samurai.png', 'samuraiSprite/samurai.json');
        this.load.image(['NivelC1/NivelC1','NivelC1/jefe', 'NivelC1/dialogo1_1', 'NivelC1/dialogo1_2', 'NivelC1/dialogo1_3', 'NivelC1/dialogo1_4', 'NivelC1/caraGuardia', 'NivelC1/caraSamurai']);
        //PARA NIVEL C2
        this.load.image(['NivelC2/NivelC2','NivelC2/puerta','NivelC2/ventana','NivelC2/barra','NivelC2/escalar','NivelC2/techo','NivelC2/picos','NivelC2/estrella','NivelC2/techo2','NivelC2/picos2']);
        //PARA NIVEL C3
        this.load.image(['NivelC3/NivelC3']);
        //PARA NIVEL C4
        this.load.image(['NivelC4/NivelC4','NivelC4/barra','NivelC4/muro', 'NivelC4/mascara', 'NivelC4/guardia', 'NivelC4/dialogo4_1', 'NivelC4/dialogo4_2']);
        //PARA NIVEL C5
        this.load.image(['NivelC5/NivelC5', 'NivelC5/ninja']);
        //PARA NIVEL C6
        this.load.image(['NivelC6/NivelC6','NivelC6/palacioEnemigo','NivelC6/puerta']);
        //PARA NIVEL C7
        this.load.image(['NivelC7/NivelC7','NivelC7/escalera','NivelC7/cuerda','NivelC7/escalar','NivelC7/barra','NivelC7/torre1','NivelC7/torre2','NivelC7/torre3','NivelC7/mascara','NivelC7/puerta','NivelC7/picos','NivelC7/picos2','NivelC7/instrucciones']);
        //PARA NIVEL C8
        this.load.image(['NivelC8/NivelC8']);
        //PARA NIVEL C9
        this.load.atlas('Ninja', 'ninjaSprite/ninja.png', 'ninjaSprite/ninja.json');
        this.load.image(['NivelC9/NivelC9','NivelC9/barra','NivelC9/escalar','NivelC9/picos','NivelC9/puerta','NivelC9/estrella']);
        //PARA NIVEL C10
        this.load.image(['NivelC10/NivelC10','NivelC10/escalar','NivelC10/mascara','NivelC10/gong','NivelC10/puerta','NivelC10/reflejo','NivelC10/japones']);
        //PARA NIVEL D
        this.load.image(['NivelD/dialogo1_1','NivelD/dialogo1_2','NivelD/dialogo1_3','NivelD/dialogo1_4','NivelD/dialogo1_5','NivelD/fondoDialogo','NivelD/fondoFinal']);
        //PARA ESCENA GAMEOVER
        this.load.image(['GameOver/gameOverBack','Menu/botonMenu',]);
        this.load.audio('gameOver', ['GameOver/game_over.mp3']);
        //PARA ESCENA YOU WIN
        // this.load.image(['winBack','Menu/botonMenu']);
        // this.load.audio('win', ['./winner.mp3']);
        //PARA ESCENA HUD
        this.load.image(['HUD/heart','HUD/coleccionable'])
        //M??SICA GENERAL
        //this.load.audio('Theme', ['./FALTA MUSICA']);
        //EFECTOS DE SONIDOS GENERAL
        this.load.audio('voltear', ['./pop.mp3']);
        this.load.audio('ganaste', ['./ganaste.mp3']);
    }

    create(){
<<<<<<< HEAD
        this.scene.start('NivelA1', { hud: 1, musica: this.musicaFondoB });
=======
        this.scene.start('NivelC1', { hud: 1, musica: this.musicaFondoB });
>>>>>>> 00d9e0515ed6ec44e4d81c6ca791a557195f8f60
        // this.scene.launch('Menu');
        //console.log(this.scene.manager.scenes)
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Bootloader;