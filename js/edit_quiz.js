$("#getAuthor").click(function () {

    $(this).css("display", "none");
    let stored = JSON.parse(localStorage.getItem("quizzes"));
    //console.log(stored);
    let author = $("#e_author").val().toLowerCase();
    let quiz_to_edit = {};

    ////console.log(stored);

    function findQuizzesByAuthor() {
        return stored.filter(
            function (stored) {
                return stored.author == author
            }
        );
    }

    let quizzes = findQuizzesByAuthor(author);

    for (let i = 0; i < quizzes.length; i++) {
        $("#output").append("<button class='btn btn-primary edit_quiz'>" + quizzes[i].title + "</button>");
    }


    $(".edit_quiz").click(function () {
        $(".edit_quiz").css("display", "none");

        let quiz_title = this.innerHTML;

        function findQuiz() {
            return quizzes.filter(
                function (quizzes) {
                    return quizzes.title == quiz_title
                }
            )
        }

        quiz_to_edit = findQuiz(quiz_title);
        //console.log(quiz_to_edit);
        $("#quiz_form").append("<label for='title_input'>Quiz Title: </label><input id='title_input' value='" + quiz_title + "'><br><hr>");
        $("#quiz_form").append("<label for='color'>Background Color </label><input type='color' id='color' value='" + quiz_to_edit["0"].color + "'><br><hr>");
        for (var i = 0; i < quiz_to_edit["0"].questions.length; i++) {
            let q = quiz_to_edit[0].questions[i].question;
            $("#quiz_form").append("<input id='q" + (i + 1) + "' value='" + q + "'><br>");
            for (let j = 0; j < quiz_to_edit["0"].questions[i].answers.length; j++) {
                let a = quiz_to_edit["0"].questions[i].answers[j].key;
                let p = quiz_to_edit["0"].questions[i].answers[j].val;
                $("#quiz_form").append("<input class='answer' id='q" + i + "a" + j + "' value='" + a + "'>" +
                    "<input type='number' id='q" + i + "a" + j + "_points' value='" + p + "'>" +
                    "<br>");
            }
        }

        $("#output").append("<button class='brn btn-primary' id='save_btn'>Update Quiz</button>");
        $("#save_btn").click(function () {
            //console.log("save button pushed");
            const num_questions = quiz_to_edit[0].questions.length;
            const author = quiz_to_edit["0"].author;
            const title = quiz_to_edit["0"].title;
            const color = $("#color").val();
            let unique_check;
            if (stored != null) {
                unique_check = stored.map(s => s.author + s.title);
            }
            if (unique_check != (author + title)) {
                const data = {
                    author: author,
                    title: title,
                    questions: [],
                    color: color
                };
                data.title = $("#title_input").val();
                for (let i = 0; i < num_questions; i++) {
                    data.questions[i] = {};
                    data.questions[i].question = $(`#q${i + 1}`).val();
                    data.questions[i].answers = [];
                    for (let j = 0; j < 3; j++) {
                        //ans = $(`#q${i + 1}a${j + 1}`).val()
                        data.questions[i].answers[j] = {
                            key: $(`#q${i}a${j}`).val(),
                            val: $(`#q${i}a${j}_points`).val()
                        };

                    }
                }

                for (let i = 0; i < stored.length; i++) {
                    if ((stored[i].author == author) && (stored[i].title) == title) {
                        //console.log("Found target quiz: " + stored[i].author + " " + stored[i].title);
                        //console.log(stored[i]);
                        stored[i] = data;
                        //console.log(stored[i]);
                    }

                }

                //console.log("Stored after: " + JSON.stringify(stored));
                localStorage.setItem("quizzes", JSON.stringify(stored));
                if (confirm('Successfully updated quiz')) {
                    window.location.reload();
                }
            } else {
                alert("A quiz by this author with this title already exists!");

            }

        });
    });


});

