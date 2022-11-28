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
        this.load.image(['Menu/nube','Menu/fondo2','Menu/play','Menu/info','Menu/conf','Menu/logo2','Menu/sound','Menu/noSound','Menu/infoCuadro','Menu/noobLovers']);
        this.load.audio('pop', ['./pop.mp3']);
        this.load.audio('InicioM', ['./InicioM2.mp3']);
        //PARA NIVEL A   
        this.load.image(['NivelA/Eliminar-cama', 'NivelA/Eliminar-mirror', 'NivelA/fondo_opc1', 'NivelA/espejo', 'NivelA/espejo2']);
        this.load.atlas('Javier', 'JavierSprite/javier.png', 'JavierSprite/javier.json');
        //PARA NIVEL A1
        this.load.atlas('Dog', 'dogSprite/dog.png', 'dogSprite/dog.json');
        this.load.image(['NivelA1/Eliminar-gata', 'NivelA1/Eliminar-pastor','NivelA1/NivelA1', 'NivelA1/banca', 'NivelA1/dogCara','NivelA1/fondoDialogo', 'NivelA1/gataCara','NivelA1/dialogo1_1','NivelA1/dialogo1_2','NivelA1/instrucciones2']);
        //PARA NIVEL A2
        this.load.image(['NivelA2/NivelA2','NivelA2/panal','NivelA2/mesa']);
        //PARA NIVEL A3
        this.load.image([ 'NivelA3/fondoPuzzle', 'NivelA3/puzzleAtras','NivelA3/1','NivelA3/2','NivelA3/3','NivelA3/4','NivelA3/5','NivelA3/6', 'NivelA3/7', 'NivelA3/8', 'NivelA3/9', 'NivelA3/10', 'NivelA3/11', 'NivelA3/12', 'NivelA3/13', 'NivelA3/14', 'NivelA3/15', 'NivelA3/16','NivelA3/marco','NivelA3/javier']);
        //PARA NIVELA5
        this.load.image(['NivelA5/nivelA5']);
        //PARA NIVELA7
        this.load.image(['NivelA7/nivelA7','NivelA7/espejoCallejon','NivelA7/espejoCallejon2']);
        // this.load.audio('Llorona', ['./Llorona.mp3']);
        this.load.audio('acierto', ['./pop.mp3']);
        this.load.audio('ganaste', ['./ganaste.mp3']);
        //PARA NIVELA4
        this.load.image([ 'NivelA4/NivelA4', 'NivelA4/panal', 'NivelA4/panalCaido', 'NivelA4/mesa', 'NivelA4/abeja']);
        //PARA NIVEL A6
        this.load.image(['NivelA6/abeja', 'NivelA6/casa', 'NivelA6/gato', 'NivelA6/hidrante', 'NivelA6/huellas', 'NivelA6/hueso', 'NivelA6/javier', 'NivelA6/lentes', 'NivelA6/pastor', 'NivelA6/pelota', 'NivelA6/fondo_memorama', 'NivelA6/back']);
        //this.load.audio('Theme', ['./FALTA MUSICA']);
        this.load.audio('voltear', ['./pop.mp3']);
        this.load.audio('ganaste', ['./ganaste.mp3']);
        //PARA ESCENA A
        // this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        // 'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        // 'escalera', 'ninja','fondo_opc1','coleccionable','end','instrucciones']);
        // this.load.audio('gong', ['./gong.mp3']);
        // this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA B
        // this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        // 'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        // 'escalera', 'ninja','fondo_opc1','coleccionable','end']);
        // this.load.audio('gong', ['./gong.mp3']);
        // this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA GAMEOVER
        // this.load.image(['gameOverBack','Menu/botonMenu2']);
        // this.load.audio('gameOver', ['./game_over.mp3']);
        //PARA ESCENA YOU WIN
        // this.load.image(['winBack','Menu/botonMenu']);
        // this.load.audio('win', ['./winner.mp3']);
        //PARA ESCENA HUD
        this.load.image(['SceneASceneB/heart'])
    }

    create(){
        // this.scene.start('NivelA1');
        this.scene.launch('NivelA2');
        //console.log(this.scene.manager.scenes)
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Bootloader;