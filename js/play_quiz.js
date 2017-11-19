let score = 0;
$("#load_btn").click(function () {
    $(".hidden").css("display", "block");
    //console.log("button working");
    let stored = JSON.parse(localStorage.getItem("quizzes"));
    //console.log(stored);
    let author = $("#get_creator").val().toLowerCase();
    let quiz_to_play = {};

    function findQuizzesByAuthor() {
        return stored.filter(
            function (stored) {
                return stored.author == author;
            }
        );
    }

    let availale_quizzes = findQuizzesByAuthor(author);
    //console.log(availale_quizzes);

    for (const q in availale_quizzes) {
        //console.log(availale_quizzes[q].title);
        $("#output").append("<button class='btn btn-primary play_quiz'>" + availale_quizzes[q].title + "</button>");

    }

    $(".play_quiz").click(function () {

        $("#output").append("<h4 id='timer'><time>00:00:00</time></h4>");
        //console.log("clicked: " + this.innerHTML);
        $(".play_quiz").css("display", "none");
        $(".hidden").css("display", "none");

        let quiz_title = this.innerHTML;

        function findQuiz() {
            return availale_quizzes.filter(
                function (available_quizzes) {
                    return available_quizzes.title == quiz_title
                }
            )
        }

        quiz_to_play = findQuiz(quiz_title);
        //console.log(quiz_to_play);
        let color = quiz_to_play["0"].color;
        $("#output").append("<h1>" + quiz_title + "</h1>" + "<br><hr>");
        $("#output").append("<button id='start_quiz' class='btn btn-primary start'>Start Quiz!</button>");


        //$("#output").append("<label for='#title_input'>Quiz Title: </label><input id='title_input' value='" + quiz_title + "'><br><hr>");
        for (let i = 0; i < quiz_to_play["0"].questions.length; i++) {
            let q = quiz_to_play[0].questions[i].question;


            $("#output").append("<div class='container inactive qblock' id='question_block" + (i + 1) + "'></div>");
            $(`#question_block${i + 1}`).append("<h3  class='' id='q" + (i + 1) + "'> " + q + " </h3>");

            for (var j = 0; j < quiz_to_play["0"].questions[i].answers.length; j++) {
                let a = quiz_to_play["0"].questions[i].answers[j].key;
                let p = quiz_to_play["0"].questions[i].answers[j].val;
                $(`#question_block${i + 1}`).append("<div class='radio'><input type='radio' name='answer" + i + "' class='answer ' id='q" + (i + 1) + "a" + (j + 1) + "'>" + "  " + a + "</div>");
                $(`#question_block${i + 1}`).append("<input readonly class='points inactive' type='number' id='q" + (i + 1) + "a" + (j + 1) + "_points' value='" + p + "'>");
            }
            $(`#question_block${i + 1}`).append("<br><br><button class='btn btn-primary' id='next_btn" + (i + 1) + "'>Next question</button>");

            $(`#next_btn${i + 1}`).click(function () {
                ////console.log(this.id);

                ////console.log($(`#q${1}a${1}_points`).val());

                if ($(`#q${i + 1}a${1}`).is(':checked')) {
                    score += parseInt($(`#q${i + 1}a${1}_points`).val());
                } else if ($(`#q${i + 1}a${2}`).is(':checked')) {
                    score += parseInt($(`#q${i + 1}a${2}_points`).val());
                } else if ($(`#q${i + 1}a${3}`).is(':checked')) {
                    score += parseInt($(`#q${i + 1}a${3}_points`).val());
                }

                ////console.log(score);
                $(`#question_block${i + 2}`).removeClass("inactive");
                $(`#question_block${i + 1}`).addClass("inactive");

                if (this.id == "next_btn3") {
                    $("#submit_btn").css("display", "block");

                }
            })


        }
        $("#start_quiz").click(function () {
            $("body").css("background-color", color);
            ////console.log("start button clicked");

            addCountDown();
            $(`#question_block${1}`).removeClass("inactive");


            $(".start").remove();

        });


    });


});

$("#submit_btn").click(function () {
    let time = $("#timer").text();
    $(".container").append("<div id='results' class='jumbotron'><h1>Your final score is: " + score + "</h1>" +
        "Time spent: " + time + "" +
        "<br></div>");
    $("#timer").remove();
    $(this).remove();
    finish();
});

$(".container").append("<button id='share_btn' class='btn btn-block btn-primary inactive'>Share to Facebook</button>")
$("#share_btn").click(function () {
    //console.log("Clicked share button. Score is: " + score);
    share(score);
});

// ============================= Stopwatch plugin from http://jsbin.com/IgaXEVI/167/edit?html,css,js,output
function addCountDown() {
    var h1 = document.getElementsByTagName('h4')[0],
        seconds = 0, minutes = 0, hours = 0,
        t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
    }

    timer();
}

function finish() {
    $("#share_btn").removeClass("inactive");

}

function share(score) {
    var desc = encodeURIComponent("Hey, I scored " + score + " in a quiz");
    window.open("https://www.facebook.com/sharer.php?u=http://localhost:63342/DW-AJAX1/play_quiz.html?_ijt=lo9fjbadeo60ueapt9ge1qlgee&description=" + desc);
}