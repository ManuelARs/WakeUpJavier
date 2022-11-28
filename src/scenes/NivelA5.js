class NivelA5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA5'
        });
    }

    init() {
        console.log('Escena NivelA5');
    }

    preload() {
        this.load.path = './assets/';

    }
    

    create() {
        this.fondo = this.add.image(775, 360, 'NivelA5/nivelA5').setDepth(-2).setScale(.37,.35);
        this.physics.world.setBounds(0,0,1580, 700);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        //PERSONAJES
        //Perro Javier
        this.dog = this.physics.add.sprite(100, 610, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
        //Gata Mia
        this.gata = this.physics.add.image(250, 610, 'NivelA1/Eliminar-gata', 0).setScale(1.8);
        this.gata.body.setSize(60, 70);
        this.gata.setPushable(false);
        this.gata.flipX = true
        //Pastor aleman
        this.dogB = this.physics.add.sprite(1200, 610, 'DogB', 0).setScale(3);
        this.dogB.body.setSize(48, 70);
        this.dogB.body.setMass(1);
        //hidrante
        this.hidrante = this.physics.add.image(800, 620, 'NivelA5/hidrante', 0).setScale(1.8);
        this.hidrante.body.setSize(60, 85);
        this.hidrante.setPushable(false);
        //tronco
        this.tronco = this.physics.add.image(650, 660, 'NivelA5/tronco', 0).setScale(1.5);
        this.tronco.body.setSize(60, 55);
        this.tronco.setPushable(false);
        //hueso
        this.hueso = this.physics.add.image(800, 380, 'NivelA5/hueso', 0).setScale(0.65);
        this.hueso.body.setSize(200, 200);
        this.hueso.setPushable(false);
        this.hueso.body.setAllowGravity(false);
        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'pastorC', frames: this.anims.generateFrameNames('DogB', { prefix: 'pastor', suffix: '.png', start: 1, end: 8 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'pastorIdle', frames: this.anims.generateFrameNames('DogB', { prefix: 'pastorIdle', suffix: '.png', start: 1, end:4 }), repeat: -1, frameRate: 4 });
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        this.dogB.body.setCollideWorldBounds(true);
        this.hidrante.body.setCollideWorldBounds(true);
        this.tronco.body.setCollideWorldBounds(true);
        this.hueso.body.setCollideWorldBounds(true);
        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //Colision con gatita
        this.physics.add.collider(this.dog, this.gata, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            //this.scene.start('NivelA5');
        });
        //Colision con tronco
        this.physics.add.collider(this.dog, this.tronco);
        this.physics.add.collider(this.dog, this.dogB);
        this.physics.add.collider(this.dog, this.hidrante);
    }


    update(time, delta) {
        //MOVIMIENTOS
        // console.log(this.dog.y)
        if(this.dog.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
            this.dog.anims.play('dogIdle',true);
        }
        // se le permite al perro avanzar 
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
        //MOVIMIENTOS PERRO MALO
        if(this.dogB.body.onFloor())
        {
            this.dogB.anims.play('pastorIdle',true);
        }
    }


}

export default NivelA5;