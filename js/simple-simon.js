
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
var delay = 700;
var sound;
var round=0;
var delayAdder = 700;
var duckSound = new Audio("audio/quack.wav");
duckSound.preLoad=true;
duckSound.volume = .5;
duckSound.playbackRate = 1.5;
var redSound = new Audio("audio/red.wav");
redSound.preLoad=true;
redSound.volume = .5;
redSound.playbackRate = 2.5;
redSound.startTime = 1.5;
var greenSound = new Audio("audio/green.wav");
greenSound.preLoad=true;
greenSound.volume = .5;
greenSound.playbackRate = 2.5;
greenSound.startTime = 1.5
var yellowSound = new Audio("audio/yellow.wav");
yellowSound.preLoad=true;
yellowSound.volume = .5;
yellowSound.playbackRate = 2.5;
yellowSound.startTime = 1.5;
var gameOver = new Audio("audio/gameOver.wav");
gameOver.preLoad=true;
gameOver.volume = .5;
var gameStart = new Audio("audio/gameStart.ogg");
gameStart.preLoad=true;
var levelUp = new Audio("audio/leveUp.wav");
levelUp.preLoad=true;
levelUp.volume = .5;
var winner = new Audio("audio/winner.wav");
winner.preLoad=true;



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
    $("h1").css("display", "none");
    console.log(round);
    if (round === 15){
        winner.play();
        gameMessage = "Winner!";
        $("h1").css("display","block");
        $("h1").html(gameMessage);
        $("h1").css("font-size", "6vw");
    }
    else {
        if (round >= 5) {
            delay = 500;
            delayAdder = 500;
            duckSound.playbackRate = 3;
            redSound.playbackRate = 4;
            greenSound.playbackRate = 4;
            yellowSound.playbackRate = 4;
        }
        else {
            delay = 700;
        }
        $(".imageButton").off('click', tileClick);
        $(document).off( "keyup" );
        simonArraylength = simonArray.length;
        counter = 0;
        index = 0;
        randomTile = Math.floor(Math.random() * 3.9);
        switch (randomTile) {
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
        console.log("array " + simonSoundArray);
        simonArray.push(color);
        while (counter < simonArraylength + 1) {
            if (simonArray[counter] === simonArray[counter - 1]) {
                delayAdder += 100;
            }
            setTimeout(
                (function (counter) {
                    return function () {
                        color = simonArray[counter];
                        sound = simonSoundArray[counter];
                        tileID = "#" + color;
                        markTheTile(sound, tileID, color);
                    }
                })(counter), delay);
            counter++;
            delay += delayAdder;
        }

        setTimeout(function () {
            color="";
            $(document).on( "keyup" );
            arrowKeys();
            $(".imageButton").on("click", tileClick);
        }, delay);
        console.log(simonArray);
    }
}

function clear() {
    simonSoundArray=[];
    simonArray=[];
    playerArray=[];
    round=0;
}

$("button").click(function(){
    $("h1").css("display", "none");
    clear();
    gameStart.play();
    setTimeout(function () {
        play();
    }, 500);
});
function arrowKeys() {
    console.log("arrowkeys");
    $(document).keyup(function(e){
    if (e.keyCode == 38){
        color = "green";
    }
    else if (e.keyCode == 40){
        color = "duck";
    }
    else if (e.keyCode == 37){
        color = "yellow";
    }
    else if (e.keyCode == 39){
        color = "red";
    }
        playerfunction();
        color='';
    });

}


function tileClick() {
    color = $(this).attr("id");
    playerfunction();
}

function playerfunction() {
    if (color !== "") {
        switch (color) {
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
        if (!compareThePlays()) {
            gameMessage = "Game Over";
            gameOver.play();
            $("h1").css("display", "block");
            $("h1").html(gameMessage);
            $("h1").css("font-size", "5.5vw");
            clear();
            $(".imageButton").off("click", tileClick);
        }
        else if (index === simonArray.length) {
            playerArray = [];
            index = 0;
            round++;

            if (round === 5) {
                levelUp.play();
                gameMessage = "Level 2 Unlocked";
                $("h1").css("display", "block");
                $("h1").html(gameMessage);
                $("h1").css("font-size", "5.5vw");
                setTimeout(function () {
                    play()
                }, 2000);
            }

            else {
                setTimeout(function () {
                    play()
                }, 1000);
            }


        }
        else {

        }
    }
}
$(".imageButton").off('click', tileClick);
$(document).off( "keyup" );

