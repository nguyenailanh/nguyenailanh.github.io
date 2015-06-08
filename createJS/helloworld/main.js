'use strick';

var canvas;
var stage;

var bg;


var main;
var startB;
var creditsB;

var credits;


var paddle;
var ball;
var cpu;
var win;
var lose;

var xSpeed = 5;
var ySpeed = 5;

var tkr = new Object;
var preloader;
var totalLoaded = 0;

var TitleView = new createjs.Container();

var basePath = 'assets/';
var assetsFactory ={};
var first = true;
var soundHit;

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

    var = graphicManifest = [
        {src:"bg.png", id:"bg"},
        {src:"main.png", id:"main"},
        {src:"startB.png", id:"startB"},
        {src:"creditsB.png", id:"creditsB"},
        {src:"credits.png", id:"credits"},
        {src:"paddle.png", id:"cpu"},
        {src:"paddle.png", id:"paddle"},
        {src:"ball.png", id:"ball"},
        {src:"win.png", id:"win"},
        {src:"lose.png", id:"lose"}
    ];

    preloader = new createjs.LoadQueue(true, basePath);
    preloader.on('progress', onProgressHandler, this);
    preloader.on('complete', onCompleteHandler, this);
    preloader.on('fileload', onFileLoadHandler, this);
    preloader.loadManifest(graphicManifest);

    var soundsManifest = [
        {src:"playerScore.mp3", id:"playerScore"},
        {src:"enemyScore.mp3", id:"enemyScore"},
        {src:"hit.mp3", id:"hit"},
        {src:"wall.mp3", id:"wall"}
    ];

    createjs.Sound.on('fileload', onSoundFileLoadHandler);
    createjs.Sound.registerSounds(soundsManifest, basePath);

    function onSoundFileLoadHandler(evt){
      assetsFactory[evt.id] =  evt.src;
    }

    function handleTickGame(evt){
      console.log('tick game');
    }

    function handleTick(event) {
      console.log('tick');
      if(stage){
        stage.update();
      }
    }

    function onProgressHandler(evt){
      //console.log(evt.loaded + ' : ' + evt.total);
    }

    function onCompleteHandler(evt){
      //remove loading
      document.getElementById('loader').style.display='none';
      stage.enableMouseOver()
      bg = new createjs.Bitmap(getAssetsById('bg'));
      stage.addChild(bg);

      ball = new createjs.Bitmap(getAssetsById('ball'));
      ball.x = 240-15;
      ball.y = -35;
      stage.addChild(ball);

      paddle = new createjs.Bitmap(getAssetsById('paddle'));
      stage.addChild(paddle);
      paddle.cursor ='pointer';
      paddle.x = 240- 37;
      paddle.y = 320;
      //paddle.y = 320 - 23;
      //paddle.addEventListener('mousedown', onDownHandler);
      paddle.addEventListener('pressmove', onPressMoveHandler);


      startB = new createjs.Bitmap(getAssetsById('startB'));
      startB.cursor='pointer';
      startB.x = 240 - 60;
      startB.y= 160 - 20;
      startB.scaleX = startB.scaleY = 2;
      stage.addChild(startB);
      startB.addEventListener('click', onClickStartHandler);

      lose = new createjs.Bitmap(getAssetsById('lose'));
      stage.addChild(lose);
      lose.x = 240-100;
      lose.y = 160-45;
      lose.alpha= 0;

      stage.update();

    }

    function onClickStartHandler(evt){
      startGame();
    }


    function onPressMoveHandler(evt){
      evt.target.x = evt.stageX - 37;
      evt.target.x = (evt.target.x <= 0) ? 0 : evt.target.x;
      evt.target.x = (evt.target.x >= (480-75)) ? (480-75) : evt.target.x;
    }
/*
    function onDownHandler(evt){

      stage.addEventListener('stagemouseup', onUpHandler);
     // stage.addEventListener('stagemouseout', onUpHandler);
      stage.addEventListener('stagemousemove', onMoveHandler);
    }

    function onMoveHandler(evt){
      paddle.x = evt.stageX;
    }

    function onUpHandler(evt){
      stage.removeEventListener('stagemousemove', onMoveHandler);
    }*/

    function onFileLoadHandler(evt){
      assetsFactory[evt.item.id] =  evt.result;
    }

    function getAssetsById(id){
      return assetsFactory[id];
    }

    function startGame(){

      createjs.Tween.get(paddle).to({y: 300}, 200);
      createjs.Tween.get(ball).to({y: 0}, 200);
      createjs.Tween.get(startB).to({alpha: 0/*, scaleX:0, scaleY: 0*/}, 200).call(function(){

      });

      createjs.Ticker.addEventListener("tick", update);
      createjs.Ticker.setInterval(30);

    }

    function endGame(){
        console.log('end game');
        //stop timer
        createjs.Tween.get(lose).to({alpha: 1}, 300).call(function(){
          stage.mouseEventEnable = false;
          paddle.cursor ='arrow';
          createjs.Ticker.removeEventListener("tick", update);
        });

        //reset
    }

    function update(){
       stage.update();

       ball.x +=xSpeed;

       if(ball.x <= 2 || ball.x >= 463){
         xSpeed = -xSpeed;
         createjs.Sound.play(getAssetsById('wall'));
       }

       if(ball.y <= 2 && !first){
          ySpeed = -ySpeed;
          createjs.Sound.play(getAssetsById('wall'));
       }

       else if(ball.y > 30){
        first = false;

       }

       if(ball.y >= paddle.y - 15){
         if(ball.x >= paddle.x && ball.x <= paddle.x + 72 - 15){
           ySpeed =-ySpeed;
           createjs.Sound.play(getAssetsById('hit'));
         }

         if(ball.y >= 317){
          createjs.Sound.play(getAssetsById('hit'));
          endGame();
         }
       }

       ball.y +=ySpeed;
    }


}
