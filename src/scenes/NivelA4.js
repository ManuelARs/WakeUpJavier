class  NivelA4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA4'
        });
    }

    init() {
        console.log('Escena NivelA4')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('abeja', 'NivelA4/abeja.png');
    }

    create() {
        this.physics.world.setBounds(0,0,1580, 700);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA4/NivelA4').setDepth(-2).setScale(.4,.35);
        this.mesa = this.physics.add.staticImage(200, 630, 'NivelA4/mesa').setScale(2);
        this.mesa.body.setSize(180,15);
        this.mesa.setOffset(-0.20,-10);
        this.panal = this.physics.add.image(1270,515, 'NivelA4/panal').setScale(1.2);
        this.panal.body.setAllowGravity(false);
        // this.abeja = this.add.image(1270,515, 'NivelA4/abeja').setScale(0.2);
        this.abejas = this.physics.add.group({
            key: 'abeja',
            repeat: 5,
            setXY: {
              x: 900,
              y: 500,
              stepY: -50,
              stepX: 20
            }
          });
        this.abejas.children.iterate((abejas) => {
            abejas.setScale(0.18);
            abejas.body.setAllowGravity(false);
            abejas.setCollideWorldBounds(true);
        });
        this.add.tween({
            targets: this.abejas.getChildren(),
            x: 1250,
            yoyo: true,
            duration: 6000,
            repeat: -1,
            easy: 'Power1',
            onYoyo: () => {
              this.abejas.children.iterate((abeja) => {
                abeja.flipX = 1;
              });
            },
            onRepeat: () => {
              this.abejas.children.iterate((abeja) => {
                abeja.flipX = 0;
              });
            }
          });
        //PERSONAJES
        //Perro Javier
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
        this.panal.body.setCollideWorldBounds(true);
        //COLISIÓN Mesa CON PERRO 
        this.physics.add.collider(this.dog, this.mesa, () => {});
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

        if(this.dog.x > 1260) {
            this.cameras.main.shake(500,0.008);
            this.panal.body.setAllowGravity(true);
            this.panal.angle = 30
        }
    }
}

export default NivelA4;