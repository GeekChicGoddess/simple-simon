
"use strict";
var simonArray= [];
var simonSoundArray = [];
var playerArray=[];
var randomTile;
var tileID;
var color;
var gameMessage;
var index = 0;
var simonArraylength = 0;
var counter;
var delay = 1000;
var sound;
var duckSound = new Audio("audio/quack.wav");
duckSound.preLoad=true;
duckSound.volume = .5;
duckSound.playbackRate = 1.5;
var redSound = new Audio("audio/red.wav");
redSound.preLoad=true;
redSound.volume = .5;
redSound.playbackRate = 2;
var greenSound = new Audio("audio/green.wav");
greenSound.preLoad=true;
greenSound.volume = .5;
greenSound.playbackRate = 2;
var yellowSound = new Audio("audio/yellow.wav");
yellowSound.preLoad=true;
yellowSound.volume = .5;
yellowSound.playbackRate = 2;

function markTheTile(sound, tileID, color) {
    $(tileID).addClass("imageButtonFaded");
    sound.play();
    sound.onended = function () {
        $(tileID).removeClass("imageButtonFaded")
    }
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
 $(".imageButton").off('click', tileClick);
    simonArraylength = simonArray.length;
    counter = 0;
    index = 0;
    delay = 1000;
    randomTile = Math.floor(Math.random()* 3.9);
    switch (randomTile){
        case 0: {
            tileID = "#green";
            color = "green";
            sound = greenSound;
            break;
        }
        case 1: {
            tileID = "#yellow";
            color = "yellow";
            sound = yellowSound;
            break;
        }
        case 2: {
            tileID = "#red";
            color = "red";
            sound = redSound;
            break;
        }
        case 3: {
            tileID = "#duck";
            color = "duck";
            sound = duckSound;
            break;
        }
    }
    simonSoundArray.push(sound);
    console.log("array "+simonSoundArray);
    simonArray.push(color);
    while (counter < simonArraylength+1) {
        setTimeout(
            (function (counter) {
                return function() {
                    color = simonArray[counter];
                    sound = simonSoundArray[counter];
                    tileID = "#" + color;
                    markTheTile(sound, tileID, color);
                }
            })(counter),delay);
        counter++;
        delay+=1000;
    }

    setTimeout(function(){
        $(".imageButton").on("click",tileClick);
    },delay);
    console.log(simonArray);
}

$("button").click(function(){
    $("h1").css("display", "none");
    simonSoundArray=[];
    simonArray=[];
    playerArray=[];
    play()
});

function tileClick() {
    color = $(this).attr("id");
    switch (color){
        case "green": {
            tileID = "#green";
            sound = greenSound;
            break;
        }
        case "yellow": {
            tileID = "#yellow";
            sound = yellowSound;
            break;
        }
        case "red": {
            tileID = "#red";
            sound = redSound;
            break;
        }
        case "duck": {
            tileID = "#duck";
            sound = duckSound;
            break;
        }
    }
    playerArray.push(color);
    markTheTile(sound, tileID, color);
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
        },1500);
    }
    else {

    }

}

