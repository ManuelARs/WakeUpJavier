class NivelC6 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC6'
        });
    }

    init(data) {
        console.log('Escena NivelC6');
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
        this.physics.world.setBounds(0,0,1580, 730)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

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

        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC6/NivelC6').setDepth(-2).setScale(.38,.32);
        
        //OBJETOS
        this.palacio = this.add.image(1315, 435, 'NivelC6/palacioEnemigo').setScale(0.3);
        this.puerta = this.physics.add.image(1380, 691, 'NivelC6/puerta').setScale(0.33);
        this.puerta.setPushable(false);
        this.puerta.body.setAllowGravity(false);

        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;

        
        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.puerta, () => {this.scene.start('NivelC7', { score:this.life, musica: this.musicaFondo})
        // this.scene.start('NivelC7');
        });
        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.movimiento==0)
       {
           this.javier.anims.play('samuraiIdle');  
       }
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
    }

}

export default NivelC6;