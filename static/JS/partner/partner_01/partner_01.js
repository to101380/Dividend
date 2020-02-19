
// get USDT info

$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://api.coinmarketcap.com/v1/ticker/tether/",        
      }).done(function(msg) {   
        console.log(msg);  
        var usdt_price = (msg[0].price_usd);
        var updatedtime = (msg[0].last_updated);
        var unixTimestamp = new Date(parseInt(updatedtime)* 1000) ;      
        $("#update_time").text(unixTimestamp);          
        $("#total").text(toPercent(usdt_price)); 

        $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();
        $("#total").text(toPercent(usdt_price*quantity));  
        });   
          
      });
  }) 


// set point
function toPercent(point){
    var str=Number(point).toFixed(4);          
    return str;
  }  


//時間倒數
  /* Set the date we're counting down to */
    var countDownDate = new Date('jan 18, 2020 15:35:00').getTime();
    var countDownDateTXT = '';
    function mytime() {
        countDownDateTxt = document.getElementById('txt').value;
        countDownDate = new Date(countDownDateTxt).getTime();
        document.getElementById('now-time').innerHTML = countDownDateTxt;
    }

/* Update the count down every 1 second */

var x = setInterval(function() {
    /* Get todays date and time */
    var now = new Date().getTime();

    /* Find the distance between now and the count down date */
    var distance = countDownDate - now;

    /* Time calculations for days, hours, minutes and seconds */
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    /* Display the result in the element with id="demo" */
    document.getElementById('timer_day').innerHTML = days + 'D ';    
    document.getElementById('timer_hr').innerHTML =  hours + 'h ';
    document.getElementById('timer_min').innerHTML = minutes + 'm ';
    document.getElementById('timer_sec').innerHTML = seconds + 's ';
    
    if(days+hours+minutes+seconds<0){      
      $("#timer_day").text("0D");
      $("#timer_hr").text("0h");
      $("#timer_min").text("0m");
      $("#timer_sec").text("0s");
      $(".reciprocal").css("background-color","#e8e8e8");
      $("#finish").text("募資已結束");
      $("#finish").css("visibility","visible")
     }

    /* If the count down is finished, write some text */
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('timer').innerHTML = 'EXPIRED';
    }
}, 1000);
    