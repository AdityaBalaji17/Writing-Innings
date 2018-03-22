var turn=1;
var runs=0,balls=0;
var count1=0;
var count2=0;
var offset=0;
var dir;
var tiltLR;
var controlSetting="swipe";
var move=0;
var ANG=0;
var direction=1;
var meshGlobal =new THREE.Vector3();  
var Angle=90;
var angle2=0;
var speed;
var angle=120;////
var AngleZ1=0;
var AngleZ2=0;
var swing=0;
var slope=0.03;
var line=0;
var length=0;
var ballmesh;
var ballmesh2;
var update1 = THREE.Bone.prototype.update;
THREE.Bone.prototype.update = function(parentSkinMatrix, forceUpdate) {
    update1.call(this, parentSkinMatrix, forceUpdate);
    this.updateMatrixWorld( true );
};
//
// add noop update function to Object3D prototype
// so any Object3D may be a child of a Bone
THREE.Object3D.prototype.update = function() {};
var rotWorldMatrix;

// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}
//////
var H=7;
var shotdone=0;
var players=[];
var mode=-1;//
var newOne=1;
var playerMeshes=[];
var x=120;
var view=2;
var stands;
var helmetmesh;
var helmetmesh2;
var geometries=[];
var materials=[];
var batmesh;
var batmesh2;
var game = {
  scene: null, camera: null, renderer: null,
  container: null, controls: null,
  clock: null, stats: null,
  init: function() {

   // alert(materials[1]);
        this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xffffff, 0.0003);

    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
 
    var wf=SCREEN_WIDTH/1346;
    var hf=SCREEN_HEIGHT/623;
 
    wf=1;
    
    var VIEW_ANGLE = 57, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1000;
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(0, -97, 23);
   
   
    this.renderer = new THREE.WebGLRenderer({ antialias:true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(this.scene.fog.color);

   
    this.container = document.createElement('div');
    this.renderer.domElement.setAttribute("style","position:fixed;top:0%;left:0%;width:100%;height:100%");
      this.renderer.domElement.addEventListener('touchmove', function(e) {

     //   e.preventDefault();
	   
}, false);
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

   
    THREEx.WindowResize(this.renderer, this.camera);

    
    this.clock = new THREE.Clock();

    this.scene.add( new THREE.AmbientLight(0xFFFFFF));
     
    
    this.drawGround("ground.png",300*wf);
    this.drawStands("stands2.png",500*wf,300*wf,300*wf,0,0,0,Math.PI/2,20*Math.PI/180,0);
    this.drawSky("sky.png",400*wf,700*wf,2000*wf,0,0,0,Math.PI/2,20*Math.PI/180,0);
    this.drawPitch("pitch.png",0,0,0.11,0,0,0,50*wf,230);
    this.drawStumps(0.5,0.5,12,0,100,5,Math.PI/2,0,0);
    this.drawStumps(0.5,0.5,12,-1.50,100,5,Math.PI/2,0,0);
    this.drawStumps(0.5,0.5,12,+1.50,100,5,Math.PI/2,0,0);
	this.drawStumps(0.5,0.5,12,0,-110,5,Math.PI/2,0,0);
    this.drawStumps(0.5,0.5,12,-1.50,-110,5,Math.PI/2,0,0);
    this.drawStumps(0.5,0.5,12,+1.50,-110,5,Math.PI/2,0,0);      
      this.loadJsonModel("trial2.json","india.png",-5,-100,0,Math.PI/2,Math.PI,0,15,0,"yes");
    this.loadJsonModel("trial2.json","south_africa.png",20,220,-5,Math.PI/2,0,0,17,1,"no");
    this.loadJsonModel("trial2.json","india2.png",-20,91,-3,Math.PI/2,50*Math.PI/180,0,17,2,"no");
    this.loadJsonModel("trial2.json","sa1.png",-55,75,-3,Math.PI/2,20*Math.PI/180,0,17,3,"no");
    this.loadJsonModel("trial2.json","sa2.png",75,25,-3,Math.PI/2,-40*Math.PI/180,0,17,4,"no");
	this.drawBat();
      this.drawBall();
   
   
    
  },
    drawBall:function()
    {
        var material;
      var texture=new THREE.ImageUtils.loadTexture("models/ball2.png",{},function(){
          material=new THREE.MeshLambertMaterial({map:texture});
           ballmesh=new THREE.Mesh(new THREE.SphereGeometry(0.6,32,32),material);
          ballmesh2=new THREE.Mesh(new THREE.SphereGeometry(0.6,32,32),material);
          game.scene.add(ballmesh2);
          ballmesh2.visible=false;
          ballmesh2.position.y=100;
          ballmesh2.position.z=7;
          //game.scene.add(ballmesh);
      });
       
        
    },
    drawBat:function()
    {
        var material=new THREE.MeshLambertMaterial({color:0xD2B48C});
	
    var jsonLoader = new THREE.JSONLoader();
   jsonLoader.load('js/bat2.json', function(geometry, materials) {
       geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.7,-2,0));
       batmesh=new THREE.Mesh(geometry,material);
       batmesh.rotation.y=80*Math.PI/180;
       batmesh.rotation.x=20*Math.PI/180;
       batmesh.rotation.z=20*Math.PI/180;
     /*  batmesh.position.y=-3.8;
       batmesh.position.z=-3;
       batmesh.position.x=-0.4;*/
       
       batmesh.scale.set(1,2.5,2);
		//game.scene.add(batmesh);
       
       
       ////////////
       
       batmesh2=new THREE.Mesh(geometry,material);
      // batmesh2.rotation.y=80*Math.PI/180;
       batmesh2.rotation.x=-60*Math.PI/180;
       batmesh2.rotation.z=120*Math.PI/180;
       batmesh2.scale.set(1,2.5,2);
       
   });
    },
  drawStumps:function(toprad,bottomrad,height,x,y,z,a,b,c)
  {
    var material=new THREE.MeshLambertMaterial({color:0x000022});
     var material2=new THREE.MeshLambertMaterial({color:0xffffff});
    var stumpGeo=new THREE.CylinderGeometry(toprad,bottomrad,height, 50, 50, true);
    var stump=new THREE.Mesh(stumpGeo,material);
    stump.position.set(x,y,z);
    stump.rotation.x=a;
    stump.rotation.y=b;
    stump.rotation.z=c;
    game.scene.add(stump);
    var RectShape=new THREE.Shape();

   RectShape.moveTo(-25,70);
   RectShape.lineTo( 25, 70);
  RectShape.lineTo( 25, 68);
  RectShape.lineTo( -25, 68);
  var RectGeom = new THREE.ShapeGeometry( RectShape ); 
  var RectMesh = new THREE.Mesh( RectGeom, material2 );
game.scene.add(RectMesh);
RectMesh.position.z=0.3;
  },
  drawPitch:function(texturename,x,y,z,a,b,c,W,H)
  {
    var material;
    var texture=new THREE.ImageUtils.loadTexture("models/"+texturename,{},function(){
       material=new THREE.MeshLambertMaterial({
       map:texture
    });
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(W, H), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x=x;
      plane.position.y=y;
      plane.position.z=z;
      plane.rotation.x=a;
      plane.rotation.y=b;
      plane.rotation.z=c;
      game.scene.add(plane);
    });
  },
  drawStands:function(texturename,toprad,bottomrad,height,x,y,z,a,b,c)
  {
    var material;
       var texture=new THREE.ImageUtils.loadTexture("models/"+texturename,{},function(){
        
       material=new THREE.MeshLambertMaterial({
       map:texture
    });
       material.side=THREE.DoubleSide;
  
    var standsGeo = new THREE.CylinderGeometry(toprad, bottomrad, height, 50, 50, true);
  stands=new THREE.Mesh( standsGeo, material );
  stands.position.x=x;
  stands.position.y=y;
  stands.position.z=z;
stands.rotation.x=a;
stands.rotation.y=b;
stands.rotation.z=c;
    game.scene.add(stands);
    
});
  },
  drawSky:function(texturename,toprad,bottomrad,height,x,y,z,a,b,c)
  {
    var material;
        texture=new THREE.ImageUtils.loadTexture("models/"+texturename,{},function(){
      //  texture.repeat.set(10,10);
       material=new THREE.MeshLambertMaterial({
       map:texture
    });
       material.side=THREE.DoubleSide;
  
    var standsGeo = new THREE.CylinderGeometry(toprad, bottomrad, height, 50, 50, true);
  stands=new THREE.Mesh( standsGeo, material );
  stands.position.x=x;
  stands.position.y=y;
  stands.position.z=z;
stands.rotation.x=a;
stands.rotation.y=b;
stands.rotation.z=c;
    game.scene.add(stands);
    
});
  },
  loadJsonModel: function(filename,texturename,x,y,z,alpha,beta,gamma,scale,index,pov) {

    
   var material1;

    var jsonLoader = new THREE.JSONLoader();
   jsonLoader.load('models/'+filename, function(geometry, materials) {
	 var texture1=new THREE.ImageUtils.loadTexture("models/"+texturename,{},function(){
       material1=new THREE.MeshLambertMaterial({
   map:texture1
    });
     material1.skinning=true;
	  material1.side=THREE.DoubleSide;
	  
	   players[index] = new THREE.SkinnedMesh(
        geometry, material1
      );
	   // Set position and scale
      
      players[index].position.set(x, y, z);
      players[index].rotation.x=alpha;
      players[index].rotation.y=beta;
      players[index].rotation.z=gamma;

      players[index].scale.set(scale, scale, scale);

 if(pov=="yes")
 {
  jsonLoader.load('models/3untitled.json', function(geometry2, materials2) {
      var material2=new THREE.MeshLambertMaterial({
   color:0x002400
 });
 material2.side=THREE.DoubleSide;
  helmetmesh=new THREE.Mesh(geometry2,material2);
  helmetmesh2=new THREE.Mesh(geometry2,material2);
  game.scene.add(helmetmesh2);
 game.scene.add(helmetmesh);
 helmetmesh.scale.set(2,2.5,3);
 helmetmesh.rotation.x=90*Math.PI/180;
 //helmetmesh.position.x=game.camera.position.x;
 //helmetmesh.position.y=game.camera.position.y+0.3;
 helmetmesh.position.x=players[index].position.x;
 helmetmesh.position.y=-98.3;
 helmetmesh.position.z=23.3;
 
 helmetmesh.rotation.y=180*Math.PI/180;
 ///////
 helmetmesh2.position.z=23.3;
 helmetmesh2.scale.set(2,2.5,3);
 helmetmesh2.rotation.x=90*Math.PI/180;
 helmetmesh2.rotation.y=50*Math.PI/180;
 //helmetmesh.position.z=20;
 });
 
  players[index].skeleton.bones[28].rotation.x=-10*Math.PI/180;
  }    
 if(index>=3)
	 {
	 players[index].skeleton.bones[10].rotation.x=Math.PI/4;
	 players[index].skeleton.bones[28].rotation.x=-Math.PI/4;
	 players[index].skeleton.bones[11].rotation.y=-Math.PI/3;
	 players[index].skeleton.bones[19].rotation.y=+Math.PI/3;
	 
	 players[index].skeleton.bones[20].rotation.x=-70*Math.PI/180;
	 players[index].skeleton.bones[12].rotation.x=-70*Math.PI/180;
	 players[index].skeleton.bones[20].rotation.y=20*Math.PI/180;
	 players[index].skeleton.bones[12].rotation.y=-20*Math.PI/180;
	 }
game.scene.add(players[index]);
	 });

	 });
	 


  },

  drawGround:function(texturename,size)
  {
    var texture=new THREE.ImageUtils.loadTexture("models/"+texturename,{},function(){
       material=new THREE.MeshLambertMaterial({
   map:texture
    });

    var radius  = size,
    segments = 64,
    
    geometry = new THREE.CircleGeometry( radius, segments );
    game.scene.add( new THREE.Mesh( geometry, material ) );
  });
  }
};

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

