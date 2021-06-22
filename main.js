status = "";
array1 = [];
object = "";
obj_name = "";

function setup(){
    canvas = createCanvas(450 , 400);
    webcam = createCapture(VIDEO);
    webcam.hide();
}

function draw(){
    image(webcam , 0 , 0 , 450 , 400);
    if (status != ""){
        object_Detector.detect(webcam , gotResult);

        for(i = 0; i < array1.length; i++){
            percentage = floor(array1[i].confidence * 100);
            fill('#fa6161');
            text(array1[i].label + " " + percentage + "%" , array1[i].x + 15 , array1[i].y + 15);
            noFill();
            stroke('#E6E6FA');
            rect(array1[i].x , array1[i].y , array1[i].width + 10 , array1[i].height + 10);
            obj_name = array1[i].label;
        }

        if(object != ""){
        if (obj_name == object){
            webcam.stop();
            object_Detector.detect(gotResult);
            document.getElementById("status").innerHTML = "Status : Object Found";
        }
    }
    }
}

function start(){
    object_Detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object = document.getElementById("object_input").value;
}

function modelLoaded(){
    console.log("CocoSsd Model Loaded!!");
    status = true;
}

function gotResult(error , result){
    if (error) {
        console.error(error);
    }
    console.log(result);
    array1 = result;
}