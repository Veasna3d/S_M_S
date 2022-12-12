//document loaded
$(document).ready(function () {
    showData();
});
/*---function FormatDate---*/
function FormatDate(s) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dt = new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1]));
    return dt.getDate() + "/" + monthNames[dt.getMonth()] + "/" + dt.getFullYear();
}
//Function showData
function showData() {
    $.ajax({
        type: "Get",
        url: "/Teachers/GetAllData",
        dataType: 'json',
        success: function (alldata) {
            console.log(alldata);
            var columns = [
                { title: "Id" },
                { title: "Name" },
                { title: "Image" },
                { title: "Start" },
                { title: "Phone" },
                { title: "Email" },
                { title: "End" },
                { title: "Status" },
                { title: "Create Date" },
                { title: "Actions" }
            ];
            var data = [];
            for (var i in alldata) {
                data.push([
                    alldata[i].Id,
                    alldata[i].TeacherName,
                    "<img src='../Images/" + alldata[i].Image + "' width='60' height='60''>",
                    FormatDate(alldata[i].Start_Time),
                    alldata[i].Phone,
                    alldata[i].Email,
                    FormatDate(alldata[i].End_Time),
                    alldata[i].Status,
                    alldata[i].Create_Date,
                    "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal' OnClick='editData(" +
                    alldata[i].Id + ")'>Edit</button> | <button type='button' class='btn btn-danger' OnClick='deleteData(" + alldata[i].Id +
                    ")'>Delete</button>"
                ]);
            }
            $('#table_data').DataTable({
                destroy: true,
                data: data,
                columns: columns
            });
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//AddNew Button
function addNew() {
    $("#TeacherName").val("");
    $("#Image").val("");
    $("#Start_Time").val("");
    $("#Phone").val("");
    $("#Email").val("");
    $("#End_Time").val("");
    $('#mypicture').attr("src", "#");
    $("#btnsave").val("Insert");
}
//Save Button
function saveData() {
    if ($("#btnsave").val() == "Insert") {
        insertData();
    } else {
        updateData();
    }
}
//function insertData
function insertData() {
    var fileUpload = $("#Image").get(0);
    var files = fileUpload.files;
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append("File", files[i]);
    }
    data.append("TeacherName", $("#TeacherName").val()); 
    data.append("Image", $("#Image").val());
    data.append("Start_Time", $("#Start_Time").val());
    data.append("Phone", $("#Phone").val());
    data.append("Email", $("#Email").val());
    data.append("End_Time", $("#End_Time").val());
    //sent to Server(C#)
    $.ajax({
        type: "Post",
        url: "/Teachers/Create",
        data: data,
        contentType: false,
        processData: false,
        success: function (data) {
            noty({ text: data, type: 'success', dismissQueue: true, layout: 'topCenter', theme: 'relax', timeout: 1000 });
            showData()
            setTimeout(function () { $('#myModal').modal('hide'); }, 1000);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//function editData
var userid;
function editData(bid) {
    $("#btnsave").val("Update");
    userid = bid;
    $.ajax({
        type: "Get",
        url: "/Teachers/GetDataID/",
        data: { id: bid },
        dataType: 'json',
        success: function (data) {
            $("#TeacherName").val(data.TeacherName);
            $('#mypicture').attr("src", "../Images/" + data.Image);
            $("#Start_Time").val(data.Start_Time);
            $("#Phone").val(data.Phone);
            $("#Email").val(data.Email);
            $("#End_Time").val(data.End_Time);
            //$("#Photo").val(data.Photo);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//Function updateData
function updateData() {
    var fileUpload = $("#Image").get(0);
    var data = new FormData();
    var files = fileUpload.files;
    for (var i = 0; i < files.length; i++) {
        data.append("File", files[i]);
    }
    data.append("Id", userid);
    data.append("TeacherName", $("TeacherName").val());
    data.append("Image", $("#Image").val());
    data.append("Start_Time", $("#Start_Time").val());
    data.append("Phone", $("#Phone").val());
    data.append("Email", $("#Email").val());
    data.append("End_Time", $("#End_Time").val());
    //sent to Server(C#)
    $.ajax({
        type: "Post",
        url: "/Teachers/Edit",
        data: data,
        contentType: false,
        processData: false,
        success: function (data) {
            noty({ text: data, type: 'success', dismissQueue: true, layout: 'topCenter', theme: 'relax', timeout: 1000 });
            showData();
            setTimeout(function () { $('#myModal').modal('hide'); }, 1000);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//deleteData
function deleteData(userid) {
    var n = noty({
        text: 'Do you want to remove?', type: 'alert',
        dismissQueue: true, layout: 'center', theme: 'relax', modal: true,
        buttons: [{
            addClass: 'btn btn-info', text: 'Ok', onClick: function ($noty) {
                $.ajax({
                    type: "Post",
                    url: "/Teachers/Delete/",
                    data: { id: userid },
                    dataType: 'json',
                    success: function (data) {
                        showData();
                        noty({
                            text: data, type: 'success', dismissQueue: true,
                            layout: 'topCenter', theme: 'relax', timeout: 1000
                        });
                    },
                    error: function (e) {
                        console.log(e.responseText);
                    }
                });
                $noty.close();
            }
        },
        {
            addClass: 'btn btn-default', text: 'Cancel', onClick: function ($noty) {
                $noty.close();
            }
        }
        ]
    });
}
