class NivelC8 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC8'
        });
    }

    init(data) {
        console.log('Escena NivelC8');
        console.log('init', data);
        this.hud2 = data.hud;
        this.musicaFondo = data.musica;
        this.life = data.score
        if(this.hud2==1)
        {
            this.scene.launch('HUD');
        }
    }
    
    create() {
        //BANDERAS CONTROL DE PANEO
        this.paneo = 0;

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.fadeIn(1500);
        this.cameras.main.setBounds(0, 0, 1580, 780);

        //BANDERAS
        this.movimiento = 1; 
        //MUSICA
        if(this.hud!=1){
            // this.musicaFondo.resume()
        }
        if(this.hud2==1)
        {   
            this.musicaFondo = this.sound.add('nivelC',{loop:true});
            this.life = 10;
            // this.registry.events.emit('apareceHUD2');
            this.musicaFondo.play()
        }


        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 750);

        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 358, 'NivelC7/NivelC7').setDepth(-2).setScale(.37,.34);

        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 40, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setOffset(400,400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;
        
        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiEscalar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiE', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 6 });
        
        //GRUPO BARRAS ARRIBA
        this.barrasArriba = this.physics.add.staticGroup();
        this.barrasArriba.create(45,150, 'NivelC7/barra').setScale(0.3).refreshBody()
        this.barrasArriba.create(200,200, 'NivelC7/barra').setScale(0.1,0.3).refreshBody();
        this.barrasArriba.create(810,255, 'NivelC7/barra').setScale(0.3).refreshBody();
        this.barrasArriba.create(1430,150, 'NivelC7/barra').setScale(0.4,0.5).refreshBody();
        //CUERDA
        this.cuerda = this.add.image(600, 260, 'NivelC7/cuerda').setScale(0.7,0.3);
        //ESCALAR
        this.escalar = this.add.image(450, 300, 'NivelC7/escalar');
        this.escalar2 = this.add.image(1375, 190, 'NivelC7/escalar');
        
        //BarrasPicos
        this.barrasPicos = this.physics.add.staticGroup();
        this.barrasPicos.create(160,650, 'NivelC7/barra').setScale(0.2,0.3).refreshBody().disableBody(true,true); //BarraPicos1
        this.barrasPicos.create(490,550, 'NivelC7/barra').setScale(0.5,0.3).refreshBody(); //BarraPicos2
        this.barrasPicos.create(800,470, 'NivelC7/barra').setScale(0.3).refreshBody().disableBody(true,true); //BarraPicos3
        this.barrasPicos.create(1100,430, 'NivelC7/barra').setScale(0.3).refreshBody(); //BarraPicos4
        this.barrasPicos.create(1480,420, 'NivelC7/barra').setScale(0.6).refreshBody();  //BarraPicos5
        this.barrasPicos.create(1500,710, 'NivelC7/barra').setScale(0.45,0.5).refreshBody(); //Barra Picos6
        
        //PICOS
        this.picos = this.physics.add.image(890, 750, 'NivelC7/picos').setScale(0.45,0.35).setAlpha(0);
        this.picos.setPushable(false);
        this.picos.body.setAllowGravity(false);
        this.picos2 = this.physics.add.image(1480, 400, 'NivelC7/picos2').setScale(0.17,0.2);
        this.picos2.setPushable(false);
        this.picos2.body.setAllowGravity(false);
        //Torres
        this.torres = this.physics.add.staticGroup();
        this.torres.create(900, 700, 'NivelC7/torre1').setScale(1).refreshBody().disableBody(true,true);
        this.torres.create(1110, 700, 'NivelC7/torre1').setScale(1).refreshBody().disableBody(true,true);
        this.torres.create(1400, 580, 'NivelC7/torre1').setScale(1,2.2).refreshBody();
        
        //Puerta
        this.puerta = this.physics.add.image(1500, 645, 'NivelC7/puerta').setScale(0.3);
        this.puerta.body.setAllowGravity(false);
        this.puerta.body.setImmovable(true);

        //COLECCIONABLES
        this.objeto = this.physics.add.image(1450,100,'NivelC7/mascara').setScale(.5);
        this.objeto.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto, collectObjeto1, null, this);
        this.objeto2 = this.physics.add.image(1450,190,'NivelC7/mascara').setScale(.5);
        this.objeto2.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto2, collectObjeto2, null, this);
        this.objeto3 = this.physics.add.image(20,450,'NivelC7/mascara').setScale(.5);
        this.objeto3.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto3, collectObjeto3, null, this);
        
        function collectObjeto1 (jugador, objeto)
        {
            objeto.disableBody(true, true);
            //console.log("Entro a collectObjeto");
            this.torres.getChildren()[0].enableBody(false,0,0,true,true);
            // this.registry.events.emit('getStar',1);
        }

        function collectObjeto2(jugador, objeto)
        {
            objeto.disableBody(true, true);
            this.barrasPicos.getChildren()[0].enableBody(false,0,0,true,true);
            this.barrasPicos.getChildren()[2].enableBody(false,0,0,true,true);
            this.torres.getChildren()[1].enableBody(false,0,0,true,true);
            // this.registry.events.emit('getStar',1);
        }

        function collectObjeto3(jugador, objeto)
        {
            objeto.disableBody(true, true);
            this.barrasPicos.getChildren()[2].disableBody(true,true);
            this.torres.getChildren()[2].disableBody(true,true);
            // this.registry.events.emit('getStar',1);
        }
    
        //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalar2, true );
        this.physics.add.existing(this.cuerda, true );
        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        //COLISIÓN ESCALAR 2
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });

        this.physics.add.collider(this.javier, this.escalar2, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        //COLISIÓN BARRAS PICOS
        this.physics.add.collider(this.javier, this.barrasPicos);

        //COLISIÓN TORRES
        this.physics.add.collider(this.javier, this.torres);

        //COLISIÓN BARRAS ARRIBA
        this.physics.add.collider(this.javier, this.barrasArriba);
        this.physics.add.collider(this.javier, this.cuerda, () => {
            this.javier.setVelocityX(0);
            this.javier.setAccelerationX(0);
        });
        //COLISIÓN CON PICOS
        this.physics.add.collider(this.javier, this.picos, () => {
            this.cameras.main.shake(500,0.008);
            this.life--;
            this.registry.events.emit('loseHeartB');
            if(this.life === 0) {
                this.musicaFondo.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
            this.javier.body.x=50;
            this.javier.body.y=10;
        });
        this.physics.add.collider(this.javier, this.picos2, () => {
            this.cameras.main.shake(500,0.008);
            this.life--;
            this.registry.events.emit('loseHeartB');
            if(this.life === 0) {
                this.musicaFondo.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
            this.javier.body.x=50;
            this.javier.body.y=10;
        });
        //COLISIÓN CON PUERTA / FINAL DE NIVEL
        this.physics.add.collider(this.javier, this.puerta, () => {
            // this.sound.pauseAll();
            // this.registry.events.emit('YouWin');
            // this.scene.start('NivelC9');
            this.scene.start('NivelC9', { score:this.life, musica: this.musicaFondo})
        });

        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        //MOVIMIENTOS
        if(this.movimiento==1)
        {
            if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
            {
               this.javier.anims.play('samuraiIdle',true);
            }
            if (this.cursors.left.isDown)
            {
               this.javier.setVelocityX(-200);
               this.javier.anims.play('samuraiCaminar',true); //Caminar
               this.javier.flipX=1;
            }
            else if (this.cursors.right.isDown)
            {
               this.javier.setVelocityX(200);
               this.javier.anims.play('samuraiCaminar',true); //Caminar
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
        }
        if(this.movimiento==0)
        {
            this.javier.anims.play('samuraiIdle');  
        }
        if (this.cursors.up.isDown && this.escalar.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.anims.play('samuraiEscalar',true); //Escalar
            this.javier.y -= 3;
        }

        if (this.cursors.up.isDown && this.escalar2.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.anims.play('samuraiEscalar',true); //Escalar
            this.javier.y -= 3;
        }

    }
}

    export default NivelC8;