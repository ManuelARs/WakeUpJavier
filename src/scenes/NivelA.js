class NivelA extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA'
        });
    }

    init() {
        console.log('Escena NivelA');
    }
    

    create() {
        // this.scene.moveAbove('Bootloader','HUD');
        //console.log(this.scene.manager.scenes);
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        this.cameras.main.setZoom(2);
        
        //MÚSICA
        // this.gong = this.sound.add('gong',{loop:false});
        // this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        // this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(790, 385, 'NivelA/fondo_opc1').setDepth(-2).setScale(.36,.32);
        
        // this.javier = this.physics.add.image(50, 10, 'Javier_01').setScale(0.2);
        this.javier = this.physics.add.sprite(350, 480, 'Javier', 0).setScale(0.4).setDepth(45);
        this.javier.body.setSize(230, 550);
        this.javier.body.setMass(1);
        
        this.anims.create({ key: 'JavierIdle', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierI', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'JavierD', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierD', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        // this.javier.anims.play('JavierD');

        // this.javier.body.setSize(200, 500);
        // this.javier.body.setOffset(0,0);

        //OBJETOS
        //this.cama = this.add.image(180, 710, 'NivelA/Eliminar-cama').setScale(0.1);
        this.espejo = this.physics.add.image(1530, 380, 'NivelA/espejo').setScale(0.22);
        this.espejo.body.setAllowGravity(false);
        this.espejo.setPushable(false);
        this.espejo.body.setSize(400, 1000);
        this.espejo2 = this.physics.add.image(1530, 380, 'NivelA/espejo2').setScale(0.22).setDepth(4).setAlpha(0);
        this.espejo2.body.setAllowGravity(false);
        this.espejo2.setPushable(false);
        this.espejo2.body.setSize(100, 250);
        
        //CAMARA
        this.cameras.main.startFollow(this.javier, true);
        
       
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.javier.setCollideWorldBounds(true);
        this.javier.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 1580, 635));
        this.espejo.body.setCollideWorldBounds(true);

        // this.physics.add.existing(this.cama, true );
        this.physics.add.existing(this.espejo, true );
        // this.cama.body.setSize(300, 50);
        // this.physics.add.collider(this.javier, this.cama, () => {
        //     this.javier.setVelocityY(0);
        //     this.javier.setAccelerationY(0);
        // });
        this.physics.add.collider(this.javier, this.espejo, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            //this.espejo2.setAlpha(1)
            // this.sound.pauseAll();
            this.scene.start('NivelA1');
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
        //MOVIMIENTOS
        if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
            // this.javier.anims.paused = true;
            // this.javier.anims.pause('JavierA');
            // console.log("Entro")
            this.javier.anims.play('JavierIdle');
        }
        if (this.cursors.left.isDown)
        {
            this.javier.setVelocityX(-250);
            // this.javier.anims.play('JavierI',true);
            this.javier.anims.play('JavierD',true);
            this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.javier.setVelocityX(250);
            this.javier.anims.play('JavierD',true);
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

        if(this.javier.x > 1100) {
            this.espejo2.setAlpha(1)
        }
    }


}

export default NivelA;