document.addEventListener('DOMContentLoaded', ()=>{

    const grid=document.querySelector('.grid');
    const home= document.querySelector('.home');
    const spaceman = document.createElement('div');
    let spacemanLeftSpace=50;
    let startPoint = 150;
    let spacemanBottomSpace=startPoint;
    let isGameOver = false;
    let platformCount=5;
    let platforms=[];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight= false;
    let leftTimerId;
    let rightTimerId;
    let score =0;
    let highscore=0;
    


    function createSpaceman() {
        grid.appendChild(spaceman);
        spaceman.classList.add('spaceman');
        spacemanLeftSpace =platforms[0].left;
        spaceman.style.left = spacemanLeftSpace +'px';
        spaceman.style.bottom= spacemanBottomSpace +'px';
        console.log("created spaceman");
    }

    console.log("in js file");

    //class 

    class Platform{
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left =this.left +'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatform() {
        for(let i=0; i<platformCount; i++){
            let platformGap =  600/platformCount;
            let platformBottom = 100 + i*platformGap;
            let newPlatform = new Platform(platformBottom);
            platforms.push(newPlatform);
            //console.log(platforms);
        }
        console.log('new platform created');
    }


    function movePlatforms(){
        if(spacemanBottomSpace> 200){
            platforms.forEach(platform =>{
                platform.bottom -=4;
                let visual = platform.visual;
                visual.style.bottom= platform.bottom + 'px';

                if(platform.bottom < 10){
                    let firstPlatfrom= platforms[0].visual;
                    firstPlatfrom.classList.remove('platform');
                    platforms.shift();
                    score++;
                    console.log("removing astroids");
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                    console.log("new platform");
                }

            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping=true;
        upTimerId = setInterval(()=>{
            spacemanBottomSpace +=20;
            spaceman.style.bottom= spacemanBottomSpace +'px';
    
        if(spacemanBottomSpace > startPoint +200){
            fall();
          }

        },20);

    }

    function fall(){
        clearInterval(upTimerId);
        isJumping=false;
        downTimerId = setInterval(() => {
            spacemanBottomSpace -=5;
            spaceman.style.bottom= spacemanBottomSpace +'px';
        if(spacemanBottomSpace <= 0){
            gameOver();
        }

        platforms.forEach(platform => {
            if(
                (spacemanBottomSpace>= platform.bottom) && 
                ( spacemanBottomSpace <= platform.bottom+15) &&
                ((spacemanLeftSpace + 60)>= platform.left) &&
                (spacemanLeftSpace <= (platform.left + 85)) &&
                !isJumping
            ) {
                console.log("landing on astroid");
                startPoint = spacemanBottomSpace;
                jump();
            }
        })
        
        }, 20);
    }

    function gameOver(){
        console.log("game over");
        isGameOver=true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        
        if(score>localStorage.getItem(highscore)){
            localStorage.setItem(highscore, score);
        }

        grid.innerHTML ="Score" + "<br></br>"+ score + "<br></br>"+ "High Score" + "<br></br>"+ localStorage.getItem(highscore);
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function control(e) {
        if(e.key === "ArrowLeft"){
            //move left
            moveLeft();
        } else if(e.key === "ArrowRight"){
            //move right
            moveRight();
        } else if(e.key === "ArrowUp") {
            // move up
            moveUp();
        }
    }

    function moveLeft(){
        // if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight=false;
        // }
        isGoingLeft=true;
        leftTimerId = setInterval(() => {
            if(spacemanLeftSpace >=0){
            spacemanLeftSpace -=5;
            spaceman.style.left =spacemanLeftSpace+ 'px';
            } else{
                moveRight();
            }
        }, 50);
    }

    function moveRight() {
        // if(isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft=false;
        //}
        isGoingRight=true;
        rightTimerId =setInterval(() => {
            if(spacemanLeftSpace <=340){
                spacemanLeftSpace +=5;
                spaceman.style.left =spacemanLeftSpace+ 'px';
            } else{
                moveLeft();
            }
            
        }, 50);
    }


    function moveUp() {
        isGoingRight=false;
        isGoingLeft =false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }
    


    function start() {
        if(!isGameOver){
            createPlatform();
            createSpaceman(); 
            setInterval(movePlatforms,30);
            jump();
            document.addEventListener('keyup', control);
        }
    }


    function homescreen(){
        home.innerHTML="Welcome to Spaceman"+ "<br>";
        let linebreak = document.createElement('br');
        home.appendChild(linebreak);


        let img= document.createElement('img');
        img.src = "Images/newAst.png"; 
        //"https://image.shutterstock.com/image-vector/cute-cartoon-astronaut-isolated-on-600w-1491117755.jpg";
        
        home.appendChild(img);
        //document.getElementById("home").style.marginTop = "20px";

        
        home.appendChild(linebreak);


        // new image foun https://pngtree.com/freepng/astronaut-in-spacesuit-on-space-vector_5057901.html


        let startbutton = document.createElement('BUTTON');
        let text = document.createTextNode("Start");
        startbutton.appendChild(text);
        home.appendChild(startbutton);

        startbutton.onclick = function(){
           // home.classList.remove('.home');
            //home.remove();
            //remving all home object before starting the game also look for better approach
            while(home.firstChild){
                home.removeChild(home.firstChild)
            }
            start();
        }
      
        
    }

    homescreen();
    

});

//image linces 
//<a href="https://pngtree.com/so/astronaut?sce=attr">astronaut png from pngtree.com</a>