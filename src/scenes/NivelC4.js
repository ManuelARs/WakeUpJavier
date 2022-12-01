class NivelC4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC4'
        });
    }

    init() {
        console.log('Escena NivelC4');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 740)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

        //BANDERAS
        this.movimiento = 1;  

        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC4/NivelC4').setDepth(-2).setScale(.36,.32);

        //OBJETOS
        //Grupo estático de barras 
        this.barras = this.physics.add.staticGroup();
        this.barras.create(100,610, 'NivelC4/barra').refreshBody();
        this.barras.create(340,470, 'NivelC4/barra').refreshBody();
        this.barras.create(160,320, 'NivelC4/barra').refreshBody();
        this.barras.create(360,250, 'NivelC4/barra').refreshBody();
        this.barras.create(660,220, 'NivelC4/barra').setScale(.7,1).refreshBody();
        this.barras.create(870,360, 'NivelC4/barra').setScale(.5,1).refreshBody();
        this.muro = this.physics.add.image(1000, 460, 'NivelC4/muro').setDepth(-2).setScale(.36,.32);
        this.muro.body.setAllowGravity(false);
        this.muro.setPushable(false);
        
        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.12);
        // this.javier.body.setSize(300, 400);
        //this.javier.body.setOffset(1,-20);
        console.log(this.javier.body.offset)
        this.javier.body.setMass(1);
        // this.javier.refreshBody();
        this.javier.flipX=false;
        
        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        
        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.muro);
        this.physics.add.collider(this.javier, this.muro);
        this.physics.add.collider(this.javier, this.barras);

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

export default NivelC4;