class NivelB2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB2'
        });
    }

    init(data) {
        console.log('Escena NivelB2');
        console.log('init', data);
        this.hud2 = data.hud;
        this.musicaFondoB = data.musica;
        if(this.hud2==1)
        {
            this.musicaFondoB = this.sound.add('nivel2M',{loop:true});
            // this.musicaFondoB.play();
            this.scene.launch('HUD');
            this.registry.events.emit('Musica',this.musicaFondoB);
            this.registry.events.emit('apareceHUD2');
        }
    }

    // preload() {
    // }
    
    create() {
        this.hacerCambio = 1
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB2/NivelB2').setDepth(-2).setScale(.37,.32);
        this.flecha = this.add.image(1420, 170, 'NivelB2/flecha').setScale(1.2);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA
        this.movimiento = 1;
        //VIDAS
        this.life = 10;
        this.registry.events.emit('apareceHUD2');
        //MUSICA
        if(this.hud2==1)
        {   
            this.registry.events.emit('apareceHUD2');
            this.musicaFondoB.play()
        }
        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(70, 500, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.35);
        this.javier.body.setSize(130, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //Salida
        this.salida = this.physics.add.staticImage(1580, 210, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(60, 60);

        // Nubes derecha
        this.nube1 = this.add.image(-200,150, 'Menu/nube').setAlpha(0.2).setScale(0.6);
        this.nube2 = this.add.image(50,150, 'Menu/nube').setAlpha(0.2).setScale(0.3);
        this.nube3 = this.add.image(200,600, 'Menu/nube').setAlpha(0.2).setScale(0.6);
        this.nube6 = this.add.image(90,580, 'Menu/nube').setAlpha(0.2).setScale(0.2);
        this.nube7 = this.add.image(-90,580, 'Menu/nube').setAlpha(0.2).setScale(0.8);
        this.nube9 = this.add.image(-50,460, 'Menu/nube').setAlpha(0.2).setScale(0.3);
        //Nube izquierda
        this.nube4 = this.add.image(1800,580, 'Menu/nube').setAlpha(0.2);
        this.nube5 = this.add.image(1500,360, 'Menu/nube').setAlpha(0.2).setScale(0.5);
        this.nube8 = this.add.image(1600,50, 'Menu/nube').setAlpha(0.2).setScale(0.3);

        //Agua
        this.agua = this.physics.add.staticImage(870, 766, 'NivelB2/agua').setScale(.3);
        this.agua.body.setSize(890,20);
        this.agua.setOffset(1055,90);
        //Pasto
        this.pasto1 = this.physics.add.staticImage(150, 766, 'NivelB2/pasto1').setScale(1.3);
        this.pasto1.body.setSize(430,100);
        this.pasto2 = this.physics.add.staticImage(1500, 750, 'NivelB2/pasto2').setScale(1.9,1.3);
        this.pasto2.body.setSize(520,90);
        this.pasto3 = this.physics.add.staticImage(75, 350, 'NivelB2/pasto2').setScale(0.9,0.9);
        this.pasto3.body.setSize(180,53);
        this.pasto4 = this.physics.add.staticImage(1560, 230, 'NivelB2/pasto2').setScale(1.9,1.3);
        this.pasto4.body.setSize(520,90);
        //Troncos
        this.tronco = this.physics.add.staticImage(600, 740, 'NivelB2/tronco').setScale(0.26);
        this.tronco.body.setSize(90,20);
        this.tronco.setOffset(150,55);
        this.tronco2 = this.physics.add.staticImage(900, 740, 'NivelB2/tronco').setScale(0.26);
        this.tronco2.body.setSize(90,20);
        this.tronco2.setOffset(150,55);
        this.tronco3 = this.physics.add.staticImage(1000, 740, 'NivelB2/tronco').setScale(0.26);
        this.tronco3.body.setSize(90,20);
        this.tronco3.setOffset(150,55);
        this.tronco4 = this.physics.add.staticImage(50, 300, 'NivelB2/tronco2');
        this.tronco4.body.setSize(60,30);

        // PUENTES
        //Grupo puente A
        this.puentesA = this.physics.add.staticGroup();
        this.puentesA.create(600, 500, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        this.puentesA.create(1200, 600, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        this.puentesA.create(910, 490, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        this.puentesA.create(350, 400, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        //Grupo puente B
        this.puentesB = this.physics.add.staticGroup();
        this.puentesB.create(660, 260, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        this.puentesB.create(960, 140, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        this.puentesB.create(1200,260, 'NivelB2/puente').setSize(120,10).setOffset(2,35).disableBody(true,true);
        
        //Botones
        this.boton = this.physics.add.staticImage(1500, 705, 'NivelB2/boton').setScale(0.26);
        this.boton.body.setSize(20,15);
        this.boton.setOffset(35,30);
        this.boton2 = this.add.image(1500, 705, 'NivelB2/boton2').setScale(0.26).setAlpha(0);
        this.boton3 = this.physics.add.staticImage(50, 280, 'NivelB2/boton').setScale(0.26);
        this.boton3.body.setSize(20,15);
        this.boton3.setOffset(35,30);
        this.boton4 = this.add.image(50, 280, 'NivelB2/boton2').setScale(0.26).setAlpha(0);

         //COLISIONES
         this.javier.body.setCollideWorldBounds(true);

         this.physics.add.collider(this.javier, this.agua, () => {
            this.javier.body.stop()
            this.javier.y=500
            this.javier.x=70
            this.cameras.main.shake(700,0.005);
            this.life--;
            this.registry.events.emit('cambioNivelB');
            this.registry.events.emit('loseHeartB');
            this.registry.events.emit('apareceHUD2');
            if(this.life === 0) {
                this.musicaFondoB.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
         });
        //  this.physics.add.collider(this.javier, this.pasto1);
         this.physics.add.collider(this.javier, this.pasto1, () => {
            if(this.hacerCambio) {
                this.registry.events.emit('cambioNivelB');
                this.registry.events.emit('apareceHUD2');
                this.hacerCambio = 0
            }
         });
         this.physics.add.collider(this.javier, this.pasto2);
         this.physics.add.collider(this.javier, this.pasto3);
         this.physics.add.collider(this.javier, this.pasto4);
         this.physics.add.collider(this.javier, this.tronco);
         this.physics.add.collider(this.javier, this.tronco2);
         this.physics.add.collider(this.javier, this.tronco3);
         this.physics.add.collider(this.javier, this.tronco4);
         this.physics.add.collider(this.javier, this.puentesA);
         this.physics.add.collider(this.javier, this.puentesB);

         //Colision con primer boton
         this.physics.add.collider(this.javier, this.boton, () => {
            this.boton.setAlpha(0);
            this.boton2.setAlpha(1);
            this.puentesA.getChildren()[0].enableBody(false,0,0,true,true);
            this.puentesA.getChildren()[1].enableBody(false,0,0,true,true);
            this.puentesA.getChildren()[2].enableBody(false,0,0,true,true);
            this.puentesA.getChildren()[3].enableBody(false,0,0,true,true); 
         });

         //Colision con segundo boton
         this.physics.add.collider(this.javier, this.boton3, () => {
            this.boton3.setAlpha(0);
            this.boton4.setAlpha(1);
            this.puentesB.getChildren()[0].enableBody(false,0,0,true,true);
            this.puentesB.getChildren()[1].enableBody(false,0,0,true,true);
            this.puentesB.getChildren()[2].enableBody(false,0,0,true,true);
         });
        
         //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
 
         // TIMELINES NUBES DERECHA
         this.timeline = this.tweens.createTimeline(); 
         this.timeline = this.tweens.timeline({
             targets: [this.nube1,this.nube2,this.nube3,this.nube6,this.nube7,this.nube9],
             paused: true,
             loop: -1,
             totalDuration: 80000,
             tweens: [
                 {
                     x: 1800,
                     yoyo:true,
                     repeat:-1,
                 },
             ]
         });
         this.timeline.play();
 
         // TIMELINES NUBES IZQUIERDA
         this.timeline2 = this.tweens.createTimeline(); 
         this.timeline2 = this.tweens.timeline({
             targets: [this.nube4,this.nube5,this.nube8],
             paused: true,
             loop: -1,
             totalDuration: 90000,
             tweens: [
                 {
                     x: -300,
                     yoyo:true,
                     repeat:-1,
                 },
             ]
         });
         this.timeline2.play();

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();        
        
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelB3', { score: this.life, musica: this.musicaFondoB });
        });
        this.registry.events.emit('apareceHUD2');
    }


    update(time, delta) {
        //MOVIMIENTOS
        if(this.movimiento==1)
        {
            // this.registry.events.emit('apareceHUD2');
            if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
            {
                this.javier.anims.play('monsterIdle',true);
            }3
        if (this.cursors.left.isDown)
            {
                this.javier.setVelocityX(-200);
                this.javier.anims.play('monsterC',true);
                this.javier.flipX=0;
            }
        else if (this.cursors.right.isDown)
            {
                this.javier.setVelocityX(200);
                this.javier.anims.play('monsterC',true);
                this.javier.flipX=1;
            }
        else
        {
            this.javier.setVelocityX(0);
        }
 
        if ((this.cursors.up.isDown && this.javier.body.onFloor()))
            {
                this.javier.setVelocityY(-500);
            }
        }
    }


}

export default NivelB2;