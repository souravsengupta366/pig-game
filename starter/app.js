/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var gScore  = [0,0];
var curScore = [0,0];
var  curPlayer = 0;
var rollDOM = document.querySelector('.btn-roll');
var holdDOM = document.querySelector('.btn-hold');
var diceDOM = document.querySelector('.dice');
var winnerDOM = document.querySelector('.winners-class');
var endFlag = 0;

document.querySelector('#score-1').innerHTML = '<b><em>'+gScore[1]+'</em></b>';
document.querySelector('#score-0').innerHTML = '<b><em>'+gScore[0]+'</em></b>';
document.querySelector('#current-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;



var calDiceVal = function(){
    
    return Math.floor(Math.random()*6 + 1);
}

///****DICE ROLL METHOD****/

var rollDice = function(){
    if(endFlag == 1)
        return;
//    else if (endFlag == 2){
//        winnerDOM.style.display = 'none';
//        gScore=[0,0];
//        curScore=[0,0];
//        reflect();
//    }
        
    
    var diceVal = calDiceVal();
    diceDOM.style.display = 'block';        
    diceDOM.src = 'dice-'+diceVal+'.png';   
    if(diceVal !== 1){
//        gScore[curPlayer] += diceVal;
        curScore[curPlayer] += diceVal;
    }        
    else{
        curScore=[0,0];
        changePlayer();
    }
        
     reflect();   
}


///**** CHANGE PLAYER METHOD *******/   
var changePlayer = function(){
    curPlayer = (curPlayer+1)%2;
//    diceDOM.style.display = 'none';  
    
}

/**** REFLECT METHOD ****/
var reflect = function(){
    document.querySelector('#current-0').textContent = curScore[0];
    document.querySelector('#current-1').textContent = curScore[1];
    document.querySelector('#score-1').innerHTML = '<b><em>'+gScore[1]+'</em></b>';
    document.querySelector('#score-0').innerHTML = '<b><em>'+gScore[0]+'</em></b>';

}

rollDOM.addEventListener('click', rollDice);

/*****HOLD**********/
holdDOM.addEventListener('click',function(){
    if(endFlag == 1)
        return;
    gScore[curPlayer] += curScore[curPlayer];
    if(gScore[0] >= 20 || gScore[1] >= 20){
        endGame(curPlayer);
    }
    changePlayer();
    diceDOM.style.display = 'none';
    curScore=[0,0];
    reflect(); 
    
});


var newGame = function(){
    endFlag = 0;
    winnerDOM.style.display = 'none';
        gScore=[0,0];
        curScore=[0,0];
        reflect();
};

var endGame = function(curPlayer){
    diceDOM.style.display = 'none';
    winnerDOM.style.display='block';
    winnerDOM.innerHTML = '<b>The winner is Player'+(curPlayer+1)+'</b>' ;
    endFlag=1;
    
}

document.querySelector('.winners-class').style.display='none';
document.querySelector('.btn-new').addEventListener('click',newGame);






//document.querySelector('#score-0').textContent = gScore[0];
//document.querySelector('#score-1').textContent = gScore[1];

console.log(gScore);
