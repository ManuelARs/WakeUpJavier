class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'NivelC9/estrella');
    }

    fire (x, y)
    {
        this.body.reset(x, y);
        this.setScale(0.5);

        let randomIzq = Math.random() * (1000 - 5) + 5;
        let randomArr = Math.random() * (1000 - 100) + 100;
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-randomIzq);
        this.setVelocityX(-randomArr);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 2000,
            key: 'HUD/coleccionable',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}
class NivelC9 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC9'
        });
        this.bullets;
        this.ship;
    }

    init(data) {
        console.log('Escena NivelC9');
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
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 750);
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        
        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC9/NivelC9').setDepth(-2).setScale(.36,.32);
        //BANDERAS CONTROL DE PANEO
        this.paneo = 0;

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.fadeIn(1500);
        this.cameras.main.setBounds(0, 0, 1580, 780);

        //BANDERAS
        this.movimiento = 1; 
        this.ninjamove=0;
        this.ninjaGolpe=0;
        this.timer=0
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

        //PERSONAJES
        //Javier Samurai 100 300
        this.javier = this.physics.add.sprite(100, 300, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setOffset(400,400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;

        this.ninja = this.physics.add.sprite(1500, 150, 'Ninja', 0).setAlpha(1).setDepth(3).setScale(2);
        this.ninja.body.setSize(50, 50);
        // this.ninja.body.setOffset(400,400);
        this.ninja.body.setMass(1);
        this.ninja.body.setAllowGravity(false);
        this.ninja.setPushable(false);
        this.ninja.flipX=false;

        //OBJETOS ESTRELLAS NINJAS
        this.bullets = new Bullets(this);

        
        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 12 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiEscalar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiE', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 6 });

        this.anims.create({ key: 'ninjaC', frames: this.anims.generateFrameNames('Ninja', { prefix: 'ninjaClimb', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'ninjaT', frames: this.anims.generateFrameNames('Ninja', { prefix: 'ninjaThrow', suffix: '.png', start: 1, end: 11 }), repeat: 0, frameRate: 6 });
        this.ninja.anims.play('ninjaC',true);
        
        //ESCALAR
        this.escalar = this.add.image(1550, 190, 'NivelC7/escalar');
        this.escalar2 = this.add.image(1550, 300, 'NivelC7/escalar');
        this.escalar3 = this.add.image(1550, 410, 'NivelC7/escalar');
        this.escalar4 = this.add.image(1550, 520, 'NivelC7/escalar');
        this.escalar5 = this.add.image(1550, 630, 'NivelC7/escalar');
        
        //PICOS
        this.picos = this.physics.add.image(890, 750, 'NivelC7/picos').setScale(0.45,0.35);
        this.picos.setPushable(false);
        this.picos.body.setAllowGravity(false);
        
        //Puerta
        this.puerta = this.physics.add.staticGroup();
        this.puerta.create(1540, 80, 'NivelC7/puerta').setScale(0.3).refreshBody()
        .disableBody(true,true);

        //BASE/PISOS
        // this.barra = this.physics.add.image(100, 400, 'NivelC9/barra').setScale(0.3);
        // this.barra.body.setAllowGravity(false);
        // this.barra.body.setImmovable(true);

        this.barra = this.physics.add.staticGroup();
        this.barra.create(100, 400, 'NivelC9/barra').setScale(0.3).refreshBody();
        
        this.barra.create(450, 350, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(750, 300, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(1040, 250, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(1200, 200, 'NivelC9/barra').setScale(0.3).refreshBody();
        //BARRAS BAJAS
        this.barra.create(360, 550, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(650, 600, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(1000, 650, 'NivelC9/barra').setScale(0.3).refreshBody();
        this.barra.create(1300, 700, 'NivelC9/barra').setScale(0.3).refreshBody();

    
        //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalar2, true );
        this.physics.add.existing(this.escalar5, true );
        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        
        // COLISIÓN ESCALAR 2
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });

        this.physics.add.collider(this.javier, this.escalar2, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.bullets, () => {
            this.cameras.main.shake(500,0.008);
            this.life--;
            this.registry.events.emit('loseHeartC');
            if(this.life === 0) {
                this.musicaFondo.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
            this.javier.body.x=50;
            this.javier.body.y=300;
        });

        //COLISIÓN BARRAS PICOS
        this.physics.add.collider(this.javier, this.barra);

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
            this.registry.events.emit('loseHeartC');
            if(this.life === 0) {
                this.musicaFondo.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
            this.javier.body.x=50;
            this.javier.body.y=300;
        });
        this.physics.add.collider(this.javier, this.picos2, () => {
            this.cameras.main.shake(500,0.008);
            this.life--;
            this.registry.events.emit('loseHeartC');
            if(this.life === 0) {
                this.musicaFondo.stop();
                this.registry.events.emit('game_over');
                this.scene.stop()
            }
            this.javier.body.x=50;
            this.javier.body.y=300;
        });

        //GOLPE SAMURAI A NINJA
        this.physics.add.collider(this.javier, this.ninja, () => {
            this.movimiento=2
            console.log("Golpe")
            this.ninja.setTint(0x880808)
            this.javier.anims.play('samuraiG',true);
            this.javier.setVelocityY(-900);
            this.javier.setVelocityX(-2000);
            this.ninjaGolpe++
            console.log(this.ninjaGolpe)
            setTimeout(() => {
                this.movimiento=1
                this.ninja.clearTint()
            }, 1000);
            this.cameras.main.shake(500,0.008);
            console.log(this.ninjamove)
            if(this.ninjaGolpe==5)
            {
                this.puerta.getChildren()[0].enableBody(false,0,0,true,true);
                this.ninja.body.setAllowGravity(true);
            }
            if(this.ninjamove==0)
            {
                this.add.tween({
                    targets: [this.ninja],
                    y: 600,
                    duration: 2000,
                    onStart: () => {
                        this.ninja.anims.play('ninjaC',true);               
                    },
                    onComplete: () => {
                        this.ninja.anims.play('ninjaT',true);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);                    
                    }
                });
            }
            if(this.ninjamove==1)
            {
                console.log("Entra tween subir")
                this.add.tween({
                    targets: [this.ninja],
                    y: 150,
                    duration: 2000,
                    onStart: () => {
                        this.ninja.anims.play('ninjaC',true);               
                    },
                    onComplete: () => {
                        this.ninja.anims.play('ninjaT',true);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);
                        this.bullets.fireBullet(this.ninja.x, this.ninja.y);                   
                    }
                });
                this.ninjamove=0
            }

        });

        //COLISIÓN CON PUERTA / FINAL DE NIVEL
        this.physics.add.collider(this.javier, this.puerta, () => {
            // this.sound.pauseAll();
            // this.registry.events.emit('YouWin');
            this.scene.start('NivelC10', { score:this.life, musica: this.musicaFondo})
            // this.scene.start('NivelC10');
        });

        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }


    update(time, delta) {
        this.timer += delta;
        while (this.timer > 3000) {
            this.ninja.anims.play('ninjaT',true);
            this.bullets.fireBullet(this.ninja.x, this.ninja.y);
            this.bullets.fireBullet(this.ninja.x, this.ninja.y);
            this.bullets.fireBullet(this.ninja.x, this.ninja.y);
            this.bullets.fireBullet(this.ninja.x, this.ninja.y);
            this.timer=0;
        }
        //MOVIMIENTOS
        // let randomEstrella = Math.random() * (100 - 1) + 1;
        // console.log(randomEstrella)
        // if(parseInt(randomEstrella)==1)
        // {
        //     this.bullets.fireBullet(this.ninja.x, this.ninja.y);
        // }
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

        if(this.ninja.y==600)
        {
            this.ninjamove=1;
        }
        if(this.ninja.y==150)
        {
            this.ninjamove=0;
        }

    }

}

export default NivelC9;