// Update controls and stats
function update() {
  var delta = game.clock.getDelta();

  


  THREE.AnimationHandler.update(delta);
}

// Render the scene
function render() {
    
  if (game.renderer) {//
      if(ballmesh2&&batmesh&&(mode==0.5||mode==1))
          {
              players[0].updateMatrixWorld();
              players[0].skeleton.bones[25].updateMatrixWorld();
              var vector = new THREE.Vector3();
vector.setFromMatrixPosition( batmesh.matrixWorld );
              ballmesh2.position=vector;
              //alert(vector.y);
             // ballmesh2.visible=true;
     var ray = new THREE.Raycaster( ballmesh2.position, new THREE.Vector3(ballmesh2.position.x, ballmesh2.position.y-1, ballmesh2.position.z).sub( ballmesh2.position ).normalize() );

var intersects = ray.intersectObject( batmesh );

if ( intersects.length > 0&&intersects[0].distance<2) {

/*    var face = intersects[0].face.d,
    dist = intersects[0].distance;

    if(face == 4 && dist <= 7) sizes.ball.velocityZ = -sizes.ball.velocityZ;*/
    //alert("Collision");//&&intersects[0].distance < 0.5
	runs=Number(localStorage.getItem("runs"));
	balls=Number(localStorage.getItem("balls"));
	count2=Number(localStorage.getItem("wordcount"));
	if(count2-count1<10)
	{
			document.getElementById("message").innerHTML="Defended, no run";
			document.getElementById("message").style.color="red";
	}
	else if(count2-count1<20)
	{
	document.getElementById("message").innerHTML="Nudged for a single...";
	document.getElementById("message").style.color="orange";
	runs++;
	count1=count2;
	}
	else if(count2-count1<30)
	{
document.getElementById("message").innerHTML="Batsmen steal two runs";
document.getElementById("message").style.color="orange";
runs+=2;
count1=count2;
	}
	else if(count2-count1<40)
	{
	document.getElementById("message").innerHTML="Three runs, great running!";
	document.getElementById("message").style.color="orange";
runs+=3;
count1=count2;
	}
	else if(count2-count1<50)
	{
			document.getElementById("message").innerHTML="Smashed for a FOUR!";
			document.getElementById("message").style.color="green";
			runs+=4;
			count1=count2;
	}
	else
	{
			document.getElementById("message").innerHTML="That's out of the ground, SIX!";
			document.getElementById("message").style.color="green";
			runs+=6;
			count1=count2;
	}
	balls++;
	localStorage.setItem("runs",runs);
	localStorage.setItem("balls",balls);

direction=-1;
var quart=batmesh.getWorldQuaternion();
mode=1.5;
swing=-1/Math.tan(quart.y);

if(intersects[0].distance<0.5)
	{
	

speed=1;
	}
else if(intersects[0].distance<1)
	{


speed=2;
	}
else if(intersects[0].distance<1.5)
	{
	speed=1.5;
	}
else
	{
	swing=-swing;
	speed=0.5;
	document.getElementById("message").innerHTML="EDGED!";
	document.getElementById("message").style.color="orange";
	}
document.getElementById("shot").play();
document.getElementById("message").style.display="block";
}
else if(ballmesh2.position.y<-100)
	{
	document.getElementById("message").innerHTML="MISSED!";
	document.getElementById("message").style.color="red";
	document.getElementById("message").style.display="block";
	}

}

      
      if(players[1]&&mode==0)
          {
             players[1].skeleton.bones[18].add(ballmesh);
             direction=1;
              
          }
      if(players[2]&&helmetmesh2&&batmesh2)
    	  {
    	  players[2].skeleton.bones[25].add(batmesh2);
    	  helmetmesh2.position.x=players[2].position.x+0.5;
    	  helmetmesh2.position.y=players[2].position.y;
    	  
    	  
    	  }
  if(players[0])
  {
      
      if(H==7)
          {
    	  players[0].skeleton.bones[25].add(batmesh);
            //  mode=0;////
           view=1;
 // players[0].skeleton.bones[0].position.x=0.26;
  players[0].skeleton.bones[0].position.z=-0.07;
//players[0].skeleton.bones[0].position.y=-0.01;
 // players[0].skeleton.bones[0].rotation.z=60*Math.PI/180;
  players[0].skeleton.bones[10].rotation.x=10*Math.PI/180;
    //     rotateAroundWorldAxis(players[0].skeleton.bones[14],new THREE.Vector3(0,0,1),-90*Math.PI/180);
              rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,0,1),165*Math.PI/180);
              rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,0,1),-165*Math.PI/180);
              rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),-31*Math.PI/180);
               
              //angle=90;
              rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,1,0),17*Math.PI/180);
             
             //  rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(1,0,0),61*Math.PI/180);
  /*   players[0].skeleton.bones[10].rotation.z=60*Math.PI/180;
  players[0].skeleton.bones[28].rotation.z=-60*Math.PI/180;
   players[0].skeleton.bones[28].rotation.x=-10*Math.PI/180;
   */players[0].skeleton.bones[1].rotation.x=160*Math.PI/180;
   players[0].skeleton.bones[5].rotation.x=160*Math.PI/180;
   players[0].skeleton.bones[6].rotation.x=30*Math.PI/180;
   players[0].skeleton.bones[2].rotation.x=30*Math.PI/180;
   players[0].skeleton.bones[1].position.z=1;
   players[0].skeleton.bones[5].position.z=1;
              
      /*players[0].skeleton.bones[19].rotation.y=165*Math.PI/180;    
      //players[0].skeleton.bones[19].rotation.x=220*Math.PI/180;    
       players[0].skeleton.bones[20].rotation.x=-110*Math.PI/180;    
      players[0].skeleton.bones[21].rotation.z=-110*Math.PI/180;    
       players[0].skeleton.bones[12].rotation.z=-30*Math.PI/180;    
      players[0].skeleton.bones[11].rotation.y=190*Math.PI/180;    
       players[0].skeleton.bones[12].rotation.x=-90*Math.PI/180;  
      
       players[0].skeleton.bones[13].rotation.y=-45*Math.PI/180;    
      players[0].skeleton.bones[13].rotation.z=180*Math.PI/180;    
      */
           players[0].skeleton.bones[14].rotation.y=-45*Math.PI/180;        
            //  players[0].skeleton.bones[14].rotation.x=-90*Math.PI/180;        
              rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),15*Math.PI/180);
              
              players[0].skeleton.bones[19].rotation.x=130*Math.PI/180;
    players[0].skeleton.bones[20].rotation.y=50*Math.PI/180;    
              players[0].skeleton.bones[20].rotation.z=100*Math.PI/180;    
              players[0].skeleton.bones[20].rotation.x=50*Math.PI/180;    
               players[0].skeleton.bones[11].rotation.x=140*Math.PI/180;
               //players[0].skeleton.bones[11].rotation.y=-180*Math.PI/180;
    players[0].skeleton.bones[12].rotation.y=-50*Math.PI/180;    
              players[0].skeleton.bones[12].rotation.z=-134*Math.PI/180;    
              players[0].skeleton.bones[12].rotation.x=70*Math.PI/180;  
             // rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,0,1),Math.PI);
              //rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,0,1),Math.PI);
              //rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(1,0,0),Math.PI/);
            /*  players[0].skeleton.bones[15].position.y=1;
              players[0].skeleton.bones[16].position.y=1;
              players[0].skeleton.bones[17].position.y=1;
              players[0].skeleton.bones[18].position.y=1;
              
              // players[0].skeleton.bones[15].rotation.y=Math.PI/2;
             
              players[0].skeleton.bones[23].position.y=1;
              players[0].skeleton.bones[24].position.y=1;
              players[0].skeleton.bones[25].position.y=1;
              players[0].skeleton.bones[26].position.y=1;*/
            /* players[0].skeleton.bones[11].rotation.x=190*Math.PI/180;
              players[0].skeleton.bones[19].rotation.x=190*Math.PI/180;
              
              players[0].skeleton.bones[13].rotation.y=0*Math.PI/180;
              players[0].skeleton.bones[21].rotation.y=-90*Math.PI/180;*/
           //   players[0].skeleton.bones[13].position.y=1.2;
            //  players[0].skeleton.bones[13].add(players[0].skeleton.bones[22]);
             // players[0].skeleton.bones[21].add(players[0].skeleton.bones[13]);
             // players[0].rotation.y=0;
               //rotateAroundWorldAxis(players[0].skeleton.bones[12],new THREE.Vector3(1,0,0),-21*Math.PI/180);
               //rotateAroundWorldAxis(players[0].skeleton.bones[20],new THREE.Vector3(1,0,0),21*Math.PI/180);
              H++;
          }
      if(view==1)
          {
    game.camera.rotation.y=players[0].skeleton.bones[28].rotation.z+80*Math.PI/180;
	helmetmesh.rotation.y=game.camera.rotation.y-Math.PI;
    game.camera.rotation.x=players[0].skeleton.bones[28].rotation.x+Math.PI/2;
	var theta=((game.camera.rotation.y)*180/Math.PI)%360;
	console.log(theta);
					game.camera.position.y=players[0].position.y+Math.cos(theta*Math.PI/180)*1.4;
			game.camera.position.x=players[0].position.x-Math.sin(theta*Math.PI/180)*1.4;
		helmetmesh.position.y=players[0].position.y+Math.cos(theta*Math.PI/180)*1.4;
			helmetmesh.position.x=players[0].position.x-Math.sin(theta*Math.PI/180)*1.4;
		
         
    game.camera.rotation.z=0;}
    //game.camera.rotation.y=0;
      if(newOne==1)
{
    
    if(view==2)
   game.camera.rotation.y=Math.PI;
   players[0].rotation.y=80*Math.PI/180;
    players[0].skeleton.bones[28].rotation.z=-80*Math.PI/180;
    newOne=2;
}
      if(view==2)
          {
    game.camera.position.y=0;
   helmetmesh.rotation.y=players[0].skeleton.bones[28].rotation.z+Math.PI/2;
    game.camera.rotation.x=players[0].skeleton.bones[28].rotation.x+Math.PI/2;
  var theta=((game.camera.rotation.y)*180/Math.PI)%360;
  console.log(theta);
         // game.camera.position.y=players[0].position.y+Math.cos(theta*Math.PI/180)*1.4;
      //game.camera.position.x=players[0].position.x-Math.sin(theta*Math.PI/180)*1.4;
    helmetmesh.position.y=players[0].position.y+1+Math.cos(theta*Math.PI/180)*1.4;
      helmetmesh.position.x=players[0].position.x-Math.sin(theta*Math.PI/180)*1.4;
          }
      /*
     // players[0].skeleton.bones[11].rotation.x=170*Math.PI/180;
     // players[0].skeleton.bones[13].rotation.x=5*Math.PI/180;
      
      players[0].skeleton.bones[11].rotation.x=4*Math.PI/180;
      players[0].skeleton.bones[11].rotation.z=60*Math.PI/180;
     // players[0].skeleton.bones[13].rotation.y=0*Math.PI/180;
       //players[0].skeleton.bones[13].rotation.x=-100*Math.PI/180;
     // players[0].skeleton.bones[11].rotation.y=80*Math.PI/180;
     // players[0].skeleton.bones[13].rotation.z=0*Math.PI/180;
      players[0].skeleton.bones[19].rotation.x=4*Math.PI/180;
     // players[0].skeleton.bones[19].rotation.y=-40*Math.PI/180;
      players[0].skeleton.bones[19].rotation.z=-60*Math.PI/180;
      players[0].skeleton.bones[20].rotation.y=200*Math.PI/180;
      players[0].skeleton.bones[21].rotation.z=90*Math.PI/180;
      players[0].skeleton.bones[12].rotation.y=160*Math.PI/180;
    // players[0].skeleton.bones[12].rotation.y=-70*Math.PI/180;
     // players[0].skeleton.bones[12].rotation.z=0*Math.PI/180;
      players[0].skeleton.bones[21].rotation.x=0*Math.PI/180;
      //players[0].skeleton.bones[21].rotation.z=30*Math.PI/180;
      //batmesh.position.x=players[0].position.x+3;
      //batmesh.position.y=players[0].position.y-1;
    
      ///////
     // if(players[0].skeleton.bones[20].rotation.x>-280*Math.PI/180)
          {
     
             
       players[0].skeleton.bones[20].rotation.x-=1*Math.PI/180;
               players[0].skeleton.bones[12].rotation.x+=0.5*Math.PI/180;
              players[0].skeleton.bones[20].rotation.z=-Math.PI/180;
              players[0].skeleton.bones[13].scale.set(1,1,1.55);
               players[0].skeleton.bones[21].scale.set(1,1,1.2);
             // players[0].skeleton.bones[13].position.y=1.3;
              players[0].skeleton.bones[21].position.x=0.7;
              
              //players[0].skeleton.bones[13].position.z=4;
              
          }*/
      
  /*    
      batmesh.position.x=players[0].position.x+1;
    //  players[0].skeleton.bones[20].position.x=-10;
      
     // batmesh.rotation.x=90*Math.PI/180;//
      batmesh.rotation.y=Math.PI/2;
      batmesh.rotation.x=-players[0].skeleton.bones[19].rotation.z+Math.PI/8;
      batmesh.position.y=-98.4-8*Math.sin(players[0].skeleton.bones[19].rotation.z);
      batmesh.position.z=13-5*Math.cos(players[0].skeleton.bones[19].rotation.z);
      //players[0].skeleton.bones[20].rotation.y=0*Math.PI/180;
     // players[0].skeleton.bones[20].rotation.z=80*Math.PI/180;
    //  players[0].rotation.y=Math.PI;
    */
     
      //batmesh.rotation.x=220*Math.PI/180;
     // batmesh.rotation.z=210*Math.PI/180;
      
     if(shotdone<18&&mode==1)
          {
              
              if(shotdone==0)
                  {
            	  angle2=1.2*Math.atan(Math.abs((-95-length))*Math.abs(slope)/8);
                  //document.getElementById("message").innerHTML=angle2*180/Math.PI+" "+slope+" "+length;
                  //document.getElementById("message").style.display="block";
               AngleZ1= players[0].skeleton.bones[19].rotation.z*180/Math.PI;
                      
                      AngleZ2= players[0].skeleton.bones[11].rotation.z*180/Math.PI;
              Angle=batmesh.rotation.x*180/Math.PI;
                   
                  }
              players[0].skeleton.bones[28].rotation.z-=turn*((Angle-angle)/140)*Math.PI/180;
if(turn==1)
	{
//rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,1,0),Math.abs((angle/75)*Math.PI/180));           
  // rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),Math.abs((angle/75)*Math.PI/180));//           
            
        
rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,0,1),turn*((Angle-angle)/18)*Math.PI/180);
           
           
rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,0,1),turn*((Angle-angle)/18)*Math.PI/180);
rotateAroundWorldAxis(players[0].skeleton.bones[25],new THREE.Vector3(1,0,0),turn*(Angle-angle)*Math.PI/(30*180));
	}
