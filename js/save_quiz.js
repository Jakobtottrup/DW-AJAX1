$(document).ready(function () {


    $('#save_btn').click(function () {
        console.log("button was clicked");
        const author = $("#author").innerHTML;
        const title = $("#title").text();
        const data = {
            author: author,
            title: title
        }

        console.log(data);

        /*
        const data = {
            author: "author",
            title: "title",
            Q
        }*/
    });


});

