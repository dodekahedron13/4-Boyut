$(function ($) {    
    window.started = false;

    $('#start').click( function() {
        window.started = true;

        if ( !window.started ) {                 
            return;
        }
        
        $('#start').prop('disabled', true);
        $('#saveend').prop('disabled', false);
        $('#end').prop('disabled', false);
        $('#play').prop('disabled', true);

        if ( window.started ) {
            window.arr = [];
            return takipEt(); 
        }                    
    });

    $('#end').click( function() {
        window.arr = [];      
        $('#start').prop('disabled', false);
        $('#saveend').prop('disabled', true);
        $('#end').prop('disabled', true);
        return window.started = false;
    });

    $('#saveend').click( function() {      
        //console.log( window.arr );
        $('#play').prop('disabled', false);
        $('#start').prop('disabled', false);
        $('#saveend').prop('disabled', true);
        $('#end').prop('disabled', true);

        return window.started = false;        
    });
    
    const __realTime = () => {
        window.d = new Date;
        return window.realTime = d.toLocaleTimeString() + '.' + d.getMilliseconds() + '-' +d.toLocaleDateString();        
    }

    const takipEt = () => {        
        window.arr = [];

        $('html').mousemove(function( event ) {
            if ( window.started ) {               
                window.arr.push( event.pageX, event.pageY);                      
                return console.log( `x:${event.pageX}, y:${event.pageY}, ${__realTime()}` );
            }
        });        
    } 
    
    $('#play').click( function(event) {       
        console.log( window.arr );

        var circle = $('#circle');        
        circle.prop('hidden', false);        
        $('#play').prop('disabled', true);
        /*if (  window.arr.length == 0 ) {        
            $('html').mousemove(function( e ) {
                if ( window.started ) { 
                    return circle.css('left', e.pageX) && circle.css('top', e.pageY);
                }
            });
        }*/
        arrayLen = window.arr.length;
        $(window.arr).each(function(index, element) {
            if ( index % 2 == 0 ) {
                $('#circle').animate({
                   'left': window.arr[index] - parseFloat( $('#circle').height() / 2 ), 
                   'top': window.arr[index + 1] - parseFloat ($('#circle').width() / 2 )                   
                }, 3);   
                /*circle.css({ 
                    'left': window.arr[index] - parseFloat( $('#circle').height() / 2 ), 
                    'top': window.arr[index + 1] - parseFloat ($('#circle').width() / 2 )
                });*/                                        
                //console.log(window.arr[index] + ' ' + window.arr[index + 1]);                 
            }             
        });
        
        window.arr = [];        
    });
  
    $('#xx').on('change input', function(){
        var inputcircle = $('#inputcircle');
        var xx = parseInt( $(this).val() );
        inputcircle.css('top', xx);
    });

    $('#yy').on('change input', function(){
        var inputcircle = $('#inputcircle');
        var yy = parseInt( $(this).val() );
        inputcircle.css('left', yy);
    });

    $(document).on('keydown', function(event) {        
        var step = parseInt( $('#speed').val() 
            ? $('#speed').val() 
            : 1 && $('#speed').val(1) );
        var yy = $('#yy');
        var xx = $('#xx');

        if ( event.which == 38 ) {   
            if ( xx.val() <= 0 ) {
                return;
            }
            xx.val( parseInt(xx.val() 
                ? xx.val() 
                : 0) - parseInt(step) );
            xx.change();
        }
        if ( event.which == 40 ) {           
            xx.val( parseInt(xx.val() 
                ? xx.val() 
                : 0) + parseInt(step) );
            xx.change();
        }
        if ( event.which == 39 ) {
            yy.val( parseInt(yy.val() 
                ? yy.val() 
                : 0) + parseInt(step) );
            yy.change();
        }
        if ( event.which == 37 ) {
            if (yy.val() <= 0) {
                return;
            }           
            yy.val( parseInt(yy.val() 
                ? yy.val() 
                : 0) - parseInt(step) );
            yy.change();
        }        
    });

    window.k = false; // kayıt
    window.b = false; // baslat
    window.n = false; // bitir
    window.m = false; // kaydet ve bitir
    window.l = false; // kaydı oynat
    $(document).on('keydown', function (event) {
        if ( event.which == 75 ) {  // k
            window.k = true;            
        }
        if ( event.which == 66 ) { // b
            window.b = true;            
        }
        if ( event.which == 78) { // m
            window.n = true;
        }
        if ( event.which == 77) { // m
            window.m = true;
        }
        if ( event.which == 76) { // L
            window.l = true;
        }

        if ( k && b ) { // K ve B ye Basıldı Kaydı Başlat
            $('#start').trigger('click');
            window.k = false;
            window.b = false;
            window.n = false;
            window.m = false;
            window.l = false;            
        }

        if ( k && n ) { // K ve N e Basıldı Kaydı Bitir
            $('#end').trigger('click');
            window.k = false;
            window.b = false;
            window.n = false;
            window.m = false;
            window.l = false;           
        }

        if ( k && m ) { // K ve M e Basıldı Kaydı Kaydet ve Bitir
            $('#saveend').trigger('click');
            window.k = false;
            window.b = false;
            window.n = false;
            window.m = false;
            window.l = false;            
        }

        if ( ( k && l ) && !$('#play').prop('disabled') ) { // K ve L e Basıldı Kaydı Oynat ama play disabled degil ise
            $('#play').trigger('click');
            window.k = false;
            window.b = false;
            window.n = false;
            window.m = false;
            window.l = false;            
        }
        
    });

    $(document).on('keyup', function(event){
        if ( event.which == 75 ) {
            window.k = false;
        }
        if ( event.which == 66 ) {
            window.b = false;
        }
        if ( event.which == 77 ) {
            window.m = false;
        }
        if ( event.which == 78 ) {
            window.n = false;
        }
        if ( event.which == 76 ) {
            window.l = false;
        }
    });

    $('#volume').on('input change', function(){
        if ( $(this).val() ) {
            if ( !$('#circle').prop('hidden') ) {
                $('#circle').prop('hidden', true);
            }
            return $('#circle').css({ // border-radius ezilmedi                 
                    'height': `${$(this).val()}`,
                    'width': `${$(this).val()}`,
                    'border-radius': `${$(this).val()}px !important`              
            });
        }        
    });

});