class HUD extends Phaser.Scene{
    constructor(){
        super({
            key: 'HUD'
        });
    }

    init() {
        console.log('Escena HUD');
        this.scene.moveAbove('NivelC1','HUD');
    }

    create() {
        // IMAGEN CORAZONES
        this.groupLife = this.add.group({
            key: 'HUD/heart',
            repeat: 2,
            setScale: { x: 0.25, y: 0.25},
            setXY: {
                x: 1450,
                y: 25,
                stepX: 50
            }
        });
        this.groupLife.setAlpha(0);

        //IMAGENES CORAZONES 2
        this.groupLife2 = this.add.group({
            key: 'HUD/heart',
            repeat: 9,
            setScale: { x: 0.25, y: 0.25},
            setXY: {
                x: 1100,
                y: 25,
                stepX: 50
            }
        });
        this.groupLife2.setAlpha(0);

        //NIVEL
        this.nivel ="NivelA4"
        this.musica = ""
        // TEXTO CONTADOR ESTRELLA
        // this.coraTexto = this.add.text(70,30,'0/4',{fontFamily: 'Consolas',color: '#f8f9f9',fontSize: '22px'}).setDepth(1);

        // IMAGEN ESTRELLITA
        // this.star = this.add.image(40, 40, 'coleccionable').setScale(.35).setDepth(10).setTint('0x943126');
       
        // VARIABLES de Estrellas
        // this.data.set('estrellas',0);
        // console.log(this.data.list);
        // TEXTO CONTADOR ESTRELLA
        // this.starTexto = this.add.text(70,30,'0/4',{fontFamily: 'Consolas',color: '#f8f9f9',fontSize: '22px'}).setDepth(1);

        //APARECER DESAPARECER HUD
        this.registry.events.on('apareceHUD', () => {
            this.groupLife.setAlpha(1)
        });
        this.registry.events.on('desapareceHUD', () => {
            this.groupLife.setAlpha(0)
        });

        //APARECER DESAPARECER HUD2
        this.registry.events.on('apareceHUD2', () => {
            // console.log("Entra aparecerCorazones2")
            console.log(this.groupLife2)
            this.groupLife2.setAlpha(1)
        });
        this.registry.events.on('desapareceHUD2', () => {
            this.groupLife2.setAlpha(0)
        });

        //CAMBIO NIVEL Y MUSICA
        this.registry.events.on('cambioNivelB', () => {
            console.log("CAMBIO NIVEL")
            console.log(this.groupLife2)
            this.nivel="NivelB2"
        });
        this.registry.events.on('Musica', (data) => {
            this.musica=data
        });

        //  ESCUCHA EVENTO loseHeart perder una vida
        this.registry.events.on('loseHeart', () => {
            this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();
            console.log(this.groupLife.getChildren().length)
        });
        
        this.registry.events.on('loseHeartB', () => {
            console.log("Entro a loseheartB")
            this.groupLife2.getChildren()[this.groupLife2.getChildren().length - 1].destroy();
            console.log(this.groupLife2.getChildren().length)
        });

        this.registry.events.on('game_over', () => {
            console.log("Entro Game over")
            this.registry.events.removeAllListeners();
            this.scene.start('GameOver', { score: this.nivel, musica: this.musica });
        });

        // Escucha EVENTO getStar obtener una estrella ninja
        this.registry.events.on('getStar', (dato) => {
            this.data.list.estrellas += dato;
            this.starTexto.text = this.data.list.estrellas + '/4';
            console.log(this.data.query('estrellas'));
        });
        
        // Escucha EVENTO de GANAR
        this.registry.events.on('YouWin', () => {
            setTimeout(() => {
                this.scene.pause('HUD');
                console.log("Se pausó escena HUD");          
            }, 1000);
            setTimeout(() => {
                this.scene.resume('HUD');
                console.log("Se reanudó escena HUD");
                this.cora.setAlpha(1);
                this.cora2.setAlpha(1);
                this.cora3.setAlpha(1);
            }, 2000);
            this.data.setValue('vidas', 3);
            this.data.set('estrellas',0);
            this.starTexto.text = this.data.list.estrellas + '/4';

        });


    }
    
    update(time, delta) {
    }
}

export default HUD;