
// get USDT info

$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",        
      }).done(function(msg) {   
        console.log(msg);
        var ETH_price = (msg[0].price_usd);
        var updatedtime = (msg[0].last_updated);
        var unixTimestamp = new Date(parseInt(updatedtime)* 1000) ;      
        $("#update_time").text(unixTimestamp);          
        $("#total").text(toPercent(ETH_price)); 

        $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();
        $("#total").text(toPercent(ETH_price*quantity));        
          })  
      });
  })  


// set point
function toPercent(point){
    var str=Number(point).toFixed(4);          
    return str;
  }  

function toPercent_A(point){
    var str=Number(point).toFixed(7);          
    return str;
  }

function toPercent_01(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
  }   

//時間倒數
  /* Set the date we're counting down to */
    var countDownDate = new Date('JUL 31, 2023 00:00:00').getTime();
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






//------------------------smart contract---------------------------------------------

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    var myContract;
    var coinbase;

    async function printPostsToConsole() {

      //取得帳號
      coinbase = await web3.eth.getCoinbase();

      //取得帳號餘額
      var balance = await web3.eth.getBalance(coinbase);      
      $("#my_address").text(coinbase);
      $("#my_balance").text(web3.utils.fromWei(balance));  //wei 轉換成 ether web3.utils.fromWei()

      var ERC20_contract_address = "0xb1220840461979896c2A01B8EbdDB9189C118F46";
      var ERC20_contract_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

      var hidden_str = (ERC20_contract_address.substring(8,32));
      var ERC20_contract_address_sm  = ERC20_contract_address.replace(hidden_str,"..."); 
      $("#ERC20_address").text(ERC20_contract_address_sm);

      var contract_address = "0x28Bc79045E0B47f20D6BC7992E49B8cEEb586ED7";
      var contract_abi =[{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"token_price","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERC_20_From","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"start","type":"uint256"},{"name":"end","type":"uint256"}],"name":"project_fail","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Safe_space","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"verification","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"investor_number","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay_back","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"exchange","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"ERC20_From","type":"address"},{"name":"space_address","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];   

      ERC20_contract = new web3.eth.Contract(ERC20_contract_abi,ERC20_contract_address);    
      myContract = new web3.eth.Contract(contract_abi, contract_address);   

      var ERC20_Owner = await ERC20_contract.methods.owner().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      var hidden_str = (ERC20_Owner.substring(8,32));
      var ERC20_Owner_sm = ERC20_Owner.replace(hidden_str,"...");            
      $("#ERC20_owner").text(ERC20_Owner_sm);

      var ERC20_Manager = await ERC20_contract.methods.manager().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      var hidden_str = (ERC20_Manager.substring(8,32));
      var ERC20_Manager_sm = ERC20_Manager.replace(hidden_str,"...");            
      $("#ERC20_manager").text(ERC20_Manager_sm);  

      var contract_investors = await myContract.methods.count().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#join_count").text(contract_investors);  

      var safe_space = await myContract.methods.Safe_space().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});      
      var raised_balance = await web3.eth.getBalance(safe_space);     
      var Current_amount = await toPercent_01(raised_balance/(2353*10**18));
      $("#Raised_balance ").text(toPercent(web3.utils.fromWei(raised_balance))); 
      $("#schedule ").text(Current_amount); 
      $("#schedule ").css("width",Current_amount); 
      
      var ERC20_balance = await ERC20_contract.methods.balanceOf(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});   
      $("#erc20_balance").text(web3.utils.fromWei(ERC20_balance)); 

      var my_amount = await myContract.methods.amount(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#My_amount").text(web3.utils.fromWei(my_amount)); 
      
      

      var token_price = await myContract.methods.price().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#token_price").text(toPercent_A(1/token_price)); 
      $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();
        $("#token_total").text(toPercent(token_price*quantity));       
          })  
    };

    printPostsToConsole();


    var pay = document.querySelector('#invest');
      pay.addEventListener("click", function(e) {
        e.preventDefault();
        var count = document.querySelector('.quantity').value;
        var volume = (Number(count) * 1000000000000000000).toString();               
        invest(volume);        
      });  
   
   
    function invest(volume){
      myContract.methods.exchange().send({from: coinbase , value: volume}).then(function(receipt){          
        location.reload();        
      });  
    }





 
    