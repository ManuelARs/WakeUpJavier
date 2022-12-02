class NivelA5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA5'
        });
    }

    init(data) {
        console.log('Escena NivelA5');
        console.log('init', data);
        this.life = data.score;
        this.musicaFondoA = data.musica;
        this.hud = data.hud
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('abeja', 'NivelA4/abeja.png');
    }
    

    create() {
        //ACIERTOS
        this.aciertos = 0
        this.textoContador = this.add.text(100, 2, 'GOLPES: 0/3',{fontFamily: 'Consolas',color: 'black',fontSize: '30px'}).setDepth(10);;

        //BANDERA MOVIMIENTO
        this.movimiento=0
        
        //MUSICA
        this.musicaFondoA.resume()
        if(this.hud==1)
        {
          // this.musicaFondoA = this.sound.add('nivel1M',{loop:true});
          this.musicaFondoA.play();
        }
        this.registry.events.emit('Musica',this.musicaFondoA);

        //FONDO
        this.fondo = this.add.image(770, 360, 'NivelA5/nivelA5').setDepth(-2).setScale(.37,.35);
        this.physics.world.setBounds(0,0,1580, 700);
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        
        //PERSONAJES
        //Perro Javier
        this.dog = this.physics.add.sprite(250, 610, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
        this.dog.flipX = true
        //Gata Mia
        this.gata = this.physics.add.sprite(100, 610, 'Gata', 0).setScale(3)
        this.gata.body.setSize(20, 55);
        this.gata.body.setMass(1);
        this.gata.setPushable(false);
        this.gata.flipX=false;
        //Pastor aleman
        this.dogB = this.physics.add.sprite(1700, 610, 'DogB', 0).setScale(3);
        this.dogB.body.setSize(48, 70);
        this.dogB.body.setMass(1);
        this.dogB.setPushable(false);
        this.dogB.disableBody(false, false)
        //hidrante
        this.hidrante = this.physics.add.image(800, 620, 'NivelA5/hidrante', 0).setScale(1.8);
        this.hidrante.body.setSize(30, 70);
        this.hidrante.setPushable(false);
        //tronco
        this.tronco = this.physics.add.image(650, 660, 'NivelA5/tronco', 0).setScale(1.5);
        this.tronco.body.setSize(60, 55);
        this.tronco.setPushable(true);
        //hueso
        this.hueso = this.physics.add.image(800, 320, 'NivelA5/hueso', 0).setScale(0.65);
        this.hueso.body.setSize(200, 130);
        this.hueso.setPushable(false);
        this.hueso.body.setAllowGravity(false);
        //salida
        this.salida = this.physics.add.staticImage(1695, 690, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(150, 1100);
        
        //CONVERSACIONES
        this.fondoDialogo = this.add.image(790, 135, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
        this.dogCara = this.add.image(125, 135, 'NivelA1/dogCara').setScale(1).setAlpha(0);
        this.gataCara = this.add.image(1500, 135, 'NivelA1/gataCara').setScale(1.2).setAlpha(1);
        this.pastorCara = this.add.image(1500, 135, 'NivelA5/pastorCara').setScale(1.2).setAlpha(0);
        this.dialogo1 = this.add.image(770, 135, 'NivelA5/dialogo5_1').setScale(0.7).setAlpha(1);
        this.dialogo2 = this.add.image(790, 135, 'NivelA5/dialogo5_2').setScale(0.7).setAlpha(0);
        this.registry.events.emit('desapareceHUD');
        
        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'pastorC', frames: this.anims.generateFrameNames('DogB', { prefix: 'pastor', suffix: '.png', start: 1, end: 8 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'pastorIdle', frames: this.anims.generateFrameNames('DogB', { prefix: 'pastorIdle', suffix: '.png', start: 1, end:4 }), repeat: -1, frameRate: 4 });
        this.anims.create({ key: 'gataC', frames: this.anims.generateFrameNames('Gata', { prefix: 'gataC', suffix: '.png', start: 1, end: 6 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'gataIdle', frames: this.anims.generateFrameNames('Gata', { prefix: 'gataIdle', suffix: '.png', start: 1, end:4 }), repeat: -1, frameRate: 4 });
        this.anims.create({ key: 'dogSalto', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogSalto', suffix: '.png', start: 1, end:4 }), repeat: 0, frameRate: 4 });
        
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        this.dogB.body.setCollideWorldBounds(true);
        this.hidrante.body.setCollideWorldBounds(true);
        this.tronco.body.setCollideWorldBounds(true);
        this.hueso.body.setCollideWorldBounds(true);

        //Colision con gatita
        this.physics.add.collider(this.dog, this.gata);
        //Colision con tronco
        this.physics.add.collider(this.dog, this.tronco);
        this.physics.add.collider(this.dog, this.dogB);
        this.physics.add.collider(this.dog, this.hidrante);
        this.physics.add.collider(this.tronco, this.hidrante, () => {
          this.hidrante.body.stop();
          this.tronco.x=726.5
      });
        //Colision con HUESO
        this.physics.add.collider(this.dog, this.hueso, () => {
            this.aciertos += 1;
            this.textoContador.setText('GOLPES: ' + this.aciertos + '/3');
            this.hueso.setTint(0xFFFF00);
            setTimeout(() => {
              this.hueso.clearTint();
            }, 500);
        });
        //Grupo de abejitas
        this.abejas = this.physics.add.group({
            key: 'abeja',
            repeat: 3,
            setXY: {
              x: 1400,
              y: 680,
              stepY: -40,
              stepX: 10
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
            duration: 3000,
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
        
        //SEGUNDO GRUPO
        this.abejas2 = this.physics.add.group({
            key: 'abeja',
            repeat: 3,
            setXY: {
              x: 1500,
              y: 500,
              stepY: -40,
              stepX: 10
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
            x: 1400,
            yoyo: true,
            duration: 3000,
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

        //DIÁLOGOS
        setTimeout(() => {
            this.fondoDialogo.setAlpha(0);
            this.dialogo1.setAlpha(0);
            this.gataCara.setAlpha(0);
            this.movimiento=1
            this.registry.events.emit('apareceHUD');
            //this.fondoDialogo.setAlpha(1);
            //this.dialogo2.setAlpha(1);
        }, 4000);

        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.dog, this.salida, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.scene.start('NivelA6',{ score: this.life, musica: this.musicaFondoA });
        });
        
        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
        if(this.gata.body.onFloor())
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
        //MOVIMIENTOS PERRO MALO
        //if(this.dogB.body.onFloor())
        //{
            //this.dogB.anims.play('pastorIdle',true);
        //}
     
        //COLISION CON ABEJAS
        let choqueAbeja = (javier, abeja) => {
          this.cameras.main.shake(700,0.005);
          this.life--;
          this.registry.events.emit('loseHeart');
          if(this.life === 0) {
                this.musicaFondoA.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
          }
          this.dog.x=250
          this.dog.flipX=0;
        }
        this.physics.collide(this.dog, this.abejas, choqueAbeja);
        this.physics.collide(this.dog, this.abejas2, choqueAbeja);
        
        if(this.aciertos >= 3) {
            //this.abejas.disableBody(true, true)
            this.movimiento = 0
            this.dog.flipX=0
            this.dog.body.stop();
            this.dog.x=800
            this.dog.y=540
            this.abejas.children.iterate((abeja) => {
                abeja.disableBody(true, true)
              });
            //this.abejas2.children.iterate((abeja) => {
              //  abeja.disableBody(true, true)
            //});
            //this.dogB.setVelocityX(-200);
            //this.dogB.disableBody(false, false)
            this.hueso.disableBody(true,true)
            this.dogB.anims.play('pastorC',true);
            this.dogB.flipX=1;
            this.dogB.x -= 2
            if(this.dogB.x <= 1100) {
                this.aciertos = 0
                this.dogB.anims.play('pastorC',false);
                this.dogB.anims.play('pastorIdle',true);
                this.registry.events.emit('desapareceHUD');
                this.fondoDialogo.setAlpha(1);
                this.dialogo2.setAlpha(1);
                this.pastorCara.setAlpha(1);
                setTimeout(() => {
                    this.fondoDialogo.setAlpha(0);
                    this.dialogo2.setAlpha(0);
                    this.pastorCara.setAlpha(0);
                    this.dogB.anims.play('pastorIdle',false);
                    this.dogB.anims.play('pastorC',true);
                    this.dogB.flipX=0;
                    this.registry.events.emit('apareceHUD');
                    this.movimiento = 1
                    this.tweens = this.add.tween({
                        targets: [this.dogB],
                        x: 1750,
                        duration: 3000,
                        });
                }, 4000);
            }
            
            
        }
    }


}

export default NivelA5;