song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    canvas.position(300,200);
    video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotPoses);
} 
function gotPoses(results) {
    if (results.length>0) {
        console.log (results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("score right Wrist" + scorerightWrist);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist" + scoreleftwrist);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx"+leftWristx+"leftWristy"+leftWristy);
      rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx"+rightWristx+"rightWristy"+rightWristy);
    }
}
function modelLoaded(){
    console.log("posenet is initilized!");
}
function draw(){
    image(video,0,0,600,500);
fill( "#FF0000");
stroke(" #FF0000 ");
if (scorerightWrist > 0.2) {
circle(rightWristx,rightWristy,20 );
if (rightWristy > 0 && rightWristy<=100) {
 document.getElementById("speed").innerHTML="speed=0.5x";
 song.rate(0.5);
}
else if (rightWristy > 100 && rightWristy<=200) {
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
   }
   else if (rightWristy > 200 && rightWristy<=300) {
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
   }
   else if (rightWristy > 300 && rightWristy<=400) {
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
   }
   else if (rightWristy > 400 && rightWristy<=500) {
    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);
   }  }
if(scoreleftWrist > 0.2) {
in_number_leftwristy=Number(leftWristy);
remove_decimals=floor(in_number_leftWristy);
leftWristy_divide_1000=remove_decimals/1000;
volume=leftWristy_divide_1000*2;
song.setVolume(volume);
document.getElementById("volume").innerHTML="volume"+volume;
}
}
function play(){
    song.play();
    song.setVolume(1);
song.rate(1);

}
function pause(){
    song.pause();
}