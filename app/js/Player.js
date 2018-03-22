var Player=function(id,name,geometry,material)
{
	this.id=id;
	this.name=name;
	this.mesh=new THREE.SkinnedMesh(geometry,material);
};
Player.prototype.setPOV=function()
{

};