class NivelB3 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB3'
        });
    }

    init() {
        console.log('Escena NivelB3');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,730);
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB3/NivelB3').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA
        this.movimiento = 1;

        //PERSONAJES
        //Javier Monstruo 
        this.javier = this.physics.add.sprite(70, 730, 'Monster', 0).setAlpha(1).setDepth(3).setScale(0.35);
        this.javier.body.setSize(210, 260);
        this.javier.body.setMass(1);
        this.javier.flipX=true;

        //OBJETOS
        //troncos
        this.tronco1 = this.physics.add.image(200, 600, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco1.body.setSize(85, 20);
        this.tronco1.setPushable(false);
        this.tronco1.body.setAllowGravity(false);
        this.tronco2 = this.physics.add.image(60, 450, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco2.body.setSize(85, 20);
        this.tronco2.setPushable(false);
        this.tronco2.body.setAllowGravity(false);
        this.tronco3 = this.physics.add.image(190, 300, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco3.body.setSize(85, 20);
        this.tronco3.setPushable(false);
        this.tronco3.body.setAllowGravity(false);
        this.tronco4 = this.physics.add.image(310, 420, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco4.body.setSize(85, 20);
        this.tronco4.setPushable(false);
        this.tronco4.body.setAllowGravity(false);
        this.tronco5 = this.physics.add.image(460, 320, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco5.body.setSize(85, 20);
        this.tronco5.setPushable(false);
        this.tronco5.body.setAllowGravity(false);
        this.tronco6 = this.physics.add.image(620, 450, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco6.body.setSize(85, 20);
        this.tronco6.setPushable(false);
        this.tronco6.body.setAllowGravity(false);
        this.tronco7 = this.physics.add.image(790, 590, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco7.body.setSize(85, 20);
        this.tronco7.setPushable(false);
        this.tronco7.body.setAllowGravity(false);
        this.tronco8 = this.physics.add.image(630, 200, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco8.body.setSize(85, 20);
        this.tronco8.setPushable(false);
        this.tronco8.body.setAllowGravity(false);
        this.tronco9 = this.physics.add.image(800, 230, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco9.body.setSize(85, 20);
        this.tronco9.setPushable(false);
        this.tronco9.body.setAllowGravity(false);
        this.tronco10 = this.physics.add.image(970, 437, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco10.body.setSize(85, 20);
        this.tronco10.setPushable(false);
        this.tronco10.body.setAllowGravity(false);
        this.tronco11 = this.physics.add.image(970, 157, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco11.body.setSize(85, 20);
        this.tronco11.setPushable(false);
        this.tronco11.body.setAllowGravity(false);
        this.tronco12 = this.physics.add.image(1190, 200, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco12.body.setSize(85, 20);
        this.tronco12.setPushable(false);
        this.tronco12.body.setAllowGravity(false);
        this.tronco13 = this.physics.add.image(1190, 400, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco13.body.setSize(85, 20);
        this.tronco13.setPushable(false);
        this.tronco13.body.setAllowGravity(false);
        this.tronco14 = this.physics.add.image(1320, 520, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco14.body.setSize(85, 20);
        this.tronco14.setPushable(false);
        this.tronco14.body.setAllowGravity(false);
        this.tronco15 = this.physics.add.image(1520, 630, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco15.body.setSize(85, 20);
        this.tronco15.setPushable(false);
        this.tronco15.body.setAllowGravity(false);
        this.tronco16 = this.physics.add.image(1500, 230, 'NivelB3/tronco', 0).setScale(1.2);
        this.tronco16.body.setSize(85, 20);
        this.tronco16.setPushable(false);
        this.tronco16.body.setAllowGravity(false);

        //moras
        this.mora1 = this.physics.add.image(200, 550, 'NivelB3/mora', 0).setScale(0.3);
        this.mora1.body.setSize(150, 150);
        this.mora1.setPushable(false);
        this.mora1.body.setAllowGravity(false);
        this.mora2 = this.physics.add.image(40, 250, 'NivelB3/mora', 0).setScale(0.3);
        this.mora2.body.setSize(150, 150);
        this.mora2.setPushable(false);
        this.mora2.body.setAllowGravity(false);

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

export default NivelB3;