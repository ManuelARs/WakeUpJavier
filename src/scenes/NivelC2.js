class NivelC2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC2'
        });
    }

    init() {
        console.log('Escena NivelC2');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,670);

        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelC2/NivelC2').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

        //BANDERA
        this.movimiento = 1;
        this.dialogoChoque = 0;

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(300, 500, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.47);
        this.javier.body.setSize(130, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //OBJETOS
        this.salida = this.physics.add.staticImage(1695, 690, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(150, 1100);

        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });

        //DIÁLOGOS
        this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        this.javierCara = this.add.image(125, 125, 'NivelC2/caraMonstruo').setScale(1.2).setAlpha(0);
        this.monstruoCara = this.add.image(1470, 125, 'NivelC2/caraMonstruoCafe').setScale(1).setAlpha(0);
        this.dialogo1 = this.add.image(790, 125, 'NivelC2/dialogo1_1').setScale(0.8).setAlpha(0);
        this.dialogo2 = this.add.image(790, 125, 'NivelC2/dialogo1_2').setScale(0.7).setAlpha(0);
        this.dialogo3 = this.add.image(790, 125, 'NivelC2/dialogo1_3').setScale(0.6).setAlpha(0);
        this.dialogo4 = this.add.image(790, 125, 'NivelC2/dialogo1_4').setScale(0.7).setAlpha(0);
        this.dialogo5 = this.add.image(750, 125, 'NivelC2/dialogo1_5').setScale(0.6).setAlpha(0);
        this.dialogo6 = this.add.image(790, 125, 'NivelC2/dialogo1_6').setScale(0.7).setAlpha(0);
        this.dialogo7 = this.add.image(790, 125, 'NivelC2/dialogo1_7').setScale(0.8).setAlpha(0);

         //COLISIONES
         this.javier.body.setCollideWorldBounds(true);
        //  this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);
 

        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelC2');
        });

        
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

export default NivelC2;