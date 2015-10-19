var createNewTopic = function($title,$description){

    var topic = {
      title: $title,
      description: $description
    };

    Meteor.call('newTopic', topic, function (error, result) {
      if (error) {
        if (error.error === 'logged-out')
          toastr.warning(i18n.t('please_login'));
        else if (error.error === 'wait')
          toastr.warning(i18n.t('please_wait', { num: error.reason }));
        else if (error.error === 'invalid-content')
          toastr.warning(i18n.t('topic_too_short'));
        else if (error.error === 'duplicate-content')
        {
            toastr.warning(i18n.t('topic_title_exists'));
            $('#one-modal').modal('hide').on('hidden.bs.modal', function () {
                //Router.go('topic', { '_id': result });  //TODO: urgly hack
            });
            Router.go('topic', { '_id': error.details });
        }
        else
          toastr.warning(i18n.t('error'));
      }
      else {
        $title.val('');
        $description.val('');

        $('#one-modal').modal('hide').on('hidden.bs.modal', function () {
          //Router.go('topic', { '_id': result });  //TODO: urgly hack
        });
        Router.go('topic', { '_id': result });
      }
    });
}

Template.newTopic.events({
  'submit #js-create-topic-form': function(event, template) {
    event.preventDefault();
    var $title = template.$('#js-create-title').val();
    var $description = template.$('#js-create-description').val();
    createNewTopic($title,$description);

  }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.newTopic.helpers({
  new_topic_title:function(){
      return getParameterByName("text");
  },
  new_topic_description:function(){
      return getParameterByName("comment");
  }
});

Template.newTopic.onRendered(function () {
    if(getParameterByName("text")!="")
    {
        createNewTopic(getParameterByName("text"),getParameterByName("comment"));
    }
});
