import Camera from './Camera.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createDashboardLayer} from './layers/dashboard.js';
import Keyboard from './KeyboardState.js';

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

var pauseFlag = false;
var username = "";
var userFlag=false;

function setupGameFunctions() {
    const input = new Keyboard();

    input.addMapping('KeyP', keyState => {
       
        if (keyState) {
            pauseFlag = !pauseFlag;
        }


    });

    input.addMapping('KeyR', keyState => {  
        if (keyState) {
            location.reload();
        }


    });

    return input;
}

if(localStorage.getItem("currentLvl")){
    var currentLvl = localStorage.getItem("currentLvl");
}else{
    var currentLvl = "1-1";
}

async function main(canvas) {
    const context = canvas.getContext('2d');

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);

    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel(currentLvl);

    const camera = new Camera();

    const mario = entityFactory.mario();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    
    // level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    playerEnv.playerController.level = currentLvl;
    const input = setupKeyboard(mario);
    input.listenTo(window);
    const input1 = setupGameFunctions();
    input1.listenTo(window);

    const timer = new Timer(1/60);
    console.log("init");
    timer.update = function update(deltaTime) {  
        level.comp.paused = pauseFlag; 
        console.log("en ciclo");
        if(pauseFlag){
            font.print('PAUSED', context, 96, font.size * 10);
        }else if(playerEnv.playerController.lives == 0 || playerEnv.playerController.time == 0 ){
            font.print('GAME OVER', context, 96, font.size * 8);
           
            if(!userFlag){
                username = prompt("quieres aparecer en el ranking, dime tu nombre");
                if(username && username.length<8){
                    userFlag = true;
                }else{
                    alert('debes escribir un nombre con menos de 7 caracterres')
                }
            }else{ 
                font.print('PULSA R PARA REINICIAR', context, 16, font.size * 10);
                var score = guardarPuntos(playerEnv.playerController.score,username);
                font.print("YOUR HIGHEST SCORE : " + score.toString().padStart(6, '0'), context, 16, font.size * 12);
                mostrarRanking(font,context);
            }
              
        }else if(mario.pos.x >= level.finish){
            localStorage.setItem("currentLvl",'1-2'); 
            location.reload();
        }else{
            level.update(deltaTime);
            camera.pos.x = Math.max(0, mario.pos.x - 100);
            level.comp.draw(context, camera);
        }
    }
    timer.start();

}

const canvas = document.getElementById('screen');
main(canvas);

function guardarPuntos(puntosAct, username) {
    var puntosAcc = parseInt(localStorage.getItem(username));
    if(puntosAcc){
        if(puntosAcc<puntosAct){
            localStorage.setItem(username,puntosAct); 
            return puntosAct;
        }else{
            return puntosAcc;
        }
    }else{
        localStorage.setItem(username,puntosAct); 
        return puntosAct;
    }
}


function mostrarRanking(font, context) {
    var objs = [];
    for (var key in localStorage){
        console.log(key);
        console.log(localStorage.getItem(key));
        if(localStorage.getItem(key) != null ){
            objs.push({
                "user" : key,
                "score" : localStorage.getItem(key)});
        }
    }
   
    objs.sort( compare );
        font.print("Ranking : " , context, 16, font.size * 14);
    if(objs.length > 0){
        font.print( convertString(objs[0].user) + " : " + objs[0].score.toString().padStart(6, '0'), context, 16, font.size * 16);
    }if(objs.length > 1){
        font.print( convertString(objs[1].user) + " : " + objs[1].score.toString().padStart(6, '0'), context, 16, font.size * 18);
    }if(objs.length > 2){
        font.print( convertString(objs[2].user) + " : " + objs[2].score.toString().padStart(6, '0'), context, 16, font.size * 20);
    }if(objs.length > 3){
         font.print( convertString(objs[3].user) + " : " + objs[3].score.toString().padStart(6, '0'), context, 16, font.size * 22);
    }if(objs.length > 4){
         font.print( convertString(objs[4].user) + " : " + objs[4].score.toString().padStart(6, '0'), context, 16, font.size * 24);
    }
}

function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
}

function convertString(phrase){
    var maxLength = 100;

    var returnString = phrase.toLowerCase();
    //Convert Characters
    returnString = returnString.replace(/ö/g, 'o');
    returnString = returnString.replace(/ç/g, 'c');
    returnString = returnString.replace(/ş/g, 's');
    returnString = returnString.replace(/ı/g, 'i');
    returnString = returnString.replace(/ğ/g, 'g');
    returnString = returnString.replace(/ü/g, 'u');  
    returnString = returnString.replace(/ñ/g, 'n');  

    // if there are other invalid chars, convert them into blank spaces
    returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
    // convert multiple spaces and hyphens into one space       
    returnString = returnString.replace(/[\s-]+/g, " ");
    // trims current string
    returnString = returnString.replace(/^\s+|\s+$/g,"");
    // cuts string (if too long)
    if(returnString.length > maxLength)
    returnString = returnString.substring(0,maxLength);
    // add hyphens
    returnString = returnString.replace(/\s/g, "-");  

    return returnString;
}
  
 