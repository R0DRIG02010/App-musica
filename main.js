pontuacaoPulsoDireito = 0;
pontuacaoPulsoEsquerdo = 0;

PulsoDireitoX = 0;
PulsoDireitoY = 0;

PulsoEsquerdoY = 0;
PulsoEsquerdoX = 0;


song ="";
function preload()
{
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoadead);
    poseNet.on('pose',gotPoses);
}



function modelLoadead() {
    console.log('PoseNet foi inicializado');
}

function gotPoses(resultado)
{
    if(resultado.length > 0)
    {
        console.log(resultado);
        pontuacaoPulsoDireito = resultado[0].pose.keypoints[10].score;
        pontuacaoPulsoEsquerdo = resultado[0].pose.keypoints[10].score;
        console.log("scorePulsoDireito = " + pontuacaoPulsoDireito + "PontuacaoPulsoEsquerdo" + pontuacaoPulsoEsquerdo);

        PulsoDireitoX = resultado[0].pose.rightWrist.x ;
        PulsoDireitoY = resultado[0].pose.rightWrist.y ;
        console.log("PulsoDireitoX = " + PulsoDireitoX + "PulsoDireitoY = " + PulsoDireitoY );

        PulsoEsquerdoX = resultado[0].pose.leftWrist.x;
        PulsoEsquerdoY = resultado[0].pose.leftWrist.y;

        console.log("PulsoEsquerdoX = " + PulsoEsquerdoX + "PulsoEsquerdoY = " + PulsoEsquerdoY );
        
    }
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF000");
    stroke("#FF0000");
    //circle(PulsoDireitoX,PulsoDireitoY,20);//

    if(pontuacaoPulsoEsquerdo > 0.2)
{
    //circle(PulsoDireitoX,PulsoEsquerdoY, 20);//
    NumeropulsoEsquerdoY = Number(PulsoEsquerdoY);
    remover_decimais = floor(NumeropulsoEsquerdoY);
    volume = remover_decimais/500;
    document.getElementById("volume").innerHTML = "Volume =" +  volume;
    song.setVolume(volume);
}

if(pontuacaoPulsoDireito > 0.2)
 {

    if(PulsoDireitoY> 0 && PulsoDireitoY <=100)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
        song.rate(0.5);
    }
else if(PulsoDireitoY >100 && PulsoDireitoY <=200)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 1x";
        song.rate(1)
    }

else if(PulsoDireitoY >200 && PulsoDireitoY <=300)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
        song.rate(1.5)
    }
    
else if(PulsoDireitoY >300 && PulsoDireitoY <=400)
{
    document.getElementById("speed").innerHTML = "Velocidade = 2x";
    song.rate(2)
}
else if(PulsoDireitoY >400)
{
     document.getElementById("speed".innerHTML = "Velocidade = 2.5x");
     song.rate(2.5);
}

 }

}




function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}












































































