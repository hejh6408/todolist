$(document).ready(function(){
  $('form').on('submit', function(){

    let name = $('input[name="name"]').val().trim(" ");
    let content = $('textarea[name="content"]').val();
    // let content = $('form textarea');
    let prior = $('input:radio[name=prior]:checked').val();
    let duedate = " ";
    if($('#duedate').val().length == 0){
      duedate = new Date("2200-12-30").toISOString()
    }
    else{
      duedate = new Date($('#duedate').val()).toISOString();
    }

    let iscomplete = false;
    // console.log(name.val());
    // console.log(content.val());
    // console.log(prior.val());
    // console.log(duedate.val());
    let todo = {
      name: name,
      content: content,
      priority: prior,
      duedate: duedate,
      iscomplete: iscomplete
    };

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data){
        //do something with the data via front-end framework
        // mongodb 에서 입력한 data 를 반환
        // console.log(data);
        location.reload();
      },
      error: function(req, status, error){

        alert(error + "data alreay exist");
      },
      async: false
    });
    return false;
  });

  $('li .del_img').on('click', function(){
    let name = $(this).siblings(".todolistname").text();
    // let name = $(this).text().replace(/ /g, "-");
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + name,
      success: function(data){
        //do something with the data via front-end framework

        location.reload();
      }
    });
  });
  $('li .show_img').on('click', function(){
    let content = $(this).parent().siblings(".todolistcontent");
    if($(content).css("display") == "none"){
      $(content).css("display", "inline-block");
    }
    else{
      $(content).css("display", "none");
    }
  });
  $('li .chk_img').on('click', function(){
    let name = $(this).siblings(".todolistname").text().trim(" ");
    // let name = $(this).text().replace(/ /g, "-");

    let _id = undefined;
    $.ajax({
      type: 'GET',
      url: '/todo/' + name,
      success: function(data){
        //do something with the data via front-end framework
        _id = data._id;
      },
      async: false
    });
    if(_id === undefined) return;
    $.ajax({
      type: 'PUT',
      url: '/todo/' + _id +"/iscomplete/" + 1,
      success: function(data){
        //do something with the data via front-end framework
        location.reload();
      }
    });
  });
  $('li .mod_img').on('click', function(){
    let name = $(this).siblings(".todolistname").text().trim(" ");
    let content = $(this).parent().siblings(".todolistcontent").text().trim(" ");

    $('#todo_name').val(name);
    $('#content').val(content);
    let _data = undefined;
    $.ajax({
      type: 'GET',
      url: '/todo/' + name,
      success: function(data){
        //do something with the data via front-end framework
        _data = data;

        $(`#radio${data.priority + 1}`).prop("checked", true);
      },
      async: false
    });
    if(_data === undefined) return;

    $.ajax({
      type: 'PUT',
      url: '/todo/modify/' + _data._id,
      success: function(data){
        //do something with the data via front-end framework

      },
    });
  });
});
