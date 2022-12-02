class  NivelA4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA4'
        });
    }

    init(data) {
        console.log('Escena NivelA4')
        this.scene.launch('HUD');
        console.log('init', data);
        this.musicaFondoA = data.musica;
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('abeja', 'NivelA4/abeja.png');
    }

    create() {
      //BANDERA MOVIMIENTO
      this.movimientoGata = 1
      this.caePanal = false;
      this.movimiento=0
      //console.log(this.scene.manager.scenes)
      
      //MUSICA
      this.musicaFondoA.pause();
      this.musicaAbejas = this.sound.add('abejaM',{loop:true});
      this.musicaAbejas.play();
      
      //VIDAS
      this.life = 3;
      
      //BOUNDS PARA PERSONAJES
      this.physics.world.setBounds(0,0,1580, 700);
      
      //CAMARA INICIAL EFECTO FADE IN
      this.cameras.main.setBounds(0, 0, 1580, 780);
      this.cameras.main.fadeIn(1000);
     
      //Imagen de Fondo
      this.fondo = this.add.image(775, 370, 'NivelA4/NivelA4').setDepth(-2).setScale(.4,.35);
      
      //OBJETOS
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
      this.gata = this.physics.add.sprite(250, 610, 'Gata', 0).setScale(3)
      this.gata.body.setSize(20, 55);
      this.gata.body.setMass(1);
      this.gata.setPushable(false);
      this.gata.flipX=true;
      //this.gata.flipX = true;

      //ANIMACIONES
      this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
      this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
      this.anims.create({ key: 'gataC', frames: this.anims.generateFrameNames('Gata', { prefix: 'gataC', suffix: '.png', start: 1, end: 6 }), repeat: -1, frameRate: 8 });
      this.anims.create({ key: 'gataIdle', frames: this.anims.generateFrameNames('Gata', { prefix: 'gataIdle', suffix: '.png', start: 1, end:4 }), repeat: -1, frameRate: 4 });
      this.anims.create({ key: 'dogSalto', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogSalto', suffix: '.png', start: 1, end:4 }), repeat: 0, frameRate: 4 });
      
      //DIÁLOGOS
      this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
      this.dogCara = this.add.image(125, 125, 'NivelA1/dogCara').setScale(1).setAlpha(0);
      this.gataCara = this.add.image(1500, 125, 'NivelA1/gataCara').setScale(1.2).setAlpha(1);
      this.dialogo1 = this.add.image(770, 125, 'NivelA4/dialogo4_1').setScale(0.7).setAlpha(1);
      this.dialogo2 = this.add.image(790, 125, 'NivelA4/dialogo4_2').setScale(0.7).setAlpha(0);
      
      //ABEJAS Y SUS TWEENS
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
          abejas.setPushable(false);
          abejas.disableBody(true, true);
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
          abejas.setPushable(false);
          abejas.disableBody(true, true);
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
          abejas.setPushable(false);
          abejas.disableBody(true, true);
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

      //DIALOGOS Y TWEEN DE GATA
      setTimeout(() => {
        this.gataCara.setAlpha(0);
        this.fondoDialogo.setAlpha(0);
        this.dialogo1.setAlpha(0);
        this.gata.flipX = true;
        //TWEEN QUE LLEVA A LA GATA AL ÁRBOL
        this.tweens = this.add.tween({
          targets: [this.gata],
          x: 1270,
          duration: 3000,
          onStart: () => {
            this.movimientoGata = 0
            this.gata.anims.play('gataC',true);
            this.gata.flipX=false;
          },
          onComplete: () => {
                  this.cameras.main.shake(800,0.0009);
                  //TWEEN QUE LLEVA A LA GATA AL FINAL DE ESCENA
                  this.tweens = this.add.tween({
                    targets: [this.gata],
                    x: 1500,
                    duration: 2000,
                    onComplete: () => {
                            this.movimientoGata = 1
                            this.gata.flipX=false;
                            this.fondoDialogo.setAlpha(1);
                            this.dialogo2.setAlpha(1);
                            this.gataCara.setAlpha(1);
                            setTimeout(() => {
                              this.fondoDialogo.setAlpha(0);
                              this.dialogo2.setAlpha(0);
                              this.gataCara.setAlpha(0);
                              this.movimiento=1
                              this.registry.events.emit('apareceHUD');
                            }, 4000);
                        }
                  });
              },
        });
      }, 4000);
      
      //COLISIONES
      this.dog.body.setCollideWorldBounds(true);
      this.gata.body.setCollideWorldBounds(true);
      this.panal.body.setCollideWorldBounds(true);
      
      //COLISIÓN MESA CON PERRO 
      this.physics.add.collider(this.dog, this.mesa, () => {});
      
      //COLISIÓN CON ABEJAS
      //FUNCIÓN PARA VIBRACIÓN DE CÁMARA Y REINICIO DE DOG
      let choqueAbeja = () => {
          //EFECTO DE VIBRACIÓN EN CÁMARA
          this.cameras.main.shake(700,0.005);
          this.life--;
          this.registry.events.emit('loseHeart');
          if(this.life === 0) {
                this.musicaAbejas.stop();
                this.registry.events.emit('Musica',this.musicaFondoA);
                this.registry.events.emit('game_over');
                this.scene.stop()
          }
          this.dog.x = 100;
      };
      this.physics.add.collider(this.dog, this.abejas, () => {
        choqueAbeja();
      });
      this.physics.add.collider(this.dog, this.abejas2, () => {
        choqueAbeja();
      });
      this.physics.add.collider(this.dog, this.abejas3, () => {
        choqueAbeja();
      });
      //COLISIÓN JAVIER CON GATA
      this.physics.add.collider(this.dog, this.gata, () => {
        this.movimiento=0
        this.dog.body.stop();
        this.registry.events.emit('desapareceHUD');
        this.musicaAbejas.stop();
        this.scene.start('NivelA5', { score: this.life, musica: this.musicaFondoA });
      });
      
      //Teclado
      this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {
        if(this.movimientoGata)
        {
            this.gata.anims.play('gataIdle',true);
        }
        //MOVIMIENTOS
        if(this.movimiento==0)
        {
            this.dog.anims.play('dogIdle',true);
        }
        if(this.movimiento==1)
        {
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
                this.dog.anims.play('dogSalto',true);
                this.dog.setVelocityY(-500);
            }
        }
        if(this.gata.x > 1450) {
            // se cae panal y se crean los grupos de las abejas
            this.panal.body.setAllowGravity(true);
            this.panal.angle = 40;
            //AL CAER EL PANAL, LAS ABEJAS SE ACTIVAN
            this.abejas.children.iterate((abeja) => {
              abeja.enableBody(false,0,0,true,true);
            });
            this.abejas2.children.iterate((abeja) => {
              abeja.enableBody(false,0,0,true,true);
            });
            this.abejas3.children.iterate((abeja) => {
              abeja.enableBody(false,0,0,true,true);
            });
          }   
    }
}

export default NivelA4;