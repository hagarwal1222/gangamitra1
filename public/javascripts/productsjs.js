// var projectList;
$(document).ready(function() {
    // populateTable();
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
            tableContent += '<td><a href="#" class="" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td> </td>';
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
        $.each(data, function(){
            tableContent += '<input style="float: left;" type="checkbox" name="'+ this.name +'" value="'+this.name+'">'+this.name+'<br style="clear: both;">';
        });
        $('#listproductstoselect').html(tableContent);
    });
};