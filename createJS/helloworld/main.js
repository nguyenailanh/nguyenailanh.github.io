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
var assetsFactory ={};

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
        {src:"playerScore.mp3", id:"playerScore"},
        {src:"enemyScore.mp3", id:"enemyScore"},
        {src:"hit.mp3", id:"hit"},
        {src:"wall.mp3", id:"wall"}
    ];

    preloader = new createjs.LoadQueue(true, basePath);
  //  preloader.installPlugin(SoundJS);
    preloader.on('progress', onProgressHandler, this);
    preloader.on('complete', onCompleteHandler, this);
    preloader.on('fileload', onFileLoadHandler, this);
    preloader.loadManifest(manifest);

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
     // Actions carried out each tick (aka frame)
     if (!event.paused) {
         // Actions carried out when the Ticker is not paused.
     }
 }

    function onProgressHandler(evt){
      //console.log(evt.loaded + ' : ' + evt.total);
    }

    function onCompleteHandler(evt){

      console.log('complete');
      bg = new createjs.Bitmap(getAssetsById('bg'));
      stage.addChild(bg);
      stage.update();
    }

    function onFileLoadHandler(evt){
      assetsFactory[evt.item.id] =  evt.result;
    }

    function getAssetsById(id){
      return assetsFactory[id];
    }

}
