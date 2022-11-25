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
        console.log(this.scene.manager.scenes);
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        // this.cameras.main.centerOn(this.javier);
        // this.cameras.main.centerOnY(this.javier.y);
        // this.cameras.main.setZoom(2);
        
        //MÚSICA
        this.gong = this.sound.add('gong',{loop:false});
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(1);
        
        // this.javier = this.physics.add.image(50, 10, 'Javier_01').setScale(0.2);
        this.javier = this.physics.add.sprite(100, 400, 'Javier', 0).setScale(0.5);
        this.javier.body.setSize(200, 450);
        this.javier.body.setMass(1);
        
        this.anims.create({ key: 'JavierIdle', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierD', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'JavierD', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierD', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'JavierI', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierI', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        // this.javier.anims.play('JavierD');

        // this.javier.body.setSize(200, 500);
        // this.javier.body.setOffset(0,0);
        this.javier.body.setMass(1);

        //OBJETOS
        this.cama = this.add.image(180, 710, 'Eliminar-cama').setScale(0.1);
        this.espejo = this.physics.add.image(1500, 690, 'Eliminar-mirror').setScale(0.7);
        this.espejo.setPushable(false);
        this.espejo.body.setSize(150, 250);
        
        //CAMARA
        this.cameras.main.startFollow(this.javier, true);
        
       
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.espejo.body.setCollideWorldBounds(true);

        this.physics.add.existing(this.cama, true );
        this.physics.add.existing(this.espejo, true );
        this.cama.body.setSize(300, 50);
        this.physics.add.collider(this.javier, this.cama, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.espejo, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelA1');
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        
        

        //COLISIÓN CON Espejo / FINAL DE NIVEL
        // this.physics.add.collider(this.javier, this.puerta, () => {
        //     this.sound.pauseAll();
        //     this.registry.events.emit('YouWin');
        //     this.scene.start('Win');
        // });
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
            this.javier.setVelocityX(-200);
            // this.javier.anims.play('JavierI',true);
            this.javier.anims.play('JavierD',true);
            this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.javier.setVelocityX(200);
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

        //PARA ESCALAR
        // if (this.cursors.up.isDown && this.escalar.body.touching.left && this.javier.body.touching.right)
        // {
        //     this.javier.y -= 3;
        // }

        // if (this.cursors.up.isDown && this.escalar2.body.touching.left && this.javier.body.touching.right)
        // {
        //     this.javier.y -= 3;
        // }

    }


}

export default NivelA;