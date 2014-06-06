Ideas = new Meteor.Collection("ideas");
Clusters = new Meteor.Collection("clusters");

var isPop = false;

function populateList(){
	Ideas.insert({idea: "Use it as a bowling pin"});
	Ideas.insert({idea: "Bludgeon someone"});
	Ideas.insert({idea: "Hold down papers"});
	Ideas.insert({idea: "hollow out and us as vase"});
}

Cluster = function(name, ideas, position){
	this.name = name;
	this.ideas = ideas;
	this.position = position;
};

populateList();