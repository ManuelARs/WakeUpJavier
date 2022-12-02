class NivelC4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC4'
        });
    }

    init() {
        console.log('Escena NivelC4');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 740)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

        //BANDERAS
        this.movimiento = 0;  

        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC4/NivelC4').setDepth(-2).setScale(.36,.32);

        //OBJETOS
        //Grupo estático de barras 
        this.barras = this.physics.add.staticGroup();
        this.barras.create(100,610, 'NivelC4/barra').refreshBody();
        this.barras.create(340,470, 'NivelC4/barra').refreshBody();
        this.barras.create(160,320, 'NivelC4/barra').refreshBody();
        this.barras.create(360,250, 'NivelC4/barra').refreshBody();
        this.barras.create(660,220, 'NivelC4/barra').setScale(.7,1).refreshBody();
        this.barras.create(870,360, 'NivelC4/barra').setScale(.5,1).refreshBody();
        this.muro = this.physics.add.image(1000, 460, 'NivelC4/muro').setDepth(-2).setScale(.36,.32);
        this.muro.body.setAllowGravity(false);
        this.muro.setPushable(false);
        this.mascara = this.physics.add.image(500, 80, 'NivelC4/mascara').setDepth(0).setScale(.5);
        this.mascara.body.setAllowGravity(false);
        this.mascara.setPushable(false);

        //CONVERSACIONES
        this.fondoDialogo = this.add.image(790, 135, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        this.javierCara = this.add.image(125, 135, 'NivelB3/caraMonstruo').setScale(1.4).setAlpha(0);
        this.monstruoCara = this.add.image(1470, 135, 'NivelB3/monstruo_cara').setScale(0.5).setAlpha(0);
        this.dialogo1 = this.add.image(770, 135, 'NivelB3/dialogo3_1').setScale(0.7).setAlpha(0);
        this.dialogo2 = this.add.image(740, 135, 'NivelB3/dialogo3_2').setScale(0.5).setAlpha(0);
        this.dialogo3 = this.add.image(770, 135, 'NivelB3/dialogo3_3').setScale(0.5).setAlpha(0);

        //salida
        this.salida = this.physics.add.staticImage(1650, 740, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(100, 100);




        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 450);
        // console.log(this.javier.body.offset)
        this.javier.body.setMass(1);
        this.javier.flipX=false;
        this.guardia = this.physics.add.image(800, 740, 'NivelC4/guardia').setDepth(0).setScale(1);
        this.guardia.body.setAllowGravity(false);
        this.guardia.body.setSize(50, 93);
        this.guardia.setPushable(false);

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.guardia.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.muro);
        this.physics.add.collider(this.javier, this.muro);
        this.physics.add.collider(this.javier, this.barras);
        this.physics.add.overlap(this.javier, this.mascara, collectMascara, null, this);
        function collectMascara (jugador, objeto) {
            objeto.disableBody(true, true)
        }
        this.physics.add.collider(this.javier, this.guardia, () => {
            this.fondoDialogo.setAlpha(1)
            this.dialogo1.setAlpha(1)
            this.javierCara.setAlpha(1)
            setTimeout(() => {
                // this.fondoDialogo.setAlpha(0)
                this.dialogo1.setAlpha(0)
                this.javierCara.setAlpha(0)
                this.dialogo2.setAlpha(1)
                this.monstruoCara.setAlpha(1)
            }, 2000);
            setTimeout(() => {
                this.fondoDialogo.setAlpha(0)
                this.dialogo2.setAlpha(0)
                this.monstruoCara.setAlpha(0)
                this.movimiento = 1
            }, 4000);
        });
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelC5');
        });

        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.movimiento==0)
       {
        if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
           this.javier.anims.play('samuraiIdle',true);
        }
        if (this.cursors.left.isDown)
        {
           this.javier.setVelocityX(-200);
           this.javier.anims.play('samuraiCaminar',true); //Caminar
           this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
           this.javier.setVelocityX(200);
           this.javier.anims.play('samuraiCaminar',true); //Caminar
           this.javier.flipX=0;
        }
        else
        {
            this.javier.setVelocityX(0);
        }

       }
       if(this.movimiento==1)
       {
           if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
           {
              this.javier.anims.play('samuraiIdle',true);
           }
           if (this.cursors.left.isDown)
           {
              this.javier.setVelocityX(-200);
              this.javier.anims.play('samuraiCaminar',true); //Caminar
              this.javier.flipX=1;
           }
           else if (this.cursors.right.isDown)
           {
              this.javier.setVelocityX(200);
              this.javier.anims.play('samuraiCaminar',true); //Caminar
              this.javier.flipX=0;
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

export default NivelC4;