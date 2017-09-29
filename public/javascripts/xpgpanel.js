$(document).ready(function() {
    // populateTable();
    $('#btnAddProduct').on('click', addProduct);
});

function addProfunc(){
    populateTable();
    $('#orderlist').hide();
    $("#addproductdiv").show();
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

function checkorderadmin(){
    $("#addproductdiv").hide();
    $('#orderlist').show();
    var orderContent = '';
    var count = 0;
    $.getJSON( 'xpgadminpanel/orders', function( data ) {
        $.each(data, function(){
            count = count+1;
            orderContent += '<tr>';
            orderContent += '<td><a class="" rel="' + count + '">' + count + '</a></td>';
            orderContent += '<td><a class="" rel="' + this._id + '">' + this._id + '</a></td>';
            orderContent += '<td><a class="" rel="' + this._id + '">' + this.name + '</a></td>';
            orderContent += '<td><a class="" rel="' + this._id + '">' + this.email + '</a></td>';
            orderContent += '<td><a class="" rel="' + this._id + '">' + this.phone + '</a></td>';
            orderContent += '<td><a class="" rel="' + this._id + '">' + this.address + '</a></td>';
            orderContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#orderlisttable table tbody').html(orderContent);
    });
};