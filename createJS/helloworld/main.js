'use strick';

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it

// Graphics
//[Background]

var bg; //The background graphic

//[Title View]


var main; //The Main Background
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu

//[Credits]


var credits; //The Credits screen

//[Game View]


var player; //The player paddle graphic
var ball; //The ball graphic
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup

var xSpeed = 5;
var ySpeed = 5;

var tkr = new Object;
var preloader;
var manifest;
var totalLoaded = 0;

var TitleView = new createjs.Container();

var basePath = 'assets/';


function Main() {

    //Canvas
    canvas = document.getElementById('GameStage');

    //Stage
    stage = new createjs.Stage(canvas)
    stage.mouseEventEnable = true;

    /*
    if(!createjs.FlashAudioPlugin.isSupported()){
      return;
    }

   createjs.FlashAudioPlugin.swfPath = basePath;
   */


    manifest = [
        {src:"bg.png", id:"bg"},
        {src:"main.png", id:"main"},
        {src:"startB.png", id:"startB"},
        {src:"creditsB.png", id:"creditsB"},
        {src:"credits.png", id:"credits"},
        {src:"paddle.png", id:"cpu"},
        {src:"paddle.png", id:"player"},
        {src:"ball.png", id:"ball"},
        {src:"win.png", id:"win"},
        {src:"lose.png", id:"lose"},
        {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
        {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
        {src:"hit.mp3|hit.ogg", id:"hit"},
        {src:"wall.mp3|wall.ogg", id:"wall"}
    ];

    preloader = new createjs.LoadQueue();
  //  preloader.installPlugin(SoundJS);
    preloader.on('fileprogress', onProgressHandler, this);
    preloader.on('fileload', onCompleteHandler, this);
    preloader.loadFile('assets/bg.png');

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
     // Actions carried out each tick (aka frame)
     if (!event.paused) {
         // Actions carried out when the Ticker is not paused.
     }
 }

    function onProgressHandler(evt){
      console.log(evt.loaded + ' : ' + evt.total);
    }

    function onCompleteHandler(evt){
        console.log('complete: ' + evt.result);
        //stage.addChild(evt.result);
    }

    function onFileLoadHandler(evt){

    }


}
