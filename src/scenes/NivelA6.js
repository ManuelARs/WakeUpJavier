//NIVEL MEMORAMA
class NivelA6 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA6'
        });
    }

    init() {
        console.log('Escena NivelA6');
    }
    
    preload() {
        this.load.path = './assets/';
    }
    create() {
        //CONTADORES
        let contador = 0;
        this.aciertos = 9;
        //BANDERAS
        this.ganasteB=false;
        //TEMPORIZADOR
        this.tiempoRestante = 95
        this.timer
        //TIMER
        this.timedEvent;
        //FONDO
        this.fondo = this.add.image(800,400, "NivelA6/fondo_memorama").setScale(0.37,0.32);
        //TEXTO PUNTAJE
        this.text = this.add.text(700,12,'',{fontFamily: 'Consolas',color: 'black',fontSize: '30px'}).setDepth(10);
        //INSTRUCCIONES
        this.instrucciones = this.add.image(300, 310, 'NivelA6/instrucciones').setScale(0.4);
        //PERSONAJES
        //Perro Javier
        this.dog = this.add.sprite(200, 650, 'Dog', 0).setScale(0.2);
        //ANIMACIONES
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
        this.dog.anims.play('dogIdle',true);

        // this.timedEvent = this.time.delayedCall(1000, reiniciar, [], this, loop:true);
        this.timedEvent2 = this.time.addEvent({ delay: 1000, callback: reiniciar, callbackScope: this, loop: true });
        function reiniciar() {
            this.tiempoRestante -= 1
            this.textoContador.setText('TIEMPO RESTANTE: ' + this.tiempoRestante);
        }
        this.textoContador = this.add.text(1120, 12, 'TIEMPO RESTANTE: ',{fontFamily: 'Consolas',color: 'black',fontSize: '30px'}).setDepth(10);;
        //CONSTANTE 
        const eventos = Phaser.Input.Events;
        //MÚSICA DE FONDO
        // this.music = this.sound.add('Theme', {loop: true, volume: 0.08});
        // this.music.play();
        //MÚSICA VOLTEAR TARJETA
        this.voltear = this.sound.add('voltear', {loop:false,volume: 0.3}); 
        //MÚSICA PASAR SOBRE TARJETA
        //this.pasar = this.sound.add('pasar', {loop:false,volume: 0.3});
        //MÚSICA GANAR
        this.ganar = this.sound.add('ganaste', {loop:false,volume: 0.3});
        //ARREGLO QUE GUARDA TARJETAS DESCUBIERTAS
        let cardsInGame = [];
        //TARJETAS DE MEMORAMA
        this.abeja = this.add.image(875, 600, "NivelA6/abeja").setInteractive();
        this.casa = this.add.image(375, 150, "NivelA6/casa").setInteractive();
        this.gato = this.add.image(625, 150, "NivelA6/gato").setInteractive();
        this.hidrante = this.add.image(875, 150, "NivelA6/hidrante").setInteractive();
        this.huellas = this.add.image(1125, 150, "NivelA6/huellas").setInteractive();
        this.hueso = this.add.image(125, 375, "NivelA6/hueso").setInteractive();
        this.javier = this.add.image(375, 375, "NivelA6/javier").setInteractive();
        this.lentes = this.add.image(625, 375, "NivelA6/lentes").setInteractive();
        this.pastor = this.add.image(875, 375, "NivelA6/pastor").setInteractive();
        this.pelota = this.add.image(125, 600, "NivelA6/pelota").setInteractive();
        this.abeja2 = this.add.image(375, 825, "NivelA6/abeja").setInteractive();
        this.casa2 = this.add.image(625, 600, "NivelA6/casa").setInteractive();
        this.gato2 = this.add.image(875, 825, "NivelA6/gato").setInteractive();
        this.hidrante2 = this.add.image(125, 150, "NivelA6/hidrante").setInteractive();
        this.huellas2 = this.add.image(1125, 825, "NivelA6/huellas").setInteractive();
        this.hueso2 = this.add.image(1125, 375, "NivelA6/hueso").setInteractive();
        this.javier2 = this.add.image(125, 825, "NivelA6/javier").setInteractive();
        this.lentes2 = this.add.image(375, 600, "NivelA6/lentes").setInteractive();
        this.pastor2 = this.add.image(625, 825, "NivelA6/pastor").setInteractive();
        this.pelota2 = this.add.image(1125, 600, "NivelA6/pelota").setInteractive();
        //LOGICA PARA TARJETAS RANDOM
        let cards = [this.abeja, this.casa, this.gato, this.hidrante, this.huellas, this.hueso, this.javier, this.lentes, this.pastor, this.pelota, this.abeja2, this.casa2, this.gato2, this.hidrante2, this.huellas2, this.hueso2, this.javier2, this.lentes2, this.pastor2, this.pelota2];
        let pares = [[1260, 480], [860, 130], [1060, 130], [1260, 130], [1460,130], [660, 300], [860, 300], [1060, 300], [1260, 300], [660, 480], [860, 650], [1060, 480], [1260, 650], [660, 130], [1460, 650], [1460, 300], [660, 650], [860, 480], [1060, 650], [1460, 480]]
       
        //CUBIERTAS DE TARJETAS
        this.backAbeja = this.add.image(875, 600, "NivelA6/back").setInteractive();
        this.backCasa = this.add.image(375, 150, "NivelA6/back").setInteractive();
        this.backGato = this.add.image(625, 150, "NivelA6/back").setInteractive();
        this.backHidrante = this.add.image(875, 150, "NivelA6/back").setInteractive();
        this.backHuellas = this.add.image(1125, 150, "NivelA6/back").setInteractive();
        this.backHueso = this.add.image(125, 375, "NivelA6/back").setInteractive();
        this.backJavier = this.add.image(375, 375, "NivelA6/back").setInteractive();
        this.backLentes = this.add.image(625, 375, "NivelA6/back").setInteractive();
        this.backPastor = this.add.image(875, 375, "NivelA6/back").setInteractive();
        this.backPelota = this.add.image(125, 600, "NivelA6/back").setInteractive();
        this.backAbeja2 = this.add.image(375, 825, "NivelA6/back").setInteractive();
        this.backCasa2 = this.add.image(625, 600, "NivelA6/back").setInteractive();
        this.backGato2 = this.add.image(875, 825, "NivelA6/back").setInteractive();
        this.backHidrante2 = this.add.image(125, 150, "NivelA6/back").setInteractive();
        this.backHuellas2 = this.add.image(1125, 825, "NivelA6/back").setInteractive();
        this.backHueso2 = this.add.image(1125, 375, "NivelA6/back").setInteractive();
        this.backJavier2 = this.add.image(125, 825, "NivelA6/back").setInteractive();
        this.backLentes2 = this.add.image(375, 600, "NivelA6/back").setInteractive();
        this.backPastor2 = this.add.image(625, 825, "NivelA6/back").setInteractive();
        this.backPelota2 = this.add.image(1125, 600, "NivelA6/back").setInteractive();
        this.backAbeja.name = "NivelA6/abeja";
        this.backCasa.name = "NivelA6/casa";
        this.backGato.name = "NivelA6/gato";
        this.backHidrante.name = "NivelA6/hidrante";
        this.backHuellas.name = "NivelA6/huellas";
        this.backHueso.name = "NivelA6/hueso";
        this.backJavier.name = "NivelA6/javier";
        this.backLentes.name = "NivelA6/lentes";
        this.backPastor.name = "NivelA6/pastor";
        this.backPelota.name = "NivelA6/pelota";
        this.backAbeja2.name = "NivelA6/abeja";
        this.backCasa2.name = "NivelA6/casa";
        this.backGato2.name = "NivelA6/gato";
        this.backHidrante2.name = "NivelA6/hidrante";
        this.backHuellas2.name = "NivelA6/huellas";
        this.backHueso2.name = "NivelA6/hueso";
        this.backJavier2.name = "NivelA6/javier";
        this.backLentes2.name = "NivelA6/lentes";
        this.backPastor2.name = "NivelA6/pastor";
        this.backPelota2.name = "NivelA6/pelota";
        // //IMAGEN DE GANADOR
        // this.ganaste = this.add.image(650, 400, "ganaste").setInteractive() 
        // .setOrigin(0.5,0.5).setAlpha(0); 
        
        //ARREGLO QUE GUARDA LAS CUBIERTAS DE TARJETAS
        let cardsBack = [this.backAbeja, this.backCasa, this.backGato, this.backHidrante, this.backHuellas, this.backHueso, this.backJavier, this.backLentes, this.backPastor, this.backPelota, this.backAbeja2, this.backCasa2, this.backGato2, this.backHidrante2, this.backHuellas2, this.backHueso2, this.backJavier2, this.backLentes2, this.backPastor2, this.backPelota2];
        //SE REALIZA EL RANDOM DE LAS CARTAS CON LA PARTE TRASERA Y DELANTERA
        for (let i = 0; i < cards.length; i++) {
            let random = Math.floor(Math.random() * pares.length);
            cards[i].x = pares[random][0]
            cards[i].y = pares[random][1]
            cardsBack[i].x = pares[random][0]
            cardsBack[i].y = pares[random][1]
            pares.splice(random,1)
        }
        //FUNCIÓN QUE MODIFICA EL TAMAÑO Y ORIGEN DE LAS CUBIERTAS
        for (let card of cardsBack){
            card.setDisplaySize(150,150);
            card.setOrigin(0.5,0.5);
        }

        //FUNCIÓN QUE MODIFICA EL TAMAÑO Y ORIGEN DE LAS CARTAS
        for (let card1 of cards){
            card1.setDisplaySize(150,150);
            card1.setOrigin(0.5,0.5);
        }

        //EVENTO PARA GIRAR TARJETAS
        this.input.on(eventos.GAMEOBJECT_DOWN,(event,gameObject)=>{
            if(cardsBack.includes(gameObject)){
                contador += 1;
                cardsInGame.push(gameObject);
                if(contador <= 2){
                    gameObject.setAlpha(0);
                    if(contador == 2){
                        this.timedEvent = this.time.delayedCall(1000, verificarMatch, [], this);
                        //verificarMatch();
                    }        
                }
                this.voltear.play();
            }
        });       
        //EVENTO PARA MANEJAR EFECTO AL PASAR SOBRE LAS TARJETAS
        this.input.on(eventos.GAMEOBJECT_OVER,(event,gameObject)=>{
            if(cardsBack.includes(gameObject)){
                gameObject.setDisplaySize(170,170);
                //gameObject.setScale(.22);
            }
        });
        //EVENTO PARA MANEJAR EFECTO AL SALIR LAS TARJETAS
        this.input.on(eventos.GAMEOBJECT_OUT,(event,gameObject)=>{
            if(cardsBack.includes(gameObject)){
                gameObject.setDisplaySize(150,150);
            }
        });

        //FUNCIÓN PARA VERIFICAR MATCH
        let verificarMatch = function(){
            if (cardsInGame[0].name == cardsInGame[1].name) {
                //console.log('match')
                this.aciertos += 1;
                for (let i = 0; i < cardsBack.length; i++) {
                    if (cardsBack[i] == cardsInGame[0]) {
                        cardsBack.splice(i, 1)
                    }
                }
                for (let i = 0; i < cardsBack.length; i++) {
                    if (cardsBack[i] == cardsInGame[1]) {
                        cardsBack.splice(i, 1)
                        //console.log("soy tarjetas ->", cardsBack)
                    }
                }                
                for (let card of cardsBack) {
                    card.setAlpha(1)
                    contador = 0
                }
                cardsInGame = []
            }
            else {
                //console.log(cardsInGame[0].name, cardsInGame[1].name)
                for (let card of cardsBack) {
                    card.setAlpha(1)
                    contador = 0
                    //console.log("no match")
                }
                cardsInGame = []
            }
        };
        //TEXTO DE PUNTUACIÓN
        this.puntaje = function(){
            this.text.text =
                `ACIERTOS:${this.aciertos}`;
        }
    }

    update(time, delta) {
        this.puntaje();
        if(this.aciertos == 10 && this.ganasteB == false){
            this.ganasteB = true;
            //this.fondo.setDepth(5);
            //this.music.stop();
            //this.ganaste.setAlpha(1).setDepth(6);
            //this.tiempoRestante
            this.ganar.play();
            setTimeout(() => {
                this.scene.start('NivelA7');
            }, 2000);
            
        }
        if(this.tiempoRestante == 0) {
            this.scene.restart();
        }
    }
}

export default NivelA6;