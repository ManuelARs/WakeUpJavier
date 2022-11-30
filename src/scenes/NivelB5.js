class NivelB5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB5'
        });
    }

    init() {
        console.log('Escena NivelB5');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,710);
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB5/NivelB5_2').setDepth(-2).setScale(.37,.35);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        //BANDERA
        this.movimiento = 1;
        //OBJETOS
        //tierra
        this.tierra = this.physics.add.image(120, 200, 'NivelB5/tierra');
        this.tierra.body.setAllowGravity(false);
        this.tierra.setPushable(false);
        this.tierra2 = this.physics.add.image(1215, 745, 'NivelB5/tierra3').setScale(1.32,1);
        this.tierra2.body.setAllowGravity(false);
        this.tierra2.setPushable(false);
        //tierra pequeña 
        this.tierraP = this.physics.add.image(420, 300, 'NivelB5/tierra2').setScale(.35);
        this.tierraP.body.setAllowGravity(false);
        this.tierraP.setPushable(false);
        this.tierraP2 = this.physics.add.image(680, 400, 'NivelB5/tierra2').setScale(.35);
        this.tierraP2.body.setAllowGravity(false);
        this.tierraP2.setPushable(false);
        this.tierraP3 = this.physics.add.image(900, 500, 'NivelB5/tierra2').setScale(.35);
        this.tierraP3.body.setAllowGravity(false);
        this.tierraP3.setPushable(false);
        //Pino
        this.pino = this.physics.add.image(50, 97, 'NivelB5/pino').setScale(1.5);
        this.pino.body.setAllowGravity(false);
        this.pino.setPushable(false);
        //agua
        this.pino = this.physics.add.image(50, 97, 'NivelB5/pino').setScale(1.5);
        this.pino.body.setAllowGravity(false);
        this.pino.setPushable(false);       
        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(120, 120, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.3);
        this.javier.body.setSize(210, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;
        //ANIMACIONES
        this.anims.create({ key: 'monsterC', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruo', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'monsterIdle', frames: this.anims.generateFrameNames('Monster', { prefix: 'monstruoIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.tierra);
        this.physics.add.collider(this.javier, this.tierra2);
        this.physics.add.collider(this.javier, this.tierraP);
        this.physics.add.collider(this.javier, this.tierraP2);
        this.physics.add.collider(this.javier, this.tierraP3);
        this.physics.add.collider(this.javier, this.tierra2);

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

export default NivelB5;