var axios = require('axios');
var qs = require('qs');
var ardorjs = require('ardorjs');

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

function getAmount(){
    axios.get("https://testardor.jelurida.com/nxt?requestType=getBalance&chain=1&account=ARDOR-RTVF-4RXC-Q23W-64W2G", config)
    .then(function(response){
        var rewardAmount = ((response.data.balanceNQT)/100000000).toFixed(0);
        if (rewardAmount <= 1){
        	reward.textContent = "Prize Already Claimed!"
        } else {
        reward.textContent = "Reward: " + "10" + " Ardor TestNet Tokens";}
    });
}

function sendIgnis(nodeurl, amountNQT, recipient, passphrase){

  if(document.getElementById("yourAccount").value == ""){
  	alert("You must enter an Ardor Account!");
  };

  const publicKey = ardorjs.secretPhraseToPublicKey(passphrase);
  console.log(ardorjs.secretPhraseToPublicKey(passphrase));

  var query = {
    chain:1,
    recipient:recipient,
    amountNQT:amountNQT,
    feeNQT:-1,
    deadline:15,
    broadcast:false,
    publicKey:publicKey
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  const url_sendmoney = nodeurl+'?requestType=sendMoney';
  const url_broadcast = nodeurl+'?requestType=broadcastTransaction';

  console.log('get minimumFee');
  return axios.post(url_sendmoney, qs.stringify(query), config)
          .then(function(response) {
            if(response.data.errorDescription == "Unknown account"){
              alert("Puzzle is not solved correctly! Try Again.");
            }
            if(response.data.errorDescription == "Incorrect \"recipient\""){
              alert("Invalid account! Must have a valid Ardor account to enter!")
            }
            if(response.data.errorDescription == "Not enough funds"){
              alert("Funds have been drained! Someone already solved this puzzle!")
            }
            query.feeNQT = response.data.minimumFeeFQT;
            query.broadcast = false;
            console.log('get transactionBytes');
            return axios.post(url_sendmoney, qs.stringify(query), config)
                .then(function(response){
                  const signed = ardorjs.signTransactionBytes(response.data.unsignedTransactionBytes, passphrase);
                  const txdata = {transactionBytes:signed};
                  
                  console.log("sending signed transaction");
                  return axios.post(url_broadcast, qs.stringify(txdata), config)
                        .then(function(response){
                          alert("You win! Funds are being transferred to your account now!");
                          return response;
                        })
                })
          });
  }

getAmount();

document.getElementById("mybutton").onclick = function () {
  var passphrase = document.getElementById("a1").value.toLowerCase() +
                    document.getElementById("a2").value.toLowerCase() +
                    document.getElementById("a3").value.toLowerCase() +
                    " " +
                    document.getElementById("a5").value.toLowerCase() +
                    document.getElementById("a6").value.toLowerCase() +
                    document.getElementById("a7").value.toLowerCase() +
                    document.getElementById("a8").value.toLowerCase() +
                    " " +
                    document.getElementById("a10").value.toLowerCase() +
                    document.getElementById("a11").value.toLowerCase() +
                    document.getElementById("a12").value.toLowerCase() +
                    document.getElementById("a13").value.toLowerCase() +
                    " " +
                    document.getElementById("b1").value.toLowerCase() +
                    document.getElementById("b2").value.toLowerCase() +
                    document.getElementById("b3").value.toLowerCase() +
                    " " +
                    document.getElementById("b5").value.toLowerCase() +
                    document.getElementById("b6").value.toLowerCase() +
                    document.getElementById("b7").value.toLowerCase() +
                    document.getElementById("b8").value.toLowerCase() +
                    " " +
                    document.getElementById("b10").value.toLowerCase() +
                    document.getElementById("b11").value.toLowerCase() +
                    document.getElementById("b12").value.toLowerCase() +
                    document.getElementById("b13").value.toLowerCase() +
                    " " +
                    document.getElementById("c1").value.toLowerCase() +
                    document.getElementById("c2").value.toLowerCase() +
                    document.getElementById("c3").value.toLowerCase() +
                    document.getElementById("c4").value.toLowerCase() +
                    document.getElementById("c5").value.toLowerCase() +
                    document.getElementById("c6").value.toLowerCase() +
                    document.getElementById("c7").value.toLowerCase() +
                    document.getElementById("c8").value.toLowerCase() +
                    " " +
                    document.getElementById("c10").value.toLowerCase() +
                    document.getElementById("c11").value.toLowerCase() +
                    document.getElementById("c12").value.toLowerCase() +
                    document.getElementById("c13").value.toLowerCase() +
                    " " +
                    document.getElementById("d4").value.toLowerCase() +
                    document.getElementById("d5").value.toLowerCase() +
                    document.getElementById("d6").value.toLowerCase() +
                    " " +
                    document.getElementById("d8").value.toLowerCase() +
                    document.getElementById("d9").value.toLowerCase() +
                    document.getElementById("d10").value.toLowerCase() +
                    document.getElementById("d11").value.toLowerCase() +
                    document.getElementById("d12").value.toLowerCase() +
                    document.getElementById("d13").value.toLowerCase() +
                    " " +
                    document.getElementById("e1").value.toLowerCase() +
                    document.getElementById("e2").value.toLowerCase() +
                    document.getElementById("e3").value.toLowerCase() +
                    document.getElementById("e4").value.toLowerCase() +
                    document.getElementById("e5").value.toLowerCase() +
                    " " +
                    document.getElementById("e7").value.toLowerCase() +
                    document.getElementById("e8").value.toLowerCase() +
                    document.getElementById("e9").value.toLowerCase() +
                    document.getElementById("e10").value.toLowerCase() +
                    " " +
                    document.getElementById("f1").value.toLowerCase() +
                    document.getElementById("f2").value.toLowerCase() +
                    document.getElementById("f3").value.toLowerCase() +
                    document.getElementById("f4").value.toLowerCase() +
                    " " +                    
                    document.getElementById("f6").value.toLowerCase() +
                    document.getElementById("f7").value.toLowerCase() +
                    document.getElementById("f8").value.toLowerCase() +
                    document.getElementById("f9").value.toLowerCase() +
                    document.getElementById("f10").value.toLowerCase() +
                    document.getElementById("f11").value.toLowerCase() +
                    document.getElementById("f12").value.toLowerCase() +
                    document.getElementById("f13").value.toLowerCase() +                
                    " " +       
                    document.getElementById("g1").value.toLowerCase() +
                    document.getElementById("g2").value.toLowerCase() +
                    document.getElementById("g3").value.toLowerCase() +
                    " " +
                    document.getElementById("g5").value.toLowerCase() +
                    document.getElementById("g6").value.toLowerCase() +
                    document.getElementById("g7").value.toLowerCase() +
                    document.getElementById("g8").value.toLowerCase() +
                    document.getElementById("g9").value.toLowerCase() +
                    " " +
                    document.getElementById("g11").value.toLowerCase() +
                    document.getElementById("g12").value.toLowerCase() +
                    document.getElementById("g13").value.toLowerCase() +
                    " " +
                    document.getElementById("h1").value.toLowerCase() +
                    document.getElementById("h2").value.toLowerCase() +
                    document.getElementById("h3").value.toLowerCase() +
                    document.getElementById("h4").value.toLowerCase() +
                    document.getElementById("h5").value.toLowerCase() +
                    document.getElementById("h6").value.toLowerCase() +
                    document.getElementById("h7").value.toLowerCase() +
                    document.getElementById("h8").value.toLowerCase() +
                    " " +
                    document.getElementById("h10").value.toLowerCase() +
                    document.getElementById("h11").value.toLowerCase() +
                    document.getElementById("h12").value.toLowerCase() +
                    document.getElementById("h13").value.toLowerCase() +
                    " " +
                    document.getElementById("i4").value.toLowerCase() +
                    document.getElementById("i5").value.toLowerCase() +
                    document.getElementById("i6").value.toLowerCase() +
                    document.getElementById("i7").value.toLowerCase() +
                    " " +                    
                    document.getElementById("i9").value.toLowerCase() +
                    document.getElementById("i10").value.toLowerCase() +
                    document.getElementById("i11").value.toLowerCase() +
                    document.getElementById("i12").value.toLowerCase() +
                    document.getElementById("i13").value.toLowerCase() +
                    " " +
                    document.getElementById("j1").value.toLowerCase() +
                    document.getElementById("j2").value.toLowerCase() +
                    document.getElementById("j3").value.toLowerCase() +
                    document.getElementById("j4").value.toLowerCase() +
                    document.getElementById("j5").value.toLowerCase() +
                    document.getElementById("j6").value.toLowerCase() +
                    " " +
                    document.getElementById("j8").value.toLowerCase() +
                    document.getElementById("j9").value.toLowerCase() +
                    document.getElementById("j10").value.toLowerCase() +
                    " " +
                    document.getElementById("k1").value.toLowerCase() +
                    document.getElementById("k2").value.toLowerCase() +
                    document.getElementById("k3").value.toLowerCase() +
                    document.getElementById("k4").value.toLowerCase() +
                    " " +
                    document.getElementById("k6").value.toLowerCase() +
                    document.getElementById("k7").value.toLowerCase() +
                    document.getElementById("k8").value.toLowerCase() +
                    document.getElementById("k9").value.toLowerCase() +
                    document.getElementById("k10").value.toLowerCase() +
                    document.getElementById("k11").value.toLowerCase() +
                    document.getElementById("k12").value.toLowerCase() +
                    document.getElementById("k13").value.toLowerCase() +               
                    " " +
                    document.getElementById("l1").value.toLowerCase() +
                    document.getElementById("l2").value.toLowerCase() +
                    document.getElementById("l3").value.toLowerCase() +
                    document.getElementById("l4").value.toLowerCase() +
                    " " +
                    document.getElementById("l6").value.toLowerCase() +
                    document.getElementById("l7").value.toLowerCase() +
                    document.getElementById("l8").value.toLowerCase() +
                    document.getElementById("l9").value.toLowerCase() +
                    " " +
                    document.getElementById("l11").value.toLowerCase() +
                    document.getElementById("l12").value.toLowerCase() +
                    document.getElementById("l13").value.toLowerCase() +
                    " " +
                    document.getElementById("m1").value.toLowerCase() +
                    document.getElementById("m2").value.toLowerCase() +
                    document.getElementById("m3").value.toLowerCase() +
                    document.getElementById("m4").value.toLowerCase() +
                    " " +
                    document.getElementById("m6").value.toLowerCase() +
                    document.getElementById("m7").value.toLowerCase() +
                    document.getElementById("m8").value.toLowerCase() +
                    document.getElementById("m9").value.toLowerCase() +
                    " " +
                    document.getElementById("m11").value.toLowerCase() +
                    document.getElementById("m12").value.toLowerCase() +
                    document.getElementById("m13").value.toLowerCase()
                    ;
console.log(passphrase);

  var yourAddress = document.getElementById("yourAccount").value

	sendIgnis("https://testardor.jelurida.com/nxt", 1000000000, yourAddress, passphrase);
}