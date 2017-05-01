/** 0 = green // 1 = blue  2 = red // 3 = purple  */

"use strict";
var simonArray= [];
var playerArray=[];
var randomTile;
var tileID;
var color;
var gameMessage;
var index = 0;
var simonArraylength = 0;
var counter;
var delay = 1000;
function markTheTile(tileID, color, time){
    $(tileID).css("background-color", "black");
    setTimeout(function(){
        $(tileID).css("background-color", color)}, time);
}
function compareThePlays() {
    if (playerArray[index] === simonArray[index]){
        index++
        return true;
    }
    else {
        return false;
    }
}
function play (){
 $(".colorTile").off('click', tileClick);
    simonArraylength = simonArray.length;
    counter = 0;
    index = 0;
    delay = 1000;
    randomTile = Math.floor(Math.random()* 3.9);
    console.log(randomTile);
    switch (randomTile){
        case 0: {
            tileID = "#green";
            color = "green";
            break;
        }
        case 1: {
            tileID = "#blue";
            color = "blue";
            break;
        }
        case 2: {
            tileID = "#red";
            color = "red";
            break;
        }
        case 3: {
            tileID = "#purple";
            color = "purple";
            break;
        }
    }
    simonArray.push(color);
    while (counter < simonArraylength+1) {
        setTimeout(
            (function (counter) {
                return function() {
                    color = simonArray[counter];
                    tileID = "#" + color;
                    markTheTile(tileID, color, 500);
                }
            })(counter),delay);
        counter++;
        delay+=1000;
    }

    setTimeout(function(){
        $(".colorTile").on("click",tileClick);
    },delay+1000);
    console.log(simonArray);
}

$("button").click(function(){
    $("h1").css("display", "none");
    simonArray=[];
    playerArray=[];
    play()
});
// $(".colorTile"). click(tileClick);

function tileClick() {
    console.log("start tileclikc " + index);
    color = $(this).attr("id");
    tileID = "#" + color;
    playerArray.push(color);
    console.log(playerArray);
    markTheTile(tileID, color, 500);
    console.log(index);
    if (!compareThePlays()){
        gameMessage = "Game Over";
        $("h1").css("display","block");
        $("h1").text(gameMessage);
        simonArray=[];
        playerArray=[];
    }
    else if (index === simonArray.length) {
        playerArray=[];
        index = 0;
        setTimeout(function () {
            play()
        },2500);
    }
    else {

    }

}

