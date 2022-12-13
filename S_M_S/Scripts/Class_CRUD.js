//document loaded
$(document).ready(function () {
    showData();
});
//Function showData
function showData() {
    $.ajax({
        type: "Get",
        url: "/Classes/GetAllData",
        dataType: 'json',
        success: function (alldata) {
            console.log(alldata);
            var columns = [
                { title: "Id" },
                { title: "ClassName" },
                { title: "Create_Date" },
                { title: "Options" }
            ];
            var data = [];
            for (var i in alldata) {
                data.push([
                    alldata[i].Id,
                    alldata[i].ClassName,
                    alldata[i].Create_Date,
                    "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal'OnClick = 'editData(" + alldata[i].Id + ")' > Edit</button > | <button type='button' class='btn btn-danger'OnClick='deleteData(" + alldata[i].Id + ")'>Delete</button>"
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
    $("#ClassName").val("");
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
    //create json data
    var classes = {
        ClassName: $('#ClassName').val(),

    };
    //sent to Server(C#)
    $.ajax({
        type: "Post",
        url: "/Classes/Create",
        data: classes,
        dataType: 'json',
        success: function (data) {
            noty({
                text: data, type: 'success', dismissQueue: true, layout: 'topCenter', theme: 'relax',
                timeout: 1000
            });
            showData()
            setTimeout(function () { $('#myModal').modal('hide'); }, 1000);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//function editData
var classid;
function editData(cid) {
    $("#btnsave").val("Update");
    classid = cid;
    $.ajax({
        type: "Get",
        url: "/Classes/GetDataID/",
        data: { id: cid },
        dataType: 'json',
        success: function (data) {
            $("#ClassName").val(data.ClassName)



        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//Function updateData
function updateData() {
    //create json data
    var classes = {
        Id: classid,
        ClassName: $('#ClassName').val()

    };
    //sent to Server(C#)
    $.ajax({
        type: "Post",
        url: "/Classes/Edit",
        data: classes,
        dataType: 'json',
        success: function (data) {
            noty({
                text: data, type: 'success', dismissQueue: true, layout: 'topCenter', theme: 'relax',
                timeout: 1000
            });
            showData();
            setTimeout(function () { $('#myModal').modal('hide'); }, 1000);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}
//deleteData
function deleteData(classid) {
    var n = noty({
        text: 'Do you want to remove?', type: 'alert',
        dismissQueue: true, layout: 'center', theme: 'relax', modal: true,
        buttons: [{
            addClass: 'btn btn-info', text: 'Ok', onClick: function ($noty) {
                $.ajax({
                    type: "Post",
                    url: "/Classes/Delete/",
                    data: { id: classid },
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