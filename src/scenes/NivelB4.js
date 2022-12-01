class NivelB4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB4'
        });
    }

    init() {
        console.log('Escena NivelB4');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('nube', 'NivelB4/nube.png');
    }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB4/NivelB4').setDepth(-2).setScale(.37,.35);

        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,720);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA
        this.movimiento = 1;
        
        //tierra
        this.tierra = this.physics.add.image(1500, 430, 'NivelB4/tierra').setScale(1.4,1.2);
        this.tierra.body.setAllowGravity(false);
        this.tierra.setPushable(false);
        this.tierra2 = this.physics.add.image(760, 250, 'NivelB4/tierra').setScale(1.2,1.2);
        this.tierra2.body.setAllowGravity(false);
        this.tierra2.setPushable(false);

        //tierra pequeña 
        this.tierraP = this.physics.add.image(400, 300, 'NivelB4/tierra2').setScale(.35).disableBody(true, true);
        this.tierraP.body.setAllowGravity(false);
        this.tierraP.setPushable(false);
        //enableBody(false, 0, 0, true, true)
        this.tierraP1 = this.physics.add.image(150, 450, 'NivelB4/tierra2').setScale(.35).disableBody(true, true);
        this.tierraP1.body.setAllowGravity(false);
        this.tierraP1.setPushable(false);
        this.tierraP2 = this.physics.add.image(460, 540, 'NivelB4/tierra2').setScale(.35);
        this.tierraP2.body.setAllowGravity(false);
        this.tierraP2.setPushable(false);
        this.tierraP3 = this.physics.add.image(1000, 530, 'NivelB4/tierra2').setScale(.35);
        this.tierraP3.body.setAllowGravity(false);
        this.tierraP3.setPushable(false);
        this.tierraP4 = this.physics.add.image(1100, 270, 'NivelB4/tierra2').setScale(.35).disableBody(true, true);
        this.tierraP4.body.setAllowGravity(false);
        this.tierraP4.setPushable(false);

        //Pino
        this.pino = this.physics.add.image(1500, 270, 'NivelB4/pino').setScale(1.5);
        this.pino.body.setAllowGravity(false);
        this.pino.setPushable(false);
        this.pino = this.physics.add.image(1425, 310, 'NivelB4/pino').setScale(1);
        this.pino.body.setAllowGravity(false);
        this.pino.setPushable(false);

        //tronco
        this.tronco = this.physics.add.image(1200, 680, 'NivelB4/tronco').setScale(1.5);
        this.tronco.body.setAllowGravity(false);
        this.tronco.setPushable(true);
        this.tronco.body.setSize(80, 80);

        //maquina
        this.maquina = this.physics.add.image(750, 110, 'NivelB4/maquina').setScale(0.1);
        this.maquina.body.setAllowGravity(false);
        this.maquina.setPushable(false);

        //piedras
        this.piedra = this.physics.add.image(1350, 710, 'NivelB4/piedra').setScale(0.2);
        this.piedra.body.setAllowGravity(false);
        this.piedra.setImmovable(true);
        this.piedra2 = this.physics.add.image(190, 710, 'NivelB4/piedra').setScale(0.2);
        this.piedra2.body.setAllowGravity(false);
        this.piedra2.setImmovable(true);

        //maquina
        this.boton = this.physics.add.image(630, 205, 'NivelB4/boton').setScale(1);
        this.boton.body.setAllowGravity(false);
        this.boton.setPushable(false);
        this.boton2 = this.physics.add.image(700, 205, 'NivelB4/boton').setScale(1);
        this.boton2.body.setAllowGravity(false);
        this.boton2.setPushable(false);
        this.boton3 = this.physics.add.image(130, 435, 'NivelB4/boton').setScale(1).disableBody(true, true);
        this.boton3.body.setAllowGravity(false);
        this.boton3.setPushable(false);
        this.boton4 = this.physics.add.image(1350, 390, 'NivelB4/boton').setScale(1);
        this.boton4.body.setAllowGravity(false);
        this.boton4.setPushable(false);

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
 
        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(120, 720, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.3);
        this.javier.body.setSize(210, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //Randal 
        this.monstruo = this.physics.add.sprite(900, 150, 'Randal', 0).setAlpha(1).setDepth(3).setScale(1.2);
        this.monstruo.body.setSize(60, 60);
        this.monstruo.body.setMass(1);
        this.monstruo.flipX=true;
        this.monstruo.setPushable(false)

        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'randalIdle', frames: this.anims.generateFrameNames('Randal', { prefix: 'randalIdle', suffix: '.png', start: 1, end:4 }), repeat: -1, frameRate: 4 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.monstruo.body.setCollideWorldBounds(true);
        this.tronco.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.javier, this.tierra2)
        this.physics.add.collider(this.javier, this.tierra)
        this.physics.add.collider(this.javier, this.tierraP)
        this.physics.add.collider(this.javier, this.tierraP1)
        this.physics.add.collider(this.javier, this.tierraP2)
        this.physics.add.collider(this.javier, this.tierraP3)
        this.physics.add.collider(this.javier, this.tierraP4)
        //this.physics.add.collider(this.javier, this.boton)
        this.physics.add.collider(this.javier, this.boton2)
        //this.physics.add.collider(this.javier, this.boton3)
        this.physics.add.collider(this.javier, this.boton4, () => {
            if (this.boton4.body.touching.up )
                {
                    this.tierraP1.enableBody(false, 0, 0, true, true)
                    this.boton3.enableBody(false, 0, 0, true, true)
                }
        });
        this.physics.add.collider(this.javier, this.boton3, () => {
            if (this.boton3.body.touching.up )
                {
                    this.tierraP.enableBody(false, 0, 0, true, true)
                }
        });
        this.physics.add.collider(this.javier, this.boton, () => {
            if (this.boton3.body.touching.up )
                {
                    this.tierraP4.enableBody(false, 0, 0, true, true)
                }
        });

        this.physics.add.collider(this.javier, this.tronco)
        this.physics.add.collider(this.monstruo, this.tierra2)
        this.physics.add.collider(this.tronco, this.piedra, () => {
            this.tronco.x = 1265
            console.log(this.tronco.x)
        });
        this.physics.add.collider(this.tronco, this.piedra2, () => {
            this.tronco.x = 275
            console.log(this.tronco.x)
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.monstruo.body.onFloor())
       {
           this.monstruo.anims.play('randalIdle',true);
       }
       if(this.movimiento==1)
       {
           if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
           {
               this.javier.anims.play('monsterIdle',true);
           }
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

export default NivelB4;