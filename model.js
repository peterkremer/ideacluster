Ideas = new Meteor.Collection("ideas");

var isPop = false;

function populateList(){
	if(!isPop){
		Ideas.insert({idea: "Use it as a bowling pin"});
		Ideas.insert({idea: "Bludgeon someone"});
		Ideas.insert({idea: "Hold down papers"});
		Ideas.insert({idea: "hollow out and us as vase"});
		isPop=true;
		console.log("list populated");
	}
}

populateList();