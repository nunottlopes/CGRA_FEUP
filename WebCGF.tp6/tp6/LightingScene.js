var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;
var TERRAIN_DIVISIONS = 8;

var FPS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.altimetry= [[ 20.0 , 5.0 , 5.0, 5.0, 20.5, 20.4, 20.3, 20.3, 20.3 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.3 ],
					     [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
                         [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
					     [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 20.0 ],
						 [ 20.0 , 20.0 , 20.0, 20.0, 20.5, 20.4, 20.3, 20.3, 20.3 ]
						];

		this.terrain = new MyTerrain(this, TERRAIN_DIVISIONS, this.altimetry);
		this.car = new MyVehicle(this, this.terrain, 50, 50);
		this.cylinder = new MyCylinder(this, 12, 1);
		this.trapezium = new MyTrapezium(this);
		this.semicircle = new MyLamp(this, 8, 20);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.texture1 = new CGFappearance(this);
		this.texture1.loadTexture("../resources/images/texture1.png");
		this.texture1.setAmbient(0.6,0.6,0.9,1);
    	this.texture1.setDiffuse(0.6,0.6,0.9,1);
		this.texture1.setSpecular(0.1,0.1,0.1,1);

		this.texture2 = new CGFappearance(this);
		this.texture2.loadTexture("../resources/images/texture2.png");
		this.texture2.setAmbient(0.6,0.6,0.9,1);
    	this.texture2.setDiffuse(0.6,0.6,0.9,1);
		this.texture2.setSpecular(0.1,0.1,0.1,1);

		this.texture3 = new CGFappearance(this);
		this.texture3.loadTexture("../resources/images/texture3.png");
		this.texture3.setAmbient(0.6,0.6,0.9,1);
    	this.texture3.setDiffuse(0.6,0.6,0.9,1);
		this.texture3.setSpecular(0.1,0.1,0.1,1);

		this.texture4 = new CGFappearance(this);
		this.texture4.loadTexture("../resources/images/texture4.png");
		this.texture4.setAmbient(0.6,0.6,0.9,1);
    	this.texture4.setDiffuse(0.6,0.6,0.9,1);
		this.texture4.setSpecular(0.1,0.1,0.1,1);

		this.objectsTexture = new CGFappearance(this);
		this.objectsTexture.loadTexture("../resources/images/bandeiraPortugal.png");
		this.objectsTexture.setAmbient(0.6,0.6,0.9,1);
    	this.objectsTexture.setDiffuse(0.6,0.6,0.9,1);
		this.objectsTexture.setSpecular(0.1,0.1,0.1,1);

		//Interface elements
		this.light0 = true;
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.eixos = true;
		this.speed = 3;
		this.Cylinder = false;
		this.Trapezium = false;
		this.Semicircle = false;

		this.vehicleAppearances = [this.texture1, this.texture2, this.texture3, this.texture4];
		this.vehicleAppearanceList = {
			'LightMetal' : 0,
			'DarkMetal' : 1,
			'Red' : 2,
			'Water' : 3
		}
		this.vehicleTexture = 'Red';
		this.currVehicleAppearance = this.vehicleAppearanceList[this.vehicleTexture];

		this.setUpdatePeriod(1000/FPS);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light0)
			this.lights[0].enable();
		

		this.lights[1].setPosition(9, 6, 1, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light1)
			this.lights[1].enable();

		this.lights[2].setPosition(4, 6, 6, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light2)
			this.lights[2].enable();

		this.lights[3].setPosition(9, 6, 6, 1);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1)
		if(this.light3)
			this.lights[3].enable();

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.light0)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light1)
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if(this.light2)
			this.lights[2].enable();
		else
			this.lights[2].disable();
			
		if(this.light3)
			this.lights[3].enable();
		else
			this.lights[3].disable();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.eixos)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//Objects
		this.objectsTexture.apply();

		this.pushMatrix();
		this.rotate(90 * degToRad, 1, 0, 0);
		this.translate(2,-2,-3);
		this.scale(1,1,3);
		if(this.Cylinder)
			this.cylinder.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(8,0.5,-2);
		if(this.Trapezium)
			this.trapezium.display();
		this.popMatrix();

		this.pushMatrix();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.translate(5,2,0);
		if(this.Semicircle)
			this.semicircle.display();
		this.popMatrix();
		
		//Car
		this.pushMatrix();
		this.translate(this.car.car_position_x,0.5,this.car.car_position_z);
		this.rotate(this.car.rotationY * degToRad, 0, 1, 0);
		this.currVehicleAppearance = this.vehicleAppearanceList[this.vehicleTexture];
		this.vehicleAppearances[this.currVehicleAppearance].apply();
		this.car.display();
		this.popMatrix();

		//Terrain
		this.terrain.display();

		// ---- END Scene drawing section
	};

	checkKeys(){
		if (this.gui.isKeyPressed("KeyW")){
			this.car.car_acceleration -= 0.01;
		}
		if (this.gui.isKeyPressed("KeyS")){
			this.car.car_acceleration += 0.01;
		}
		if (this.gui.isKeyPressed("KeyA")){
			this.car.currentDirection = "left";
		}
		else if (this.gui.isKeyPressed("KeyD")){
			this.car.currentDirection = "right";
		}
		else{
			this.car.currentDirection = "none";
		}
		
	}

	update(currTime) {
		var today = new Date();

		currTime -= today.getTimezoneOffset()*60*1000;

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.checkKeys();
		this.car.update(this.deltaTime);
	};

	doSomething() {
		console.log("Doing something...");
	}
};
