class NivelA2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA2'
        });
    }

    init() {
        console.log('Escena NivelA2')
    }

    preload() {
    }

    create() {
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA2/NivelA2').setDepth(-2).setScale(.4,.38);
        //Fondo pasto
        this.pasto = this.physics.add.image(790, 740, 'NivelA2/pasto').setDepth(-1).setScale(.42,.27);
        this.pasto.body.setAllowGravity(false);
        this.pasto.body.setImmovable(true);
        this.pasto.body.setSize(3800,250);

        //PERSONAJES
        //Javier perrito
        this.dog = this.physics.add.sprite(100, 610, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
         //Gata Mia
         this.gata = this.physics.add.image(250, 610, 'NivelA1/Eliminar-gata', 0).setScale(1.8);
         this.gata.body.setSize(60, 50);
         this.gata.setPushable(false);

        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });

        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        //COLISIÓN PASTO CON PERRO Y GATA
        this.physics.add.collider(this.dog, this.pasto, () => {});
        this.physics.add.collider(this.gata, this.pasto, () => {});

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

export default NivelA2;