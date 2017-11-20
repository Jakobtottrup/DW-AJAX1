$(document).ready(function () {
    let stored = JSON.parse(localStorage.getItem("quizzes"));
    let quizzes;


    $("#create_questions").click(function () {
        const num_questions = $("#num_questions").val();
        $(this).css("display", "none");
        $("#save_btn").css("display", "block");
        for (let i = 1; i <= num_questions; i++) {
            $("#quiz_form").append("<input id='q" + i + "' placeholder='Question" + i + "'><br>");
            for (let answer = 1; answer <= 3; answer++) {
                $("#quiz_form").append("<input class='answer' id='q" + i + "a" + answer + "' placeholder='Answer" + answer + "'>" +
                    "<input type='number' id='q" + i + "a" + answer + "_points' placeholder='Points'>" +
                    "<br>");
            }
        }
    });

    $('#save_btn').click(function () {
        const num_questions = $("#num_questions").val();
        const author = $("#author").val().toLowerCase();
        const title = $("#title").val().toLowerCase();
        let color = $("#colorpicker").val();
        let authors;
        if (stored != null) {
            authors = stored.map(s => s.author + s.title);
        }
        if (authors != (author + title)) {
            quizzes = stored === null ? [] : stored;
            const data = {
                author: author,
                title: title,
                questions: [],
                color: color
            };
            for (let i = 0; i < num_questions; i++) {
                data.questions[i] = {};
                data.questions[i].question = $(`#q${i + 1}`).val();
                data.questions[i].answers = [];
                for (let j = 0; j < 3; j++) {
                    data.questions[i].answers[j] = {
                        key: $(`#q${i + 1}a${j + 1}`).val(),
                        val: $(`#q${i + 1}a${j + 1}_points`).val()
                    };

                }
            }
            quizzes.push(data);
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
            alert("Quiz saved successfully!");
        } else {
            alert("A quiz by this author with this title already exists!");

        }
    });

});