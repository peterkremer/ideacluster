if(Meteor.isClient){
  $(document).ready(function(){

    $('ul.newstack').sortable({
        items : '',
        receive : function(event, ui){
            CreateStack(ui.item);
            ui.item.remove();
        }
    }).disableSelection();

    $('ul.deck').sortable({
      connectWith : 'ul.deck, ul.newstack, ul.stack'
    }).disableSelection();

  });

  function CreateStack(item) {
    // create a new stack
    var ms = new Date().getTime();
    $('#clusterarea').append($('<ul class="stack"><input type="text" size="60" class="ultext" id="newcluster" placeholder="Name this cluster"'+ ms +'"></ul>').append(item.clone(true, true)));

    // apply sortable to new stack
    $('ul.stack:last').sortable({
        connectWith : 'ul.deck, ul.newstack, ul.stack',
        remove : function(event, ui) {
            // remove stack if empty
            if ($(this).children('li').length == 0)
                $(this).remove();
        }
    }).disableSelection();
  }

  function process_form() {
    var retval = true;
  
    //for each ul in div id clusterarea
    $('#clusterarea ul').each(function()
    {
      //for each ul, get the text (and ID if preexisting)
      var inp = $(this).find('.ultext');
      var id = inp.attr('id');
      var text = inp.val();
    
      if (id == "ignoreme")
        return true;
      
      if (text == "")
      {
        alert("Please ensure all groups have a description in the text box");
        retval = false;
        return false;
      } 
  
      var barnstars = [];
      //and all the barnstars in it
      $(this).children('li').each(function()
      {
        var kid = $(this);
        barnstars.push(kid.attr('id'));
      });
    
      var list = barnstars.join();
    
      //add cluster
      $('#clusterform').append('<input type="hidden" name="'+
                    id + '" value="' +
                    text + '">');
    
      //add cluster contents
      $('#clusterform').append('<input type="hidden" name="grp' + id + '" value="' +
                  list + '">');
    });
    return retval;
  }

  
  Template.IdeaCluster.ideas = function(){
    var allIdeas = Ideas.find();
    return allIdeas;
  }
}
