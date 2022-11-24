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
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        // this.cameras.main.centerOn(this.javier);
        // this.cameras.main.centerOnY(this.javier.y);
        this.cameras.main.setZoom(2);
        
        //MÚSICA
        this.gong = this.sound.add('gong',{loop:false});
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(0.8);
        
        this.javier = this.physics.add.image(50, 10, 'Javier_01').setScale(0.2);
        // this.javier.body.setSize(200, 500);
        // this.javier.body.setOffset(0,0);
        this.javier.body.setMass(1);

        //OBJETOS
        this.cama = this.add.image(180, 710, 'Eliminar-cama').setScale(0.1);
        this.espejo = this.add.image(1600, 690, 'Eliminar-mirror').setScale(0.7);
        
        //CAMARA
        this.cameras.main.startFollow(this.javier, true);
        
       
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);

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
        if (this.cursors.left.isDown)
        {
            this.javier.setVelocityX(-160);

            this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.javier.setVelocityX(160);

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