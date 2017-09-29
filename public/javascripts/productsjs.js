// var projectList;
$(document).ready(function() {
    // populateTable();
    // $('#btnAddProduct').on('click', addProduct);
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

function showorderformonclick() {
    if ($('#listproductstoselect input:checkbox').is(":checked")){
        $(window).scrollTop(0);
        $('#step_second').removeClass('disabled');
        $('#step_second').addClass('complete');
        $("#listproductstoselect").hide();
        $("#orderForm").show();
    }else{
        alert("check atleast 1");
    }
};

function showorderlistonclick() {
    $('#step_second').removeClass('complete');
    $('#step_second').addClass('disabled');
    $("#orderForm").hide();
    $("#listproductstoselect").show();
};

function showconfirmationbox() {
    var email = $("#userEmailOrder").val();
    if ($("#userNameOrder").val().length > 3){
        if (validateEmail(email)) {
            if ($("#userContactnoOrder").val().length > 9){
                if (!isNaN($("#userContactnoOrder").val())){
                    $(window).scrollTop(0);
                    $('#step_third').removeClass('disabled');
                    $('#step_third').addClass('complete');
                    $('#userInfoOnOrder').show();
                    $("#userInfoOnOrder #userInfoOnOrderName").text($('#userNameOrder').val());
                    $("#userInfoOnOrder #userInfoOnOrderEmail").text($('#userEmailOrder').val());
                    $("#userInfoOnOrder #userInfoOnOrderPhone").text($('#userContactnoOrder').val());
                    $("#userInfoOnOrder #userInfoOnOrderAddress").text($('#userAddressOrder').val());
                    $('#orderForm').hide();
                }else{
                    alert("fill digits");
                }
            }else{
                alert("fill correct number");
            }
        }else{
            alert("fill correct email");
        }
    }else{
        alert("Fill name");
    }
};

function proceedwithorder() {
    var flag = 0;
    var email = $("#userEmailOrder").val();
    var products_id = [];
    $('#listproductstoselect input:checkbox:checked').each(function(){
        products_id.push($(this).val());
    });
    if ($("#userNameOrder").val().length > 3){
        if (validateEmail(email)) {
            if ($("#userContactnoOrder").val().length > 9){
                if (!isNaN($("#userContactnoOrder").val())){
                    flag = 1;
                }else{
                    alert("fill digits");
                }
            }else{
                alert("fill correct number");
            }
        }else{
            alert("fill correct email");
        }
    }else{
        alert("Fill name");
    }
    if (flag == 1){
        var order_details = {
            'name': $("#userNameOrder").val(),
            'email': $("#userEmailOrder").val(),
            'phone': $("#userContactnoOrder").val(),
            'address': $("#userAddressOrder").val(),
            'product_ids': products_id
        };
        $.ajax({
            type: 'POST',
            data: order_details,
            url: '/products/order',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                $('#step_fourth').removeClass('disabled');
                $('#step_fourth').addClass('complete');
                var tableContent = '';
                $('#listproductstoselect input:checkbox:checked').each(function(){
                    tableContent += '<tr>';
                    tableContent += '<td><a class="" rel="' + $(this).name + '">' + this.name + '</a></td>';
                    // tableContent += '<td><a href="#" class="" rel="' + this._id + '">delete</a></td>';
                    tableContent += '</tr>';
                });
                $('#productList table tbody').html(tableContent);
                // Clear the form inputs
                $('#orderForm input, #orderForm textarea').val('');

                // Update the table
                // populateTable();
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};