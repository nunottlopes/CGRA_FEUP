/**
 * MyVehicle
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject {
  constructor(scene, terrain, x, y) {
    super(scene);

    this.terrain = terrain;

    this.wheelMovement = 0;
    this.wheelRotate = 0;
    this.car_velocity = 0;

    this.car_position_x = x || 0;
    this.car_position_z = y || 0;
    this.rotationY = 0;
    this.currentDirection = "none";

    
    this.trapezium = new MyTrapezium(this.scene);
    this.wheel = new MyWheel(this.scene, 8, 20);
    this.lamp = new MyLamp(this.scene, 8, 20);
    this.cylinder = new MyCylinder(this.scene,8,20);
    this.cube = new MyUnitCubeQuad(this.scene);

    this.materialDefault = new CGFappearance(scene);

    this.car_window_texture = new CGFappearance(scene);
    this.car_window_texture.loadTexture("../resources/images/car_window_texture.png");
		this.car_window_texture.setAmbient(0.6,0.6,0.9,1);
    this.car_window_texture.setDiffuse(0.6,0.6,0.9,1);
		this.car_window_texture.setSpecular(0.1,0.1,0.1,1);
  };

  drawCarComponents() {
    //Chassi
    this.scene.pushMatrix();
    this.scene.translate(-1.5,0.2,0);
    this.scene.scale(3, 0.7, 2);
		this.trapezium.display();
    this.scene.popMatrix();
    
    //Spoiler
    this.scene.pushMatrix();
    this.scene.translate(-0.4,0.5,-0.5);
    this.scene.scale(0.06,0.3,0.06);
    this.scene.rotate(-90 * degToRad,1,0,0);
    this.cylinder.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(-0.4,0.5,0.5);
    this.scene.scale(0.06,0.3,0.06);
    this.scene.rotate(-90 * degToRad,1,0,0);
    this.cylinder.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(-0.3,0.9,0);
    this.scene.scale(0.4,0.2,2.5);
    this.trapezium.display();
    this.scene.popMatrix();

    //Right Lamp
    this.scene.pushMatrix();
    this.scene.translate(-5.5,-0.05,-0.6);
    this.scene.scale(0.25,0.1,0.25);
    this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lamp.display();
    this.scene.popMatrix();
        
    //Left Lamp
    this.scene.pushMatrix();
    this.scene.translate(-5.5,-0.05,0.6);
    this.scene.scale(0.25,0.1,0.25);
    this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lamp.display();
    this.scene.popMatrix();
    
    //Windows
    this.car_window_texture.apply();
    this.scene.pushMatrix();
    this.scene.translate(-2.5,0.65,0);
    this.scene.scale(0.05,0.2,1);
    this.cube.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(-2.325,0.65,-0.5);
    this.scene.scale(0.4,0.2,0.05);
    this.scene.rotate(-180 * degToRad,0,1,0);
    this.trapezium.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(-2.325,0.65,0.5);
    this.scene.scale(0.4,0.2,0.05);
    this.scene.rotate(-180 * degToRad,0,1,0);
    this.trapezium.display();
    this.scene.popMatrix();

    //Front Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(-3.7,0,0.85);
    this.scene.scale(0.5, 0.5, 0.6);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.wheel.display();
    this.scene.popMatrix();

    //Front Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(-3.7,0,-1.45);
    this.scene.scale(0.5, 0.5, 0.6);
    this.scene.rotate(this.wheelRotate, 0, 1, 0);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Left Wheel
    this.scene.pushMatrix();
    this.scene.translate(-1,0.15,0.85);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Back Right Wheel
    this.scene.pushMatrix();
    this.scene.translate(-1,0.15,-1.45);
    this.scene.rotate(this.wheelMovement, 0, 0, 1);
    this.scene.scale(0.6, 0.6, 0.6);
    this.wheel.display();
    this.scene.popMatrix();

    //Right Lamp
    this.scene.pushMatrix();
    this.scene.translate(-5.5,-0.05,-0.6);
    this.scene.scale(0.25,0.1,0.25);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lamp.display();
    this.scene.popMatrix();

    //Left Lamp
    this.scene.pushMatrix();
    this.scene.translate(-5.5,-0.05,0.6);
    this.scene.scale(0.25,0.1,0.25);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.rotate(-65 * degToRad, 1, 0, 0);
    this.lamp.display();
    this.scene.popMatrix();
  }

  display(){
    this.scene.pushMatrix();
		this.scene.translate(this.car_position_x,0.5,this.car_position_z);
    this.scene.rotate(this.rotationY * degToRad, 0, 1, 0);  
    this.drawCarComponents();
    this.scene.popMatrix();
  }

  update(deltaTime) {
    
    let tempx = this.car_position_x + Math.cos(this.rotationY * degToRad) * (this.car_velocity * deltaTime * 1/50);
    let tempz = this.car_position_z -= Math.sin(this.rotationY * degToRad) * (this.car_velocity * deltaTime * 1/50);

    let frontx = tempx - 5.9 * Math.cos(this.rotationY * degToRad);
    let frontz = tempz + 5.9 * Math.sin(this.rotationY * degToRad);

  
    if (this.terrain.getHeightAt(tempx, tempz) != 0 ||
        this.terrain.getHeightAt(frontx, frontz) != 0) {  
      this.car_velocity = 0;      
      return;
    }

    this.car_position_x = tempx;
    this.car_position_z = tempz
    
    this.wheelMovement -= (this.car_velocity * deltaTime * 1/50);
    
    if(this.currentDirection == "left"){
      if(this.wheelRotate <= 0.4)
        this.wheelRotate += (deltaTime * 3/ 1000);
      this.rotationY -= (this.car_velocity * deltaTime * 1/10);
    }
    if(this.currentDirection == "right"){
      if(this.wheelRotate >= -0.4)
        this.wheelRotate -= (deltaTime * 3/ 1000);
      this.rotationY += (this.car_velocity * deltaTime * 1/10);
    }
    if(this.currentDirection == "none"){
      if(this.wheelRotate > 0.1){
        this.wheelRotate -= (deltaTime * 1/ 1000);
        this.rotationY -= (this.car_velocity * deltaTime * 1/10);
      }
      else if(this.wheelRotate < -0.1){
        this.wheelRotate += (deltaTime * 1/ 1000);
        this.rotationY += (this.car_velocity * deltaTime * 1/10);
      }
      else
        this.wheelRotate = 0;
    }

    // if(this.car_acceleration > 0)
    //   this.car_acceleration -= (0.01 * deltaTime * 1/50);
    // else if (this.car_acceleration < 0)
    //   this.car_acceleration += (0.01 * deltaTime * 1/50);
    //else this.car_acceleration = 0;
  };
  
  }
