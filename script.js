/*Function to give Random Color*/
function giveRandomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var result = 'rgb('+r+", "+g+", "+b+")";
    return result;
}
/*-----------------------------------------*/

/*Function to Create The Array Of Colors*/
function createArrayOfColors(num){
    var arr = [];
    var arrInput;
    for(let i=0;i<num;i++){
        arrInput = giveRandomColor();
        if(arrInput!='rgb(35, 35, 35)' && !arr.includes(arrInput)){
            arr.push(arrInput);
        }
    }
    return arr;
}
/*-----------------------------------------------------------------*/

function startGame(number){
    var colors = createArrayOfColors(number);
    var clicks = 0;
    var score = Number($("#score").html());

    var pickedColor = colors[Math.floor(Math.random() * colors.length)];
    $("#picked").html(pickedColor);

    for(let i=0;i<$(".square").length; i++){
        $(".square")[i].style.backgroundColor = colors[i];
    }


    $('.square').on("mouseenter", function(){
        if($(this).css('backgroundColor') != 'rgb(35, 35, 35)'){
            $(this).css('cursor', 'pointer');
        }
    });

    $(".square").on('mouseleave', function(){
        $(this).css('cursor', 'auto');
    });

    $(".square").on('click', function(){

        if($(this).css('backgroundColor') == pickedColor){
            if($("#easy").attr('class') == 'active'){
                for(let i=0;i<3;i++){
                    $(".square")[i].style.backgroundColor = pickedColor;
                }
            }else{
                $('.square').css('backgroundColor', pickedColor);
            }

            $("#title").css('backgroundColor', pickedColor);
            $('#gameMessage').html('CORRECT');
            $('#new').html('PLAY AGAIN?');

            clicks++;
            if(clicks <=1){
                score++;
                $("#score").html(score);
            }
        }else{
            $(this).css('backgroundColor', "#232323");
            $("#gameMessage").html("TRY AGAIN");
            clicks++;
        }
    });
}

startGame(6);

/*What Happens When You Click On NEW COLORS/PLAY AGAIN*/
$("#new").on('click', function(){
    if($("#hard").attr("class") == 'active'){
        startGame(6);
    }else{
        startGame(3);
        for(let i=3;i<6;i++){
            $(".square")[i].style.backgroundColor = '#232323';
        }
    }
    $("#gameMessage").html("");
    $("#new").html("NEW COLORS");
});
/*-----------------------------------------------------*/

/*What Happens When You Click On EASY*/
$("#easy").on('click', function(){
    if($(this).attr('class') != 'active'){
        $(this).addClass('active');
        $("#hard").removeClass('active');
        startGame(3);
        for(let i=3;i<6;i++){
            $(".square")[i].style.backgroundColor = '#232323';
        }
    }
});
/*--------------------------------------------------------*/

/*What Happens When You Click On HARD*/
$("#hard").on('click', function(){
    if($(this).css("class") != 'active'){
        $(this).addClass('active');
        $("#easy").removeClass('active');
        startGame(6);
    }
});
/*------------------------------------------*/
