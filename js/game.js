class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                        textSize(25);
                        fill("black");
                        text(allPlayers[plr].name ,x-25,y+25)                         
                     }
                    
                     //text to display player score.
                    textSize(23);
                    fill("Yellow")
                    text(allPlayers[plr].name + " : " + allPlayers[plr].score, players[index - 1].x - 50, players[index - 1].y - 100)
                 }
                
                edges = createEdgeSprites();
                player1.collide(edges)                 
                player2.collide(edges)                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     fruits.lifetime = 590
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                     //fill code here, to destroy the objects. (Use the one in the class project 39)
                     // add the condition to calculate the score. and use update to update the values in the database.

                     for(var fruit = 0; fruit < fruitGroup.length;fruit ++){
                         if(fruitGroup[fruit].isTouching(player1)){
                              fruitGroup[fruit].destroy();
                              player.score += 10;
                              player.update();
                         }
                         if(fruitGroup[fruit].collide(player2)){
                            fruitGroup[fruit].destroy();
                            player.score += 10;
                            player.update();
                        }
                     }
                  }

                  if(player.score >= 150){
                      gameState = 2;
                      swal({
                          title: "Well Done!!",
                          text: "Well played, you finished the Game !!",
                          icon: "success",
                          confirmButtonText: "Ok"
                      })
                  }
        }

    end(){
       console.log("Game Ended");
    }
}