else
	{
	rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(1,0,0),-Math.abs(((90-angle)/25)*Math.PI/180));           
	   rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(1,0,0),-Math.abs(((90-angle)/25)*Math.PI/180));//
	   rotateAroundWorldAxis(players[0].skeleton.bones[25],new THREE.Vector3(1,0,0),turn*(Angle-angle+180)*Math.PI/(30*180));
	}
///
rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,1,0),angle2/18);           
rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),angle2/18);

///
                      shotdone++;
                  
          }
      if(shotdone>0&&mode==0)
          {
    	///
    	 	rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,1,0),-angle2/18);           
    	 	rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),-angle2/18);
    	 	
    	 	///
     if(turn==1)
    	 {
    	 rotateAroundWorldAxis(players[0].skeleton.bones[25],new THREE.Vector3(1,0,0),-turn*(Angle-angle)*Math.PI/(30*180));
  rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,0,1),-turn*((Angle-angle)/18)*Math.PI/180);
  rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,0,1),-turn*((Angle-angle)/18)*Math.PI/180);
  //rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(0,1,0),-Math.abs((angle/75)*Math.PI/180));//
//rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(0,1,0),-Math.abs((angle/75)*Math.PI/180));//           
       
  
  	 }
     else
 	{
    	 rotateAroundWorldAxis(players[0].skeleton.bones[25],new THREE.Vector3(1,0,0),-turn*(Angle-angle+180)*Math.PI/(30*180));
 	rotateAroundWorldAxis(players[0].skeleton.bones[19],new THREE.Vector3(1,0,0),Math.abs(((90-angle)/25)*Math.PI/180));           
 	   rotateAroundWorldAxis(players[0].skeleton.bones[11],new THREE.Vector3(1,0,0),Math.abs(((90-angle)/25)*Math.PI/180));//
 	}
     
   
     


           
              shotdone--;
          }
  
}
//game.camera.rotation.z=-10*Math.PI/180;
//TESTING2
      //mode=0;
