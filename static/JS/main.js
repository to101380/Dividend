
//AOS animate
 AOS.init();

// get ETH info
$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",        
      }).done(function(msg) {   
        console.log(msg);
        var price = (msg[0].price_usd);
        var updatedtime = (msg[0].last_updated); 
        var now = new Date();       
        var date = new Date(parseInt(updatedtime)); 
        var DD = new Date(now-date);      

        $("#total").text(toPercent(price));  
        $("#time").text(DD);  
      });
  })

// set point
function toPercent(point){
    var str=Number(point).toFixed(2);          
    return str;
  }

//Just-in-time calculation
$(document).ready(function(){
  $('#ticket').on('keyup','.quantity',function(){
     var price = $('#ticket').data('price');
     var quantity = $(this).val();        
     $("#total").text(toPercent(price*quantity));
  })
});

