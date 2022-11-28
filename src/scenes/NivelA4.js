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
        this.tocoPanal = true
        this.physics.world.setBounds(0,0,1580, 700);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        //Imagen de Fondo
        this.fondo = this.add.image(775, 370, 'NivelA4/NivelA4').setDepth(-2).setScale(.4,.35);
        this.mesa = this.physics.add.staticImage(300, 630, 'NivelA4/mesa').setScale(2);
        this.mesa.body.setSize(145,15);
        this.mesa.setOffset(-0.20,-10);
        this.panal = this.physics.add.image(1270,515, 'NivelA4/panal').setScale(1.2);
        this.panal.body.setAllowGravity(false);
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
        //CONVERSACIONES
        this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
        this.dogCara = this.add.image(125, 125, 'NivelA1/dogCara').setScale(1).setAlpha(0);
        this.gataCara = this.add.image(1500, 125, 'NivelA1/gataCara').setScale(1.2).setAlpha(1);
        this.dialogo1 = this.add.image(770, 125, 'NivelA4/dialogo4_1').setScale(0.7).setAlpha(1);
        this.dialogo2 = this.add.image(790, 125, 'NivelA4/dialogo4_2').setScale(0.7).setAlpha(0);

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


        //Colision con gatita
        this.physics.add.collider(this.dog, this.gata, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.scene.start('NivelA5');
        });

        //DIALOGOS
      setTimeout(() => {
          this.gataCara.setAlpha(0);
          this.fondoDialogo.setAlpha(0);
          // nuevo dialogo ej Esto te ayudara a relajarte
          this.dialogo1.setAlpha(0);
          this.gataCara.setAlpha(1);
          this.fondoDialogo.setAlpha(1);
          this.dialogo2.setAlpha(1);
      }, 3000);

      setTimeout(() => {
        this.gataCara.setAlpha(0);
        this.fondoDialogo.setAlpha(0);
        // nuevo dialogo ej Esto te ayudara a relajarte
        this.dialogo2.setAlpha(0);
    }, 7000);
    }

    update(time, delta) {
        //MOVIMIENTOS
        // console.log(this.dog.y)
        if(this.dog.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
            this.dog.anims.play('dogIdle',true);
        }
        
        if(this.gata.x > 1450) {
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
            // se cae panal y se crean los grupos de las abejas
            //this.cameras.main.shake(500,0.0008);
            this.panal.body.setAllowGravity(true);
            this.panal.angle = 30
            if(this.tocoPanal == true) {
                this.abejas = this.physics.add.group({
                    key: 'abeja',
                    repeat: 2,
                    setXY: {
                      x: 240,
                      y: 680,
                      stepY: -30,
                      stepX: 50
                    }
                  });
                this.abejas.children.iterate((abejas) => {
                    abejas.setScale(0.18);
                    abejas.body.setAllowGravity(false);
                    abejas.setCollideWorldBounds(true);
                });
                this.add.tween({
                    targets: this.abejas.getChildren(),
                    x: 1500,
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
                this.abejas2 = this.physics.add.group({
                    key: 'abeja',
                    repeat: 1,
                    setXY: {
                        x: 1500,
                        y: 650,
                        stepY: -30,
                        stepX: 50
                    }
                });
                this.abejas2.children.iterate((abejas) => {
                    abejas.setScale(0.18);
                    abejas.body.setAllowGravity(false);
                    abejas.setCollideWorldBounds(true);
                    abejas.flipX = 1;
                });
                this.add.tween({
                    targets: this.abejas2.getChildren(),
                    x: 240,
                    yoyo: true,
                    duration: 6000,
                    repeat: -1,
                    easy: 'Power1',
                    onYoyo: () => {
                      this.abejas2.children.iterate((abeja) => {
                        abeja.flipX = 0;
                      });
                    },
                    onRepeat: () => {
                      this.abejas2.children.iterate((abeja) => {
                        abeja.flipX = 1;
                      });
                    }
                  });
                this.abejas3 = this.physics.add.group({
                    key: 'abeja',
                    repeat: 3,
                    setXY: {
                        x: 350,
                        y: 550,
                        stepY: -30,
                        stepX: -30
                    }
                });
                this.abejas3.children.iterate((abejas) => {
                    abejas.setScale(0.18);
                    abejas.body.setAllowGravity(false);
                    abejas.setCollideWorldBounds(true);
                });
                this.add.tween({
                    targets: this.abejas3.getChildren(),
                    x: 1500,
                    yoyo: true,
                    duration: 8000,
                    repeat: -1,
                    easy: 'Power1',
                    onYoyo: () => {
                      this.abejas3.children.iterate((abeja) => {
                        abeja.flipX = 1;
                      });
                    },
                    onRepeat: () => {
                      this.abejas3.children.iterate((abeja) => {
                        abeja.flipX = 0;
                      });
                    }
                  });
                  this.tocoPanal = false;
                  this.gata.flipX = false
            }
            
        } else {
            this.gata.x += 4;
        }

        // Logica de colisiones con abejas
        let choqueAbeja = (javier, abeja) => {
            this.scene.restart()
        }
        this.physics.collide(this.dog, this.abejas, choqueAbeja);
        this.physics.collide(this.dog, this.abejas2, choqueAbeja);
        this.physics.collide(this.dog, this.abejas3, choqueAbeja);


    }
}

export default NivelA4;