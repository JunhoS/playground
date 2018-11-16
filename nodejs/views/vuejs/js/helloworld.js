(function(t){
    t();
})(function(){
    'use strict';
    var app = new Vue({
        el: '#app',
        data: {
            message: '안녕하세요 Vue!'
        }
    });
    var app2 = new Vue({
        el: '#btnshow',
        data: {
            btnname: 'hidden'
        }
    });
    var btnChange = document.getElementById('btnChange');
    btnChange.addEventListener('click', function(){
        app.message = '어서오세요 Vue!';
    });
    var app3 = new Vue({
        el: '#app-3',
        data: {
          seen: true
        }
    });
    var btnshow = document.getElementById('btnshow');
    btnshow.addEventListener('click', function(){
        app3.seen = app3.seen ? false : true;
        if(app3.seen){
            app2.btnname = 'hidden';
        }else{
            app2.btnname = 'show';
        }
    });
});