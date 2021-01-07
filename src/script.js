var canvas = document.querySelector('.myCanvas');
canvas.width = 400;
canvas.height = 400;
ctx = canvas.getContext("2d");

snackx = snacky = 10;
ground = 20;
foodx = foody = 15;
snackbodyx = snackbodyy = 0;
trail = [];
tail = 1;


//game logic
function game() {
    snackx += snackbodyx; snacky += snackbodyy;
    if(snackx<-1  || snackx == ground+1 || snacky<-1 || snacky == ground+1){
        snackx=snacky=10;
    }
    
	
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    
	for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * ground, trail[i].y * ground, ground - 2, ground - 2);
        if (trail[i].x == snackx && trail[i].y == snacky)
            tail = 1;
    }
    
    //follow
	trail.push({ x: snackx, y: snacky });
	while (trail.length > tail)
        trail.shift();
    //add food
	if (foodx == snackx && foody == snacky) {
        tail++;
        foodx = Math.floor(Math.random() * ground);
        foody = Math.floor(Math.random() * ground);
    }
	ctx.fillStyle = "white";  
    ctx.fillRect(foodx * ground, foody * ground, ground, ground);
}
//control snack by keydown
document.addEventListener("keydown", keyPush);
function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            snackbodyx = -1;
            snackbodyy = 0;
            break;
        case 38:
            snackbodyx = 0; 
            snackbodyy = -1;
            break;
        case 39:
            snackbodyx = 1;
            snackbodyy = 0;
            break;
        case 40:
            snackbodyx = 0;
            snackbodyy = 1;
            break;
    }
}
//frames
window.onload = function() {
    setInterval(game, 50);
};