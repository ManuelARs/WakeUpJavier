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
        this.load.image(['nube','fondo2','play','info','conf','logo2','sound','noSound','infoCuadro','noobLovers']);
        this.load.audio('pop', ['./pop.mp3']);
        this.load.audio('InicioM', ['./InicioM2.mp3']);
        //PARA NIVEL A   
        this.load.image(['NivelA/Eliminar-cama', 'NivelA/Eliminar-mirror']);
        this.load.atlas('Javier', 'JavierSprite/javier.png', 'JavierSprite/javier.json');
        //PARA NIVEL A1
        this.load.atlas('Dog', 'dogSprite/dog.png', 'dogSprite/dog.json');
        this.load.image(['tronco','NivelA1/Eliminar-gata', 'NivelA1/Eliminar-pastor']);
        //PARA NIVEL A2
        //PARA NIVEL A3
        this.load.image([ 'NivelA3/fondoPuzzle', 'NivelA3/puzzleAtras','NivelA3/1','NivelA3/2','NivelA3/3','NivelA3/4','NivelA3/5','NivelA3/6', 'NivelA3/7', 'NivelA3/8', 'NivelA3/9', 'NivelA3/10', 'NivelA3/11', 'NivelA3/12', 'NivelA3/13', 'NivelA3/14', 'NivelA3/15', 'NivelA3/16','NivelA3/marco','NivelA3/javier']);
        // this.load.audio('Llorona', ['./Llorona.mp3']);
        this.load.audio('acierto', ['./pop.mp3']);
        this.load.audio('ganaste', ['./ganaste.mp3']);
        //PARA NIVEL A4
        this.load.image([ 'NivelA4/NivelA4']);
        //PARA ESCENA A
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        'escalera', 'ninja','fondo_opc1','coleccionable','end','instrucciones']);
        this.load.audio('gong', ['./gong.mp3']);
        this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA B
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        'escalera', 'ninja','fondo_opc1','coleccionable','end']);
        this.load.audio('gong', ['./gong.mp3']);
        this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA GAMEOVER
        this.load.image(['gameOverBack','botonMenu2']);
        this.load.audio('gameOver', ['./game_over.mp3']);
        //PARA ESCENA YOU WIN
        this.load.image(['winBack','botonMenu']);
        this.load.audio('win', ['./winner.mp3']);
        //PARA ESCENA HUD
        this.load.image(['heart'])
    }

    create(){
        //this.scene.start('Menu');
        this.scene.launch('NivelA4');
        console.log(this.scene.manager.scenes)
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Bootloader;