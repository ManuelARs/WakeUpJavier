class NivelB1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB1'
        });
    }

    init() {
        console.log('Escena NivelB1');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,670);

        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB1/NivelB1').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

        //BANDERA
        this.movimiento = 0;
        this.dialogoChoque = 0;

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(300, 500, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.47);
        this.javier.body.setSize(140, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //MonstruoAldea 1 
        this.monsterAl = this.physics.add.sprite(1300, 500, 'NivelB1/monsterAldea', 0).setAlpha(1).setDepth(2);
        this.monsterAl.body.setSize(120,130);
        this.monsterAl.body.setMass(1);
        this.monsterAl.setPushable(false);

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

        //OBJETOS
        this.salida = this.physics.add.staticImage(1695, 690, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(150, 1100);

        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });

        //DIÁLOGOS
        this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        this.javierCara = this.add.image(125, 125, 'NivelB1/caraMonstruo').setScale(1.2).setAlpha(0);
        this.monstruoCara = this.add.image(1470, 125, 'NivelB1/caraMonstruoCafe').setScale(1).setAlpha(0);
        this.dialogo1 = this.add.image(790, 125, 'NivelB1/dialogo1_1').setScale(0.8).setAlpha(0);
        this.dialogo2 = this.add.image(790, 125, 'NivelB1/dialogo1_2').setScale(0.7).setAlpha(0);
        this.dialogo3 = this.add.image(790, 125, 'NivelB1/dialogo1_3').setScale(0.6).setAlpha(0);
        this.dialogo4 = this.add.image(790, 125, 'NivelB1/dialogo1_4').setScale(0.7).setAlpha(0);
        this.dialogo5 = this.add.image(750, 125, 'NivelB1/dialogo1_5').setScale(0.6).setAlpha(0);
        this.dialogo6 = this.add.image(790, 125, 'NivelB1/dialogo1_6').setScale(0.7).setAlpha(0);
        this.dialogo7 = this.add.image(790, 125, 'NivelB1/dialogo1_7').setScale(0.8).setAlpha(0);

        setTimeout(() => {
            this.javierCara.setAlpha(1);
            this.fondoDialogo.setAlpha(1);
            this.dialogo1.setAlpha(1);
        }, 1500);
        setTimeout(() => {
            this.javierCara.setAlpha(0);
            this.fondoDialogo.setAlpha(0);
            this.dialogo1.setAlpha(0);
            this.monstruoCara.setAlpha(1);
            this.fondoDialogo.setAlpha(1);
            this.dialogo2.setAlpha(1);
        }, 4000);
        setTimeout(() => {
            this.monstruoCara.setAlpha(0);
            this.fondoDialogo.setAlpha(0);
            this.dialogo2.setAlpha(0);
            this.movimiento = 1;
        }, 6000);

         //COLISIONES
         this.javier.body.setCollideWorldBounds(true);
         this.monsterAl.body.setCollideWorldBounds(true);
        //  this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);

         this.physics.add.overlap(this.javier,  this.monsterAl, () =>{
            if(this.dialogoChoque==0)
            {
                this.movimiento = 0;
                this.javier.x = 1190;
                this.javier.body.stop();
                //3
                this.monstruoCara.setAlpha(1);
                this.fondoDialogo.setAlpha(1);
                this.dialogo3.setAlpha(1);
                setTimeout(() => {
                    this.monstruoCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo3.setAlpha(0);
                    this.javierCara.setAlpha(1);
                    this.fondoDialogo.setAlpha(1);
                    this.dialogo4.setAlpha(1);
                    this.javier.setVelocityY(-200);
                }, 3000);
                setTimeout(() => {
                    this.javierCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo4.setAlpha(0);
                    this.monstruoCara.setAlpha(1);
                    this.fondoDialogo.setAlpha(1);
                    this.dialogo5.setAlpha(1);
                    this.monsterAl.setVelocityY(-200);
                }, 6000);
                setTimeout(() => {
                    this.monstruoCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo5.setAlpha(0);

                    this.javierCara.setAlpha(1);
                    this.fondoDialogo.setAlpha(1);
                    this.dialogo6.setAlpha(1);
                }, 11000);
                setTimeout(() => {
                    this.javierCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo6.setAlpha(0);

                    this.monstruoCara.setAlpha(1);
                    this.fondoDialogo.setAlpha(1);
                    this.dialogo7.setAlpha(1);
                }, 13000);
                setTimeout(() => {
                    this.monstruoCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo7.setAlpha(0);
                    this.movimiento = 1;
                    this.dialogoChoque=1
                }, 15000);
            }
            if(this.dialogoChoque==1)
            {
                this.monstruoCara.setAlpha(1);
                this.fondoDialogo.setAlpha(1);
                this.dialogo7.setAlpha(1);
                setTimeout(() => {
                    this.monstruoCara.setAlpha(0);
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo7.setAlpha(0);
                }, 2000);
            }
         }); 
        //FALTA AGREGAR DIALOGO DE MOSNTRUOS
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelB2');
        });
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
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.movimiento==0)
        {
            this.javier.anims.play('monsterIdle');  
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

export default NivelB1;