if(players[1]&&x<960*8+640&&mode==0)
{
   
  // players[1].updateMatrixWorld(true);
   //meshGlobal.setFromMatrixPosition(players[1].matrixWorld);
				//alert();
                           //       ballmesh.position=players[1].skeleton.bones[18].localToWorld(players[1].position);
 
    
  players[1].skeleton.bones[11].rotation.z=40*Math.PI/180;
  players[1].skeleton.bones[5].rotation.y=-5*Math.PI/180;
  players[1].skeleton.bones[1].rotation.y=5*Math.PI/180;
//  players[1].skeleton.bones[0].rotation.z=-90*Math.PI/180;
  if((x/120)%8==1)
  {
 
  players[1].skeleton.bones[10].rotation.x=Math.PI/8;
  players[1].skeleton.bones[1].rotation.x=95*Math.PI/180;
  players[1].skeleton.bones[2].rotation.x=Math.PI/2;
  players[1].skeleton.bones[3].rotation.x=-Math.PI/2;
  players[1].skeleton.bones[19].rotation.x=-110*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;

  players[1].skeleton.bones[5].rotation.x=5*Math.PI/4;
  //players[1].skeleton.bones[12].rotation.x=-160*Math.PI/180;
  //players[1].skeleton.bones[12].rotation.y=45*Math.PI/180;
  //players[1].skeleton.bones[12].rotation.z=60*Math.PI/180;
 //players[1].skeleton.bones[20].rotation.y=-15*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.z=50*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.y=120*Math.PI/180;
}
if((x/120)%8==2)
{
 
  players[1].skeleton.bones[10].rotation.x=Math.PI/8;
  players[1].skeleton.bones[1].rotation.x=115*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=60*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-Math.PI/2;
  players[1].skeleton.bones[19].rotation.x=-110*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=200*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=50*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.x=100*Math.PI/180;
 // players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
 // players[1].skeleton.bones[12].rotation.z=30*Math.PI/180;
  //players[1].skeleton.bones[12].rotation.z=100*Math.PI/180;
 //players[1].skeleton.bones[20].rotation.y=-15*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.x=Math.PI/4;
  //players[1].skeleton.bones[13].rotation.y=30*Math.PI/180;
}

if((x/120)%8==3)
{
 
  players[1].skeleton.bones[10].rotation.x=Math.PI/8;
  players[1].skeleton.bones[1].rotation.x=135*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=50*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-160*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
 // players[1].skeleton.bones[20].rotation.y=-15*Math.PI/180;
 // players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=200*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=110*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.x=170*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  

  //players[1].skeleton.bones[13].rotation.x=20*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.y=30*Math.PI/180;
}
if((x/120)%8==4)
{
  
  players[1].skeleton.bones[10].rotation.x=18*Math.PI/180;
  players[1].skeleton.bones[1].rotation.x=155*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=50*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-160*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
 // players[1].skeleton.bones[20].rotation.y=-15*Math.PI/180;

  players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=180*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=110*Math.PI/180;
 // players[1].skeleton.bones[11].rotation.x=190*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  

  //players[1].skeleton.bones[13].rotation.x=0*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.y=30*Math.PI/180;
}
if((x/120)%8==5)
{
 
  players[1].skeleton.bones[10].rotation.x=18*Math.PI/180;
  players[1].skeleton.bones[1].rotation.x=155*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=50*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-200*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
  players[1].skeleton.bones[19].rotation.z=0*Math.PI/180;
  players[1].skeleton.bones[20].rotation.x=-90*Math.PI/180;
 // players[1].skeleton.bones[20].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[20].rotation.z=-120*Math.PI/180;
  //players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=180*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=110*Math.PI/180;
  players[1].skeleton.bones[11].rotation.x=210*Math.PI/180;
 // players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  

  //players[1].skeleton.bones[13].rotation.x=-10*Math.PI/180;
  players[1].skeleton.bones[13].rotation.y=20*Math.PI/180;
}
if((x/120)%8==6)
{
 
  players[1].skeleton.bones[10].rotation.x=18*Math.PI/180;
  players[1].skeleton.bones[1].rotation.x=175*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=50*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-240*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
  players[1].skeleton.bones[19].rotation.z=0*Math.PI/180;
  players[1].skeleton.bones[20].rotation.x=-90*Math.PI/180;
  players[1].skeleton.bones[20].rotation.y=15*Math.PI/180;
  players[1].skeleton.bones[20].rotation.z=-120*Math.PI/180;
  players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=130*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=135*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.x=210*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  

//  players[1].skeleton.bones[13].rotation.x=20*Math.PI/180;
 // players[1].skeleton.bones[13].rotation.y=20*Math.PI/180;
}

if((x/120)%8==7)
{
 
  players[1].skeleton.bones[10].rotation.x=18*Math.PI/180;
  players[1].skeleton.bones[1].rotation.x=195*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=50*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-240*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
  players[1].skeleton.bones[19].rotation.z=0*Math.PI/180;
  players[1].skeleton.bones[20].rotation.x=-90*Math.PI/180;
  players[1].skeleton.bones[20].rotation.y=15*Math.PI/180;
  players[1].skeleton.bones[20].rotation.z=-120*Math.PI/180;
  players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=130*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=95*Math.PI/180;
 // players[1].skeleton.bones[11].rotation.x=240*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  

  //players[1].skeleton.bones[13].rotation.x=50*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.y=20*Math.PI/180;
}

if((x/120)%8==0)
{
 
  players[1].skeleton.bones[10].rotation.x=18*Math.PI/180;
  players[1].skeleton.bones[1].rotation.x=215*Math.PI/180;

  players[1].skeleton.bones[2].rotation.x=20*Math.PI/180;
  players[1].skeleton.bones[3].rotation.x=-60*Math.PI/180;
  players[1].skeleton.bones[19].rotation.x=-240*Math.PI/180;
  players[1].skeleton.bones[19].rotation.y=-50*Math.PI/180;
  players[1].skeleton.bones[19].rotation.z=0*Math.PI/180;
  players[1].skeleton.bones[20].rotation.x=-90*Math.PI/180;
  players[1].skeleton.bones[20].rotation.y=15*Math.PI/180;
  players[1].skeleton.bones[20].rotation.z=-120*Math.PI/180;
  players[1].skeleton.bones[21].rotation.y=-15*Math.PI/180;
  players[1].skeleton.bones[5].rotation.x=90*Math.PI/180;
  players[1].skeleton.bones[6].rotation.x=95*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.x=240*Math.PI/180;
  //players[1].skeleton.bones[11].rotation.y=30*Math.PI/180;
  //mode=1;

  //players[1].skeleton.bones[13].rotation.x=50*Math.PI/180;
  //players[1].skeleton.bones[13].rotation.y=20*Math.PI/180;
}
players[1].skeleton.bones[11].rotation.x=-players[1].skeleton.bones[19].rotation.x;
//players[1].skeleton.bones[5].rotation.x=-players[1].skeleton.bones[1].rotation.x;
//players[1].skeleton.bones[6].rotation.x=-players[1].skeleton.bones[2].rotation.x;
players[1].position.y-=0.75;
players[1].position.z=-5;
players[1].position.x-=0.03;

}
  
      else if(players[1]&&x<960*8+640+800&&mode==0)
                      {
                          //players[1].position.z=H;
                          //H-=0.;//
                      players[1].skeleton.bones[11].rotation.x+=20*Math.PI/180;
                          //players[1].skeleton.bones[19].rotation.x+=20*Math.PI/180;
                     // players[1].skeleton.bones[1].position.y-=0.1;
              			players[1].skeleton.bones[10].rotation.x+=2*Math.PI/180;
                          players[1].position.y-=1.6;
                          if(x>=960*8+640+700)
                              {
                              // length=-20+Math.random()*60;
							  length=20.16381492008372;
							  swing=-0.16950408546775664;
							 
           						line=-5+Math.random()*10;
                                  slope=(ballmesh2.position.z)/(-length+ballmesh2.position.y);
                                                                    
                                  
                                 // swing=-0.2+Math.random()*0.1;
                                  //speed=1.5+Math.random()*1;
								  speed=2;
                             //THREE.SceneUtils.detach(ballmesh, game.scene, players[1].skeleton.bones[18]);
                                  ballmesh.visible=false;
                              ballmesh2.visible=true;
               //                   players[1].skeleton.bones[18].remove(ballmesh);
                              mode=0.5;
                              }
                          //mode=1;
                      }
         x+=60;
      if(mode==0.5||mode==1||mode==1.5)
          {
              
               ballmesh2.position.z-=speed*slope;
              
              
               //   ballmesh.position.x+=swing;
               	  ballmesh2.position.y-=direction*Math.abs(speed);
                 ballmesh2.position.x+=swing;
                  if(ballmesh2.position.z<=0.5)
                      {
					 
                	  if(mode==0.5||mode==1)
                          {
						  angle=140.45896482029497;
						  mode=1;
                		//  document.getElementById("message").innerHTML=""+slope;
                		 // document.getElementById("message").style.display="block";
                		  slope=-slope;
                          }
                	  else
                		  {
                		  if(speed>0)
                			  {
                		  speed-=0.01;
                		  slope=-slope/1.3;
                			  }
                		  else
                			  {
                			  mode=2;
                			  }
                		  //swing=0;
                		  
                		 // mode=2;
                		  }
                      }
              
              
              
          }
      if(mode==1.5)
    	  {
    	  slope+=0.02;
    	  //players[0].skeleton.bones[28].rotation.z-=Math.PI/360;
    	  }
    game.renderer.render(game.scene, game.camera);

  }
}

// Initialize lesson on page load
function initializeLesson() {
  game.init();
  animate();
}
/*if (window.addEventListener)
	  window.addEventListener('load', initializeLesson, false);
	else if (window.attachEvent)
	  window.attachEvent('onload', initializeLesson);
	else window.onload = initializeLesson;*/
if (window.DeviceMotionEvent) {
	  window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
	  document.getElementById("message").innerHTML = "Acceleration Not supported."
		  document.getElementById("message").style.display="block";
	}

	
	function deviceMotionHandler(eventData) {
		  var info, xyz = "[X, Y, Z]";

		  // Grab the acceleration from the results
		  var acceleration = eventData.acceleration;
		  info = xyz.replace("X", acceleration.x);
		  info = info.replace("Y", acceleration.y);
		  info = info.replace("Z", acceleration.z);
		// document.getElementById("message").innerHTML=dir;
//		 document.getElementById("message").style.display="block";
		 if(controlSetting=="acc")
			 {
		  if(mode==0.5&&Math.abs(acceleration.x)>1&&move==0)
			  {
			  
			  move=1;
			  }
		  else if(mode==0.5&&Math.abs(acceleration.x)<0.5)
			  {
			  if(move==1)
				  {
				  angle=ANG;
				  move=0;
			  mode=1;
			 
				  }
			  }
		}
	}/*
	if (window.DeviceOrientationEvent) {
		  // Listen for the event and handle DeviceOrientationEvent object
		window.addEventListener('deviceorientation', function(eventData) {
			eventData.absolute=false;
		    // gamma is the left-to-right tilt in degrees, where right is positive
		     tiltLR = (eventData.gamma*180/Math.PI)%360;

		    // beta is the front-to-back tilt in degrees, where front is positive
		    var tiltFB = eventData.beta;

		    // alpha is the compass direction the device is facing in degrees
		     dir = eventData.alpha;
		     if(mode==0)
		    	 offset=dir;
		     else
		    	 {
		     if(dir>offset)
		    	 dir=dir-offset;
		     else
		    	 dir=dir+360-offset;
		    	 
		  if(dir<90)
		    {
			  ANG=90+dir;
			  if(move==1)
			  turn=1;
		    }
		  else if(dir<180)
			  {
			  ANG=90+dir;
			  if(move==1)
			  turn=1;
			  }
		  else if(dir<270)
			  {
			  if(move==1)
			  turn=-1;
			 ANG=180-dir; 
			  }
		  else
			  {
			  if(move==1)
			  turn=-1;
			  ANG=(-dir)+450;
			  }
		    	 }
		    // call our orientation event handler
		   // deviceOrientationHandler(tiltLR, tiltFB, dir);
		  }, false);
		} else {
		  document.getElementById("message").innerHTML = "Orientation Not supported."
			  document.getElementById("message").style.display="block";
		}
	*/