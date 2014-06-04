if(Meteor.isClient){
  $(document).ready(function(){

    
  });
  
  Template.IdeaCluster.ideas = function(){
    var allIdeas = Ideas.find().fetch();
    return allIdeas;
  } 
}
