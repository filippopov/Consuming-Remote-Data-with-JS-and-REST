$(function() {
    loadBooks();
    function loadBooks(){
        $.ajax({
            method:"GET",
            headers:{
                "X-Parse-Application-Id":"Or4tobWlPSud7k4RmgsXuB3lnebAW9BFqOWLiqUW",
                "X-Parse-REST-API-Key":"o4zJA5OTIs4YNhIC5FNCx1ay6xt1WYz67ePziQIy"
            },
            url:"https://api.parse.com/1/classes/Book",
            success:booksLoaded,
            error:errorInfo
        })
    }
    function booksLoaded(data){
        var idCount=0;
        for (var book in data.results) {
            var book=data.results[book];
            $('<tr>').appendTo($("#existing-books")).attr('id',idCount);
            var link=$('<a href="#">').attr('class','link-btn')
            $('<td>').appendTo($('#'+idCount)).attr('id','box'+idCount);
            link.appendTo($('#box'+idCount)).text(book.title)
            $('<td>').appendTo($('#'+idCount)).text(book.author)
            $('<td>').appendTo($('#'+idCount)).text(book.isbn)
            $('<td>').appendTo($('#'+idCount)).attr('id','btn'+idCount);
            var btn=$('<button>').text('Delete');
            btn.appendTo($('#btn'+idCount));
            $(link).data('book',book);
            $(btn).data('book',book);
            link.button().on('click',editBook)
            btn.button().on('click',deleteBook)
            idCount++;

        }
    }

    function deleteBook(){
        var book=$(this).data('book');
        $('#existing-books').hide();
        $.ajax({
            method:"DELETE",
            headers:{
                "X-Parse-Application-Id":"Or4tobWlPSud7k4RmgsXuB3lnebAW9BFqOWLiqUW",
                "X-Parse-REST-API-Key":"o4zJA5OTIs4YNhIC5FNCx1ay6xt1WYz67ePziQIy"
            },
            url:"https://api.parse.com/1/classes/Book/"+book.objectId,
            success:loadBooks,
            error:errorInfo
        })
        $('#existing-books').html('');
        $('#existing-books').show();
    }

    function editBook(){
        $('#existing-books').hide();
        var book = $(this).data('book');
        edit.dialog( "open" );
        var newTitle = $( "#edit-title" )
        var newAuthor = $( "#edit-author" )
        var newIsbn = $( "#edit-isbn" )
        $('.ui-button').click(function(){
            $.ajax({
                method:"PUT",
                headers:{
                    "X-Parse-Application-Id":"Or4tobWlPSud7k4RmgsXuB3lnebAW9BFqOWLiqUW",
                    "X-Parse-REST-API-Key":"o4zJA5OTIs4YNhIC5FNCx1ay6xt1WYz67ePziQIy"
                },
                data:JSON.stringify({"title":newTitle.val(),"author":newAuthor.val(),"isbn":newIsbn.val()}),
                contentType:"application/json",
                url:"https://api.parse.com/1/classes/Book/"+book.objectId,
                success:loadBooks,
                error:errorInfo
            })
            $('#existing-books').html('');
            $('#existing-books').show();
            edit.dialog( "close" );

       })


    }
    function errorInfo(){
        alert('Error')
    }

    var dialog, form,edit,
    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        title = $( "#title" ),
        author = $( "#author" ),
        isbn = $( "#isbn" )

    function addBooks() {
        $('#existing-books').html('');
        $('#existing-books').hide();
        $.ajax({
            method:"POST",
            headers:{
                "X-Parse-Application-Id":"Or4tobWlPSud7k4RmgsXuB3lnebAW9BFqOWLiqUW",
                "X-Parse-REST-API-Key":"o4zJA5OTIs4YNhIC5FNCx1ay6xt1WYz67ePziQIy"
            },
            url:"https://api.parse.com/1/classes/Book",
            data:JSON.stringify({'title':title.val(),'author':author.val(),'isbn':isbn.val()}),
            contentType:"application/json",
            success:loadBooks,
            error:errorInfo

        })
        $('#existing-books').show();
        dialog.dialog( "close" );
    }
    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Create book": addBooks,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },

        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });
    edit = $( "#edit-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Edit book": editBook,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },

        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });
    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addBooks();
    });

    $( "#create-books" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });
}());


