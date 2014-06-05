if(Meteor.isClient){
  $(document).ready(function(){

    $('ul.newstack').sortable({
        items : '',
        receive : function(event, ui){
            CreateCluster(ui.item);
            ui.item.remove();
        }
    }).disableSelection();

    $('ul.deck').sortable({
      connectWith : 'ul.deck, ul.newstack, ul.stack'
    }).disableSelection();

  });

  function CreateCluster(item) {
    // create a new stack
    var ms = new Date().getTime();
    $('#clusterarea').append($('<ul class="stack col-md-3"><input type="text" size="60" class="ultext" id="newcluster" placeholder="Name this cluster"'+ ms +'"></ul>').append(item.clone(true, true)));

    // apply sortable to new stack
    $('ul.stack:last').sortable({
        connectWith : 'ul.deck, ul.newstack, ul.stack',
        remove : function(event, ui) {
            // remove stack if empty
            if ($(this).children('li').length == 0)
                $(this).remove();
        }
    }
    ).disableSelection();

    $('#clusterarea ul').draggable({
      snap: "#clusterarea ul", 
      snapMode: "outer", 
      grid: [5, 5]
    });
  }

  function getCenterPos(element){
    var offset = element.offset();
    var width = element.width();
    var height = element.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;
    return [centerX, centerY];
  }
  
  Template.IdeaCluster.ideas = function(){
    var allIdeas = Ideas.find();
    return allIdeas;
  }

  Template.IdeaCluster.events({
    'click button#finish' : function(){
      var finished = true;

      $('#clusterarea').children('ul').each(function(i){
        var $this = $(this);
        var clustername = $this.find('input').val();
        
        //check if all clusters are named and 
        if(clustername === ""){
          alert("Please name all clusters");
          finished = false;
          return finished;
        };

        //gets coordinates of cluster center
        var thisPosition = getCenterPos($this);

        //iterates through list items and adds 
        var kids = $this.children('li');
        var thisIdeas = [];
        kids.each(function(k){
          var currId = $(this).attr('id');
          var currIdea = $(this).text();
          var idea = {id: currId, instance: currIdea};
          thisIdeas.push(idea);
        });

        var thisCluster = new Cluster(clustername, thisIdeas, thisPosition)
        //console.log(thisCluster);

      });
    }
  })
}
