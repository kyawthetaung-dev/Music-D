$(function () {
    init();
    fetchData();
    fetchData();
    events();
});

init = () => {
    var columns = [
        { "data": "admin_id" },
        { "data": "admin_name" },
        { "data": "gender" },
        { "data": "admin_phone" },
        { "data": "admin_email" },
        { "data": "password" },
    ];

    var columnsDef = [
        {
            "targets": 6,
            "data": "admin_id",
            "render": function (data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center">
                    <button type="button" class="btn btn-info btn-icon btn-sm btnEdit" style="width : 45%" data-id="${data}"><i class="fas fa-user-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm btnDelete" style="width : 45%" data-id="${data}" data-value="${row.admin_id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
                `;
                return dom;
            }
        },
        {
            "targets": 0,
            "data": "admin_id",
            "render": function (data, type, row, meta) {
                var col = `
                <ul class="nav flex-column">
                <li class="nav-item">
                   <spa">${++meta.row}</span>
                </li>
              </ul>
            `;
                return col;
            }
        },
    ];

    Ray.initDataTable('.tbl_admin', true, columns, columnsDef);
}

fetchData = () => {
    REST.get('/admin/list', (err, results) => {
        if(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
              });
        }else{
            if(results.data.length > 0){
                Ray.renderData('.tbl_admin', results.data);
            }
        }
    });
}

events = () => {
    // $('#frmMusicCreate').submit(function (e) { 
    //     e.preventDefault();
    //     var data = $('#frmMusicCreate').serialize();
    //     REST.post('/music/create', data, (err, result) => {
    //         if(err){
    //             $.toast({
    //                 heading: 'Sorry!',
    //                 text: err,
    //                 icon: 'error',
    //                 position: 'bottom-right'
    //             });
    //         }else{
    //             var code = result.code;
    //             if(code == 200){
    //                 $.toast({
    //                     heading: 'Success!',
    //                     text: 'A new music added!',
    //                     icon: 'success',
    //                     position: 'bottom-right'
    //                 });
    //                 $('#musicModal').modal('toggle');
    //                 $('#frmMusicCreate').trigger('reset');
    //                 fetchData();
    //             }else{
    //                 $.toast({
    //                     heading: 'Error!',
    //                     text: 'Fail!',
    //                     icon: 'error',
    //                     position: 'bottom-right'
    //                 });
    //             }
                
    //         }
    //     });
    // });

    $('.btn-dismiss').on('click', function () {
        
        $('#frmAdminEdit').trigger('reset');
    });


    $(document).on('click', '.btnEdit', function(){
        var id = $(this).data('id');
        REST.get('/admin/edit/'+id, (err, result) => {
            if(err){
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            }else{
                var data = result.data;
                $('#edit_admin_id').val(data.admin_id);
                $('#edit_admin_name').val(data.admin_name);
                $('#edit_gender').val(data.gender);
                $('#edit_admin_ph').val(data.admin_phone);
                $('#edit_admin_email').val(data.admin_email);
                $('#edit_admin_pw').val(data.password);
                $('#adminEditModal').modal('show');
            }
        });
    });

    $('#frmAdminEdit').submit(function (e) { 
        e.preventDefault();
        var id = $('#edit_admin_id').val();
        var data = $('#frmAdminEdit').serialize();
        REST.put('/admin/edit/'+id, data, (err, result) => {
            if(err){
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            }else{
                var code = result.code;
                if(code == 200){
                    $.toast({
                        heading: 'Success!',
                        text: 'Updated user!',
                        icon: 'success',
                        position: 'bottom-right'
                    });
                    $('#adminEditModal').modal('toggle');
                    $('#frmAdminEdit').trigger('reset');
                    fetchData();
                }
            }
        });
    });
}

$(document).on('click', '.btnDelete', function () {
    var id = $(this).data('id');
    var value = $(this).data('value');
    REST.delete('/admin/delete/', id, value, (err, result) => {
        if(err){
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
            fetchData();
        }
    });
});