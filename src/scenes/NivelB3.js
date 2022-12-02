class NivelB3 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB3'
        });
    }

    init(data) {
        console.log('Escena NivelB3');
        console.log('init', data);
        this.musicaFondoB = data.musica;
        this.life = data.score;
    }

    // preload() {
    // }
    
    create() {
        this.registry.events.emit('desapareceHUD2');
        this.aciertos = 0
        this.textoContador = this.add.text(100, 2, ':0/9',{fontFamily: 'Consolas',color: 'white',fontSize: '30px'}).setDepth(10);;
        this.entrega = this.add.text(200, 2, 'Entrega las moras con la tecla "E"',{fontFamily: 'Consolas',color: 'white',fontSize: '30px'}).setDepth(10).setAlpha(0);

        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,730);
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB3/NivelB3').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA
        this.movimiento = 0;
        this.lastconversacion=0

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(70, 730, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.35);
        this.javier.body.setSize(130, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;
        //mounstruo
        this.monstruo = this.physics.add.image(200, 690, 'NivelB3/monstruo').setScale(0.5).setAlpha(1);
        this.monstruo.flipX=false;
        this.monstruo.body.setAllowGravity(true);
        this.monstruo.body.setMass(1);
        this.monstruo.setPushable(false);
        this.monstruo.setCollideWorldBounds(true);

        //CONVERSACIONES
        this.fondoDialogo = this.add.image(790, 135, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
        this.javierCara = this.add.image(125, 135, 'NivelB3/caraMonstruo').setScale(1.4).setAlpha(1);
        this.monstruoCara = this.add.image(1470, 135, 'NivelB3/monstruo_cara').setScale(0.5).setAlpha(0);
        this.dialogo1 = this.add.image(770, 135, 'NivelB3/dialogo3_1').setScale(0.7).setAlpha(1);
        this.dialogo2 = this.add.image(740, 135, 'NivelB3/dialogo3_2').setScale(0.5).setAlpha(0);
        this.dialogo3 = this.add.image(770, 135, 'NivelB3/dialogo3_3').setScale(0.5).setAlpha(0);
        
        //OBJETOS
        //troncos
        this.tronco1 = this.physics.add.image(200, 600, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco2 = this.physics.add.image(60, 450, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco3 = this.physics.add.image(190, 300, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco4 = this.physics.add.image(310, 420, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco5 = this.physics.add.image(460, 320, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco6 = this.physics.add.image(620, 450, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco7 = this.physics.add.image(790, 590, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco8 = this.physics.add.image(630, 200, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco9 = this.physics.add.image(800, 230, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco10 = this.physics.add.image(970, 437, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco11 = this.physics.add.image(950, 157, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco12 = this.physics.add.image(1190, 200, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco13 = this.physics.add.image(1190, 400, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco14 = this.physics.add.image(1320, 520, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco15 = this.physics.add.image(1520, 640, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco16 = this.physics.add.image(1450, 230, 'NivelB3/tronco', 0).setScale(1.2);

        this.troncos = [this.tronco1, this.tronco2, this.tronco3, this.tronco4, this.tronco5, this.tronco6, this.tronco7, this.tronco8, this.tronco9, this.tronco10, this.tronco11, this.tronco12, this.tronco13, this.tronco14, this.tronco15, this.tronco16]
        for(let tronco of this.troncos) {
            tronco.body.setSize(85, 20);
            tronco.setPushable(false);
            tronco.body.setAllowGravity(false);
            tronco.setDepth(-1)
        }

        //moras
        this.moraMarcador = this.add.image(80, 15, 'NivelB3/mora', 0).setScale(0.19);
        this.mora1 = this.physics.add.image(200, 550, 'NivelB3/mora', 0).setScale(0.3);
        this.mora2 = this.physics.add.image(40, 250, 'NivelB3/mora', 0).setScale(0.3);
        this.mora3 = this.physics.add.image(310, 370, 'NivelB3/mora', 0).setScale(0.3);
        this.mora4 = this.physics.add.image(540, 380, 'NivelB3/mora', 0).setScale(0.3);
        this.mora5 = this.physics.add.image(970, 370, 'NivelB3/mora', 0).setScale(0.3);
        this.mora6 = this.physics.add.image(1280, 300, 'NivelB3/mora', 0).setScale(0.3);
        this.mora7 = this.physics.add.image(1500, 420, 'NivelB3/mora', 0).setScale(0.3);
        this.mora8 = this.physics.add.image(1240, 600, 'NivelB3/mora', 0).setScale(0.3);
        this.mora9 = this.physics.add.image(1540, 60, 'NivelB3/mora', 0).setScale(0.3);

        this.moras = [this.mora1, this.mora2, this.mora3, this.mora4, this.mora5, this.mora6, this.mora7, this.mora8, this.mora9]
        for(let mora of this.moras) {
            mora.body.setSize(150, 150);
            mora.setPushable(false);
            mora.body.setAllowGravity(false);
        }
        //salida
        this.salida = this.physics.add.staticImage(1650, 740, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(100, 100);

        //DESPUES DE 4 SEGUNDOS
        setTimeout(() => {
            //dialogos
            this.dialogo1.setAlpha(0);
            this.dialogo2.setAlpha(1);
            this.javierCara.setAlpha(0);
            this.monstruoCara.setAlpha(1);
        }, 3000);
        setTimeout(() => {
            //tuercas
            this.tuerca1 = this.physics.add.image(1500, 800, 'NivelB3/tuerca', 0).setScale(0.4).setDepth(10);
            this.tuerca1.setVelocity(150, 850);
            this.tuerca1.setBounce(1, 1);
            this.tuerca1.setPushable(false);
            this.tuerca1.setCollideWorldBounds(true);

            this.tuerca3 = this.physics.add.image(1500, 800, 'NivelB3/tuerca', 0).setScale(0.4).setDepth(10);
            this.tuerca3.setVelocity(350, 1000);
            this.tuerca3.setBounce(1, 1);
            this.tuerca3.setPushable(false);
            this.tuerca3.setCollideWorldBounds(true);

            //Colision con tuerca
            this.physics.add.collider(this.javier, this.tuerca1, () => {
                this.javier.y = 900
                this.javier.x = 100
                this.tuerca1.x = 1500
                // this.tuerca2.x = 1500
                this.tuerca3.x = 1500
                //DAÑO QUITAR VIDA
                this.cameras.main.shake(700,0.005);
                this.life--;
                this.registry.events.emit('loseHeartB');
                if(this.life === 0) {
                    this.musicaFondoB.stop();
                    this.registry.events.emit('game_over');
                    this.scene.stop()
                }
                //this.scene.restart()
            });
            this.physics.add.collider(this.javier, this.tuerca3, () => {
                this.javier.y = 900
                this.javier.x = 100
                this.tuerca1.x = 1500
                // this.tuerca2.x = 1500
                this.tuerca3.x = 1500
                this.cameras.main.shake(700,0.005);
                this.life--;
                this.registry.events.emit('loseHeartB');
                if(this.life === 0) {
                    this.musicaFondoB.stop();
                    this.registry.events.emit('game_over');
                    this.scene.stop()
                }
                //this.scene.restart()
            });

            //dialogos
            this.fondoDialogo.setAlpha(0);
            this.dialogo2.setAlpha(0);
            this.monstruoCara.setAlpha(0);
            this.movimiento=1
            this.registry.events.emit('apareceHUD2');
        }, 7000);


        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        //this.monsterAl.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.tronco1); 
        this.physics.add.collider(this.javier, this.tronco2); 
        this.physics.add.collider(this.javier, this.tronco3); 
        this.physics.add.collider(this.javier, this.tronco4); 
        this.physics.add.collider(this.javier, this.tronco5); 
        this.physics.add.collider(this.javier, this.tronco6); 
        this.physics.add.collider(this.javier, this.tronco7); 
        this.physics.add.collider(this.javier, this.tronco8); 
        this.physics.add.collider(this.javier, this.tronco9); 
        this.physics.add.collider(this.javier, this.tronco10); 
        this.physics.add.collider(this.javier, this.tronco11); 
        this.physics.add.collider(this.javier, this.tronco12);
        this.physics.add.collider(this.javier, this.tronco13);  
        this.physics.add.collider(this.javier, this.tronco14);  
        this.physics.add.collider(this.javier, this.tronco15);  
        this.physics.add.collider(this.javier, this.tronco16);   

        this.physics.add.overlap(this.javier, this.mora1, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora2, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora3, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora4, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora5, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora6, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora7, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora8, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.mora9, collectMora, null, this);
        this.physics.add.overlap(this.javier, this.monstruo);

        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelB4', { score: this.life, musica: this.musicaFondoB });
        });

        function collectMora (jugador, objeto)
        {
            this.aciertos += 1;
            this.textoContador.setText(': ' + this.aciertos + '/9');
            objeto.disableBody(true, true)
        }

        //PRUEBAS----------------------------------------------
        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclado = Phaser.Input.Keyboard;

        this.input.keyboard.addKey(this.teclado.KeyCodes.E).on('down', () => {
            if(this.aciertos == 9 && this.javier.x > 150 && this.javier.x < 400 && this.javier.y > 500) {
                if(this.lastconversacion==0)
                {
                    this.javier.body.stop();
                    this.entrega.x = 2000
                    this.registry.events.emit('desapareceHUD2');
                    this.fondoDialogo.setAlpha(1);
                    this.dialogo3.setAlpha(1);
                    this.monstruoCara.setAlpha(1);
                    this.movimiento=0
                    this.tronco15.disableBody(true, true)
                    setTimeout(() => {
                        // this.scene.start('NivelB4');
                        this.movimiento=1
                        this.lastconversacion=1
                        this.fondoDialogo.setAlpha(0);
                        this.dialogo3.setAlpha(0);
                        this.monstruoCara.setAlpha(0);
                        this.aciertos = 0;
                        this.registry.events.emit('apareceHUD2');
                    }, 4000);
                }
            }

        });
 
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
       {
           this.javier.anims.play('monsterIdle',true);
       }
        if(this.movimiento==1) {
            if (this.cursors.left.isDown)
                {
                    this.javier.setVelocityX(-200);
                    this.javier.anims.play('monsterC',true);
                    this.javier.flipX=0;
                }
            else if (this.cursors.right.isDown)
                {
                    this.javier.setVelocityX(200);
                    this.javier.anims.play('monsterC',true);
                    this.javier.flipX=1;
                }
            else
            {
                this.javier.setVelocityX(0);
            }

            if ((this.cursors.up.isDown && this.javier.body.onFloor()))
                {
                    this.javier.setVelocityY(-500);
                }
        }


       if(this.aciertos == 9) {
            //dialogos
            if(this.javier.x > 200) {
                this.monstruo.flipX=true;
            }
            this.entrega.setAlpha(1)
            this.tuerca1.disableBody(true, true)
            this.tuerca3.disableBody(true, true)
       }
       
    }


}

export default NivelB3;