class NivelB1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB1'
        });
    }

    init() {
        console.log('Escena NivelB1');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,670);

        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB1/NivelB1').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA
        this.movimiento = 1;

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(70, 500, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.47);
        this.javier.body.setSize(210, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //MonstruoAldea 1 
        this.monsterAl = this.physics.add.sprite(1300, 500, 'NivelB1/monsterAldea', 0).setAlpha(1).setDepth(3);
        this.monsterAl.body.setSize(120,130);
        this.monsterAl.body.setMass(1);
        this.monsterAl.setPushable(false);

        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });

         //COLISIONES
         this.javier.body.setCollideWorldBounds(true);
         this.monsterAl.body.setCollideWorldBounds(true);
         this.physics.add.collider(this.javier, this.monsterAl); //FALTA AGREGAR DIALOGO DE MOSNTRUOS

         //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
       //MOVIMIENTOS
       if(this.movimiento==1)
       {
           if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
           {
               this.javier.anims.play('monsterIdle',true);
           }
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
    }


}

export default NivelB1;