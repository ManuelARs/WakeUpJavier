class NivelA1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA1'
        });
    }

    init() {
        console.log('Escena NivelA1');
    }
    

    create() {
        // this.scene.moveAbove('Bootloader','HUD');
        console.log(this.scene.manager.scenes);
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        // this.cameras.main.centerOn(this.javier);
        // this.cameras.main.centerOnY(this.javier.y);
        // this.cameras.main.setZoom(2);
        
        //MÚSICA
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(1);
        
        this.dog = this.physics.add.sprite(100, 500, 'Dog', 0).setScale(0.1);
        this.dog.body.setSize(400, 350);
        this.dog.body.setMass(1);
        
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });

        //OBJETOS
        this.espejo = this.physics.add.image(1500, 690, 'Eliminar-mirror').setScale(0.7);
        this.espejo.setPushable(false);
        this.espejo.body.setSize(150, 250);
        
        //CAMARA
        this.cameras.main.startFollow(this.dog, true);
        
       
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.espejo.body.setCollideWorldBounds(true);

        this.physics.add.existing(this.espejo, true );
  
        this.physics.add.collider(this.dog, this.espejo, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.scene.start('NivelA3');
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }


    update(time, delta) {
        //MOVIMIENTOS
        // console.log(this.dog.y)
        if(this.dog.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
            this.dog.anims.play('dogIdle',true);
        }
        if (this.cursors.left.isDown)
        {
            this.dog.setVelocityX(-200);
            this.dog.anims.play('dogC',true);
            this.dog.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.dog.setVelocityX(200);
            this.dog.anims.play('dogC',true);
            this.dog.flipX=0;
        }
        else
        {
            this.dog.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.dog.body.onFloor()))
        {
            this.dog.setVelocityY(-500);
        }

    }


}

export default NivelA1;