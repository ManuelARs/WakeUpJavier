class NivelC5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC5'
        });
    }

    init() {
        console.log('Escena NivelC5');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 730)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        
        //BANDERAS
        this.movimiento = 1;  

        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC5/NivelC5').setDepth(-2).setScale(.36,.35);
        
        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.12);
        this.javier.body.setSize(300, 400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        
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
              this.javier.anims.play('samuraiIdle',true); //Caminar
              this.javier.flipX=1;
           }
           else if (this.cursors.right.isDown)
           {
              this.javier.setVelocityX(200);
              this.javier.anims.play('samuraiIdle',true); //Caminar
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

export default NivelC5;