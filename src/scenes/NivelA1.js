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
        // this.cameras.main.setZoom(2);
        
        //MÚSICA
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(1);
        //PERSONAJES
        this.dog = this.physics.add.sprite(50, 750, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(400, 300);
        this.dog.body.setMass(1);

        this.gata = this.physics.add.image(750, 750, 'NivelA1/Eliminar-gata', 0).setScale(1.5);

        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });

        //OBJETOS
        this.salida = this.physics.add.staticImage(1695, 690, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        // this.salida.setPushable(false);
        this.salida.body.setSize(150, 1100);
        // this.salida.body.setOffset(0,0);
        
        //CAMARA
        this.cameras.main.startFollow(this.dog, true);
        
       
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);

        this.physics.add.existing(this.gata, true );
  
        this.physics.add.collider(this.dog, this.gata, () => {
            this.tweens = this.add.tween({
            targets: [this.gata],
            x: 1500,
            });
        });        
        this.physics.add.collider(this.dog, this.salida, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.scene.start('NivelA3');
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //TWEENS
        // this.tweens = this.add.tween({
        //     targets: [this.gata],
        //     x: 200,

        // });
        
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