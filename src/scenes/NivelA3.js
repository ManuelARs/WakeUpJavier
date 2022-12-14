class  NivelA3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA3'
        });
    }

    init(data) {
        console.log('Escena NivelA3');
        console.log('init', data);
        this.musicaFondoA = data.score;
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {
        //CONTADORES
        let contador = 0;
        let aciertos = 16;
        
        //TIMER
        let timedEvent;
        
        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA3/fondoPuzzle').setDepth(-2).setScale(.4,.35);
        
        //Imagen de referencia para puzzle
        this.imgReferencia = this.add.image(451, 300, 'NivelA3/puzzleAtras').setScale(.3).setDepth(-1);
        
        //INSTRUCCIONES
        this.instrucciones = this.add.image(460, 610, 'NivelA3/instrucciones').setScale(0.4);

        //PERSONAJES
        //Perro Javier
        this.dog = this.add.sprite(1500, 630, 'Dog', 0).setScale(0.2);
        this.dog.flipX = true;
        
        //ANIMACIONES
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
        this.dog.anims.play('dogIdle',true);
        
        //MÚSICA ACIERTO
        this.acierto = this.sound.add('acierto', { loop: false, volume: 0.8 });
        
        //MÚSICA GANASTE
        this.ganasteAudio = this.sound.add('ganaste', { loop: false, volume: 1 });
        
        //Piezas de rompecabezas
        this.pieza1 = this.add.image(1320, 365, 'NivelA3/1').setInteractive().setScale(.2).setName("1");
        this.input.setDraggable(this.pieza1);
        this.pieza2 = this.add.image(1000, 495, 'NivelA3/2').setInteractive().setScale(.2).setName("2");
        this.input.setDraggable(this.pieza2);
        this.pieza3 = this.add.image(1160, 105, 'NivelA3/3').setInteractive().setScale(.2).setName("3");
        this.input.setDraggable(this.pieza3);
        this.pieza4 = this.add.image(1320, 495, 'NivelA3/4').setInteractive().setScale(.2).setName("4");
        this.input.setDraggable(this.pieza4);
        this.pieza5 = this.add.image(1480, 105, 'NivelA3/5').setInteractive().setScale(.2).setName("5");
        this.input.setDraggable(this.pieza5);
        this.pieza6 = this.add.image(1000, 235, 'NivelA3/6').setInteractive().setScale(.2).setName("6");
        this.input.setDraggable(this.pieza6);
        this.pieza7 = this.add.image(1480, 235, 'NivelA3/7').setInteractive().setScale(.2).setName("7");
        this.input.setDraggable(this.pieza7);
        this.pieza8 = this.add.image(1320, 105, 'NivelA3/8').setInteractive().setScale(.2).setName("8");
        this.input.setDraggable(this.pieza8);
        this.pieza9 = this.add.image(1160, 365, 'NivelA3/9').setInteractive().setScale(.2).setName("9");
        this.input.setDraggable(this.pieza9);
        this.pieza10 = this.add.image(1160, 235, 'NivelA3/10').setInteractive().setScale(.2).setName("10");
        this.input.setDraggable(this.pieza10);
        this.pieza11 = this.add.image(1480, 365, 'NivelA3/11').setInteractive().setScale(.2).setName("11");
        this.input.setDraggable(this.pieza11);
        this.pieza12 = this.add.image(1000, 105, 'NivelA3/12').setInteractive().setScale(.2).setName("12");
        this.input.setDraggable(this.pieza12);
        this.pieza13 = this.add.image(1000, 365, 'NivelA3/13').setInteractive().setScale(.2).setName("13");
        this.input.setDraggable(this.pieza13);
        this.pieza14 = this.add.image(1160, 495, 'NivelA3/14').setInteractive().setScale(.2).setName("14");
        this.input.setDraggable(this.pieza14);
        this.pieza15 = this.add.image(1480, 495, 'NivelA3/15').setInteractive().setScale(.2).setName("15");
        this.input.setDraggable(this.pieza15);
        this.pieza16 = this.add.image(1320, 235, 'NivelA3/16').setInteractive().setScale(.2).setName("16");
        this.input.setDraggable(this.pieza16);
        
        //Arreglo de piezas
        this.arregloPzas = [this.pieza1,this.pieza2,this.pieza3,this.pieza4,this.pieza5,this.pieza6,this.pieza7,this.pieza8,this.pieza9,this.pieza10,this.pieza11,this.pieza12,this.pieza13,this.pieza14, this.pieza15,this.pieza16];
        this.posiciones = [[1320, 365],[1000, 495],[1160, 105],[1320, 495],[1480, 105],[1000, 235],[1480, 235],[1320, 105],[1160, 365],[1160, 235],[1480, 365],[1000, 105],[1000, 365],[1160, 495],[1480, 495],[1320, 235]];
        
        //Acomodar piezas de rompecabezas aleatoriamente
        for (let pza of this.arregloPzas){
            let random = Math.floor(Math.random() * this.posiciones.length);
            pza.x = this.posiciones[random][0];
            pza.y = this.posiciones[random][1];
            this.posiciones.splice(random,1);
        }
        
        //Fila 1
        this.drop1 = this.add.image(157, 105, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("1").input.dropZone = true;
        this.drop2 = this.add.image(353, 105, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("2").input.dropZone = true;
        this.drop3 = this.add.image(549, 105, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("3").input.dropZone = true;
        this.drop4 = this.add.image(745, 105, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("4").input.dropZone = true;
       
        //Fila 2
        this.drop5 = this.add.image(157, 235, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("5").input.dropZone = true;
        this.drop6 = this.add.image(353, 235, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("6").input.dropZone = true;
        this.drop7 = this.add.image(549, 235, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("7").input.dropZone = true;
        this.drop8 = this.add.image(745, 235, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("8").input.dropZone = true;
        
        //Fila 3
        this.drop9 = this.add.image(157, 365, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("9").input.dropZone = true;
        this.drop10 = this.add.image(353, 365, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("10").input.dropZone = true;
        this.drop11 = this.add.image(549, 365, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("11").input.dropZone = true;
        this.drop12 = this.add.image(745, 365, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("12").input.dropZone = true;
        
        //Fila 4
        this.drop13 = this.add.image(157, 495, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("13").input.dropZone = true;
        this.drop14 = this.add.image(353, 495, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("14").input.dropZone = true;
        this.drop15 = this.add.image(549, 495, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("15").input.dropZone = true;
        this.drop16 = this.add.image(745, 495, 'NivelA3/marco').setDepth(-1).setInteractive().setScale(.3).setName("16").input.dropZone = true;
        
        //Programación de eventos principales
        const eventos = Phaser.Input.Events;
        
        //Evento para inicializar el arrastre
        this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => {
            obj.setScale(0.3);
        });
        
        //Evento que hace que el objeto se mueva con el puntero
        this.input.on(eventos.DRAG, (pointer, obj, dragX, dragY) => {
            obj.setDepth(3);
            obj.x = dragX;
            obj.y = dragY;
        });
        
        //Evento que controla el final del arrastre
        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {
            if (!dropzone) { //Cuando no sea dropeable
                obj.x = obj.input.dragStartX;//Arrastre de un game-object sobre una zona "dropeable"
                obj.y = obj.input.dragStartY;
                obj.setScale(.2);
            }
            else{
                obj.setScale(.3);
            }
        });
        
        //Personalización de eventos de la zona "dropeable"
        this.input.on(eventos.DRAG_ENTER, (pointer, obj, dropzone) => {
            dropzone.setTint(0x3339FF);
        });
        this.input.on(eventos.DRAG_LEAVE, (pointer, obj, dropzone) => {
            dropzone.clearTint();
        });
        
        //FUNCIÓN QUE CAMBIA PANTALLA DE GANADOR
        let showGanaste = () => {
            this.scene.start('NivelA4',{ musica: this.musicaFondoA });
        };
        
        //Evento DROP
        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            obj.setDepth(2);
            obj.x = dropzone.x;
            obj.y = dropzone.y;
             //Se verifica que el lugar sea el correspondiente a la pieza
            if (dropzone.name == obj.name) {
                obj.setDepth(1);
                obj.input.draggable = false;
                dropzone.input.dropZone = false;
                this.acierto.play();
                contador = contador + 1;
                //VERIFICAR SI EL JUGADOR GANÓ
                if (contador == aciertos) {
                    // movimientos.push(contmov);
                    this.ganasteAudio.play();
                    timedEvent = this.time.delayedCall(1000, showGanaste, [], this);
                }
            }
        });

    }

    update(time, delta) {
    }
}

export default NivelA3;