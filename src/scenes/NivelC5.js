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
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;
        this.javier.body.setOffset(400, 400)
        //maleta
        this.malo = this.physics.add.image(800, 740, 'NivelC5/ninja').setDepth(0).setScale(0.4);
        this.malo.body.setSize(150, 180);
        this.malo.body.setMass(1);
        this.malo.flipX=true;

        this.enemyFollows = () => {
            this.physics.moveToObject(this.malo, this.javier, 214);
        }


        //salida
        this.salida = this.physics.add.staticImage(1650, 740, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(100, 100);

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.malo.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.malo, () => {
            setTimeout(() => {
                if (this.malo.body.touching.up || this.malo.body.touching.right || this.malo.body.touching.left || this.malo.body.touching.down)
                {
                    this.javier.x = 60
                    this.javier.y = 740
                    this.malo.x = 800
                    this.malo.y = 740
                    this.cameras.main.shake(500, 0.008)
                }
            },450);
        });
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
            this.scene.start('NivelC6');
        });
        
        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
       //MOVIMIENTOS
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
      this.enemyFollows()
      if(this.javier.x > this.malo.x) {
        this.malo.flipX=false;
      } else {
        this.malo.flipX=true;
      }
    }

}

export default NivelC5;