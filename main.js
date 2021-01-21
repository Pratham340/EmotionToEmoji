predict_1="";
predict_2="";

Webcam.set({
width:330,
height:300,
image_format: 'png',
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zV1KXrJrA/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_1="The First Prediction Is"+predict_1;
    speak_2="And The Second Prediction Is"+predict_2;
    var utterThis=new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    predict_1=results[0].label;
    predict_2=results[1].label;
    speak();

    if(results[0].label == "Happy"){
    document.getElementById("update_emoji").innerHTML="&#128522;";
    }
    if(results[0].label == "Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
            }
            if(results[0].label == "Crying"){
                document.getElementById("update_emoji").innerHTML="&#128557;";
                }
                if(results[1].label == "Happy"){
                    document.getElementById("update_emoji2").innerHTML="&#128522;";
                    }
                    if(results[1].label == "Sad"){
                        document.getElementById("update_emoji2").innerHTML="&#128532;";
                        }
                        if(results[1].label == "Angry"){
                            document.getElementById("update_emoji2").innerHTML="&#128548;";
                            }
                            if(results[1].label == "Crying"){
                                document.getElementById("update_emoji2").innerHTML="&#128557;";
                                }
                
}
}