class NivelB5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB5'
        });
    }

    init() {
        console.log('Escena NivelB5');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB5/NivelB5_2').setDepth(-2).setScale(.37,.35);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        
        //BANDERA
        this.movimiento = 1;
        //OBJETOS
        //aletas
        this.aleta = this.physics.add.image(700, 710, 'NivelB5/aleta').setScale(0.37,0.32);
        this.aleta.body.setAllowGravity(false);
        this.aleta2 = this.physics.add.image(400, 710, 'NivelB5/aleta').setScale(0.37,0.32);
        this.aleta2.body.setAllowGravity(false);
        this.aleta2.flipX = true;
        
        //agua
        this.agua = this.physics.add.image(520, 750, 'NivelB5/agua').setScale(0.37,0.32);
        this.agua.body.setAllowGravity(false);
        this.agua.setPushable(false);
        this.agua2 = this.physics.add.image(1480, 745, 'NivelB5/agua2').setScale(1.7,1.5)
        this.agua2.body.setAllowGravity(false);
        this.agua2.setPushable(false);
        //Reflejo
        this.reflejo = this.add.image(1405, 747, 'NivelB5/reflejoMonstruo').setScale(0.47).setAlpha(0);
        //tierra
        this.tierra = this.physics.add.image(120, 200, 'NivelB5/tierra');
        this.tierra.body.setAllowGravity(false);
        this.tierra.setPushable(false);
        this.tierra2 = this.physics.add.image(1215, 745, 'NivelB5/tierra3').setScale(1.32,1);
        this.tierra2.body.setAllowGravity(false);
        this.tierra2.setPushable(false);
        //tierra pequeña 
        this.tierraP = this.physics.add.image(420, 300, 'NivelB5/tierra2').setScale(.35);
        this.tierraP.body.setAllowGravity(false);
        this.tierraP.setPushable(false);
        this.tierraP2 = this.physics.add.image(680, 400, 'NivelB5/tierra2').setScale(.35);
        this.tierraP2.body.setAllowGravity(false);
        this.tierraP2.setPushable(false);
        this.tierraP3 = this.physics.add.image(900, 500, 'NivelB5/tierra2').setScale(.35);
        this.tierraP3.body.setAllowGravity(false);
        this.tierraP3.setPushable(false);
        //Pino
        this.pino = this.physics.add.image(50, 97, 'NivelB5/pino').setScale(1.5);
        this.pino.body.setAllowGravity(false);
        this.pino.setPushable(false);
        //DIÁLOGOS
        this.fondoDialogo = this.add.image(1000, 100, 'NivelB5/fondoDialogo').setScale(0.35, 0.3).setAlpha(1);
        this.javierCara = this.add.image(545, 100, 'NivelB3/caraMonstruo').setScale(1.4).setAlpha(1);
        this.abiCara = this.add.image(1470, 105, 'NivelB4/caraAbi').setScale(0.55).setAlpha(1);
        // this.dialogo1 = this.add.image(770, 135, 'NivelB3/dialogo3_1').setScale(0.7).setAlpha(1);
        // this.dialogo2 = this.add.image(740, 135, 'NivelB3/dialogo3_2').setScale(0.5).setAlpha(0);
        // this.dialogo3 = this.add.image(770, 135, 'NivelB3/dialogo3_3').setScale(0.5).setAlpha(0);

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(160, 120, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.3);
        this.javier.body.setSize(210, 260);
        this.javier.body.setMass(1);
        //this.javier.flipX=true;

        //Abi
        this.abi = this.physics.add.sprite(100, 120, 'Abi', 0).setAlpha(1).setDepth(3).setScale(0.12);
        this.abi.body.setSize(300, 400);
        this.abi.setOffset(190,250);
        this.abi.setPushable(false);
        //ANIMACIONES MONSTRUO
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        //ANIMACION ABI
        this.anims.create({ key: 'abiIdle', frames: this.anims.generateFrameNames('Abi', { prefix: 'abiIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate:2 });
        this.abi.anims.play('abiIdle',true);
        //TWEENS ALETA
        this.add.tween({
            targets: [this.aleta],
            x: 300,
            yoyo: true,
            duration: 3500,
            repeat: -1,
            easy: 'Power1',
            onYoyo: () => {
                this.aleta.flipX = 1;
            },
            onRepeat: () => {
                this.aleta.flipX = 0;
            }
        });
          this.add.tween({
            targets: [this.aleta2],
            x: 950,
            yoyo: true,
            duration: 3500,
            repeat: -1,
            easy: 'Power1',
            onYoyo: () => {
                this.aleta2.flipX = 0;
            },
            onRepeat: () => {
                this.aleta2.flipX = 1;
            }
        });

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.abi.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.tierra);
        this.physics.add.collider(this.abi, this.tierra);
        this.physics.add.collider(this.javier, this.tierra2);
        this.physics.add.collider(this.javier, this.tierraP);
        this.physics.add.collider(this.javier, this.tierraP2);
        this.physics.add.collider(this.javier, this.tierraP3);
        this.physics.add.collider(this.javier, this.tierra2);
        this.physics.add.collider(this.abi, this.javier);
        this.physics.add.collider(this.javier, this.agua, () => {this.javier.x = 120;this.javier.y = 120});
        this.physics.add.collider(this.javier, this.agua2, () => {this.javier.x = 120;this.javier.y = 120});

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
 
    }


    update(time, delta) {
        //console.log(this.javier.x);
       //MOVIMIENTOS
       if(this.movimiento == 0)
        {
            this.javier.anims.play('monsterIdle');  
        }
       if(this.movimiento == 1)
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
       //console.log(this.javier.y)
       //Reflejo de javier en el agua
       if(this.javier.x > 1345){
           this.movimiento = 0;
           this.javier.x = 1346;
           this.javier.y = 668;
            this.javier.body.stop();
            //  this.javier.setVelocityY(0);
            //  this.javier.setAccelerationY(0);
            this.cameras.main.startFollow(this.javier, true);
            this.cameras.main.setZoom(4);
            this.tweens = this.add.tween({
                targets: [this.reflejo],
                alpha: 1,
                duration: 4000,
                onComplete: () => {
                        //console.log('Se completa el tween');
                        this.scene.start('NivelB4');
                    },
            });
       }
    }


}

export default NivelB5;