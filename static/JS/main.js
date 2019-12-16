
//AOS animate
 AOS.init();

// get ETH info
$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",        
      }).done(function(msg) {   
        console.log(msg);
        var ETH_price = (msg[0].price_usd);
        var updatedtime = (msg[0].last_updated);         
        var now = new Date();       
        var date = new Date(parseInt(updatedtime));              
        var DD = new Date(date-now);             

        $("#total").text(toPercent(ETH_price));  
        $("#update_time").text(DD);

        $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();        
        $("#total").text(toPercent(ETH_price*quantity));
          })  
      });
  })

// set point
function toPercent(point){
    var str=Number(point).toFixed(2);          
    return str;
  }

function toPercent_A(point){
    var str=Number(point).toFixed(5);          
    return str;
  }  

function toPercent_01(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
  }


//smart contract

if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
      console.log("Web3連接成功"); 
      $(".connect").css("background-color","#6ab76a");
      $("#connect").text("已連結");       
    } else {
      // Set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
      setTimeout(function(){
        $("#modalInvestForm").modal('show');
      },3000)


    }

    var myContract;
    var coinbase;

    async function printPostsToConsole() {

      
      coinbase = await web3.eth.getCoinbase();      
      var balance = await web3.eth.getBalance(coinbase);
      $("#my_address").text(coinbase);
      $("#my_balance").text(toPercent_A(web3.utils.fromWei(balance)));  //wei 轉換成 ether web3.utils.fromWei()

      var contract_address = "0x9130891B991b630b6F41A10cF131b83c8F85F1A6";
      var contract_abi = [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"son","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Safe_trans","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_son","type":"uint256"},{"name":"_mon","type":"uint256"}],"name":"Set_quota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"distribute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userinfo","outputs":[{"name":"amount","type":"uint256"},{"name":"user_profit","type":"uint256"},{"name":"block_number","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Dividing_times","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"querybalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"uint256"}],"name":"Set_Interest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInterest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Amount_invested","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

      myContract = new web3.eth.Contract(contract_abi, contract_address);

      //取得合約餘額 
      var balance_contract = await web3.eth.getBalance(contract_address);
      $("#total_balance").text(toPercent_A(web3.utils.fromWei(balance_contract)));

      var Interest = await myContract.methods.getInterest().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#Interest_number").text(toPercent_01(1/Interest));

      var count = await myContract.methods.count().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#count").text(count);   

      var user_info = await myContract.methods.userinfo(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#capital").text(web3.utils.fromWei(user_info[0]));
      $("#user_interest").text(toPercent_01(1/user_info[1]));      
      $("#block_height").text(user_info[2]);
      var trans_time = new Date(parseInt(user_info[3]));             
      var now= new Date();    
      var time = new Date(now-trans_time);
      $("#time").text(time);   

      var son = await myContract.methods.son().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      var mon = await myContract.methods.mon().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#de_capital").text(toPercent_A(web3.utils.fromWei(user_info[0])*(1-(son/mon))));  

      var Dividing_time = await myContract.methods.Dividing_times(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
      console.log(parseInt(Dividing_time),parseInt( web3.utils.fromWei(user_info[0])),parseFloat(1/user_info[1])) ;                   
      $("#profit").text(toPercent_A(parseInt(Dividing_time)*parseFloat( web3.utils.fromWei(user_info[0]))*parseFloat(1/user_info[1])));
    };

    printPostsToConsole();


    function quite(){
      myContract.methods.quit().send({from: coinbase}).then(function(receipt){          
        location.reload();
      });
    } 


    function invest(volume){
      myContract.methods.invest().send({from: coinbase , value: volume}).then(function(receipt){          
        location.reload();
      });
    }



     


