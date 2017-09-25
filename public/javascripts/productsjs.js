// var projectList;
$(document).ready(function() {
    // populateTable();
    $('#btnAddProduct').on('click', addProduct);
});

function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/products/productlist', function( data ) {
        // projectList = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a class="" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td><a class="" rel="' + this.description + '">' + this.description + '</a></td>';
            // tableContent += '<td><a href="#" class="" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};

function populateBuyPageList() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/products/productlist', function( data ) {
        // projectList = data;
        // For each item in our JSON, add a table row and cells to the content string
        tableContent += '<ul class = "productpageul">';
        $.each(data, function(){
        tableContent += '<li><input style="float: left;" type="checkbox" name="'+ this.name +'" value="'+this._id+'">'+this.name+'</li>';
        });
        tableContent += '</ul>';
        tableContent += '<button type="button" class="productpagenext" onclick="showorderformonclick();">Proceed</button>';
        $('#listproductstoselect').append(tableContent);
    });
};

function addProduct(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addproduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newProduct = {
            'name': $('#addproduct fieldset input#inputProductName').val(),
            'description': $('#addproduct fieldset input#inputProductDescription').val(),
            // 'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            // 'age': $('#addUser fieldset input#inputUserAge').val(),
            // 'location': $('#addUser fieldset input#inputUserLocation').val(),
            // 'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: 'xpgadminpanel/addproduct',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addproduct fieldset input').val('');

                // Update the table
                populateTable();
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function addProfunc(){
    $("#addproductdiv").show();
};

function showorderformonclick() {
    $("#listproductstoselect").hide();
    $("#orderForm").show();
};

function showorderlistonclick() {
    $("#orderForm").hide();
    $("#listproductstoselect").show();
};