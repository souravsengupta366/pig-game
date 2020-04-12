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
var  curPlayer = 0,prevWinScore = 50; //prevVal = 0;
var rollDOM = document.querySelector('.btn-roll');
var holdDOM = document.querySelector('.btn-hold');
var diceDOM = document.querySelector('.dice');
var dice2DOM = document.querySelector('.dice2');
var winnerDOM = document.querySelector('.winners-class');
var setWinScoreDOM = document.getElementById('set-winScore');
var endFlag = 0;
var winScore = 50;


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
    
    var diceVal = calDiceVal();
    var diceVal2 = calDiceVal();    
//    var diceVal = 6;
//    if(prevVal == 6 && diceVal == 6){
////        console.log('hi');
//        prevVal=0;
//        changePlayer();
//        return;
//    }
    
    diceDOM.src = 'dice-'+diceVal+'.png';   
    dice2DOM.src = 'dice-'+diceVal2+'.png';
    diceDOM.style.display = 'block';
    dice2DOM.style.display = 'block';
   
    if(diceVal !== 1 && diceVal2 != 1){
//        gScore[curPlayer] += diceVal;
        curScore[curPlayer] += diceVal+diceVal2;
    }        
    else{
        curScore=[0,0];
        changePlayer();
    }
        
     reflect();   
//     prevVal = diceVal;
}


///**** CHANGE PLAYER METHOD *******/   
var changePlayer = function(){
     document.querySelector('.player-'+curPlayer+'-panel').classList.remove('active');
    curPlayer = (curPlayer+1)%2;
    document.querySelector('.player-'+curPlayer+'-panel').classList.add('active');
    curScore = [0,0];
    reflect();
    
//    diceDOM.style.display = 'none';  
    
}

/**** REFLECT METHOD ****/
var reflect = function(){
    document.querySelector('#current-0').textContent = curScore[0];
    document.querySelector('#current-1').textContent = curScore[1];
    document.querySelector('#score-1').innerHTML = '<b><em>'+gScore[1]+'</em></b>';
    document.querySelector('#score-0').innerHTML = '<b><em>'+gScore[0]+'</em></b>';

}




/***NEW GAME FUNCTION ***/
var newGame = function(){
    endFlag = 0;
    winnerDOM.style.display = 'none';
    document.querySelector('.player-'+curPlayer+'-panel').classList.remove('winner');
    document.querySelector('.player-'+curPlayer+'-panel').classList.remove('active');
    document.getElementById('name-'+curPlayer).innerHTML='Player'+(curPlayer+1);
    gScore=[0,0];
    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    curScore=[0,0];
    curPlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    winScore = 50;
    reflect();
};

/*** END GAME & WINNER DECLARATION ***/
var endGame = function(curPlayer){
    endFlag=1;
    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    document.querySelector('.player-'+curPlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+curPlayer+'-panel').classList.remove('active');
    document.querySelector('#name-'+curPlayer).innerHTML='<b> Player'+(curPlayer+1)+' is the WINNER</b>';
    reflect(); 
    
}

/**** SET WIN SCORE ***/
function setWinScore(){
    if(endFlag == 1)
        return;
    prevWinScore = winScore;
    winScore = prompt("Please enter the winning score",winScore);
    while(winScore<0)
        winScore = prompt("Please enter the winning score > 0",50);
    if(winScore>0)
        alert("New Winning Score Set: "+winScore);    
    else if(winScore === null || winScore == 0)
       {
           winScore = prevWinScore;
           alert("Winning Score is still: "+winScore);
       }
    if(gScore[0] >= winScore || gScore[1] >= winScore){
        endGame(curPlayer);
        return;
    }
      
        
}

document.querySelector('.winners-class').style.display='none';


/***EVENT LISTENERS ***/

/***NEW GAME ***/
document.querySelector('.btn-new').addEventListener('click',newGame);

/***DICE CLICK EVENT ***/
rollDOM.addEventListener('click', rollDice);

/*****HOLD**********/
holdDOM.addEventListener('click',function(){
    if(endFlag == 1)
        return;
    gScore[curPlayer] += curScore[curPlayer];
    if(gScore[0] >= winScore || gScore[1] >= winScore){
        endGame(curPlayer);
        return;
    }
    changePlayer();
    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    curScore=[0,0];
    reflect(); 
    
    
});


/***SET NEW WIN SCORE ***/

setWinScoreDOM.addEventListener('click',setWinScore);
