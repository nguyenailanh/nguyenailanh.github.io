'use strick';

var canvas;
var stage;

var bg;


var main;
var startB;
var creditsB;

var credits;


var player;
var ball;
var cpu;
var win;
var lose;

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

    var shap = new createjs.Shape();
    shap.graphics.beginFill('#cccccc');
    shap.graphics.drawRect(0,0, 480,320)
    shap.graphics.endFill();

    stage.addChildAt(shap,0);
    stage.update();

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
    preloader.on('progress', onProgressHandler, this);
    preloader.on('complete', onCompleteHandler, this);
    preloader.on('fileload', onFileLoadHandler, this);
    preloader.loadManifest(manifest);

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setInterval(30);
    createjs.Ticker.setFPS(30);

    function handleTickGame(evt){

    }

    function handleTick(event) {
      console.log('tick');
    }

    function onProgressHandler(evt){
      //console.log(evt.loaded + ' : ' + evt.total);
    }

    function onCompleteHandler(evt){
      //remove loading
      document.getElementById('loader').style.display='none';


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
