$(function () {
    init();
    fetchData();
    fetchData();
    events();
});

init = () => {
    var columns = [
        { "data": "user_id" },
        { "data": "user_name" },
        { "data": "user_phone" },
        { "data": "user_gender" },
    ];

    var columnsDef = [
        {
            "targets": 4,
            "data": "user_id",
            "render": function (data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center">
                    <button type="button" class="btn btn-info btn-icon btn-sm btnEdit" style="width : 45%" data-id="${data}"><i class="fas fa-user-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm btnDelete" style="width : 45%" data-id="${data}" data-value="${row.user_id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
                `;
                return dom;
            }
        }
    ];

    Ray.initDataTable('.tbl_user', true, columns, columnsDef);
}

fetchData = () => {
    REST.get('/user/list', (err, results) => {
        if(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
              });
        }else{
            if(results.data.length > 0){
                Ray.renderData('.tbl_user', results.data);
            }
        }
    });
}

events = () => {
    $('#frmUserCreate').submit(function (e) { 
        e.preventDefault();
        var data = $('#frmUserCreate').serialize();
        console.log(`data`, data);
        REST.post('/user/create', data, (err, result) => {
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
                        text: 'A new user added!',
                        icon: 'success',
                        position: 'bottom-right'
                    });
                    $('#userModal').modal('toggle');
                    $('#frmUserCreate').trigger('reset');
                    fetchData();
                }else{
                    $.toast({
                        heading: 'Sorry!',
                        text: err,
                        icon: 'error',
                        position: 'bottom-right'
                    });
                }
                
            }
        });
    });

    $('.btn-dismiss').on('click', function () {
        $('#frmUserCreate').trigger('reset');
        $('#frmUserEdit').trigger('reset');
    });

    $(document).on('click', '.btnDelete', function () {
        var id = $(this).data('id');
        var value = $(this).data('value');
        console.log(`id`, id);
        REST.delete('/user/delete/',id, value, (err, result) => {
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

    $(document).on('click', '.btnEdit', function(){
        var id = $(this).data('id');
        REST.get('/user/edit/'+id, (err, result) => {
            if(err){
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            }else{
                var data = result.data;
                var eid = data.id;
                console.log(data);
                $('#edit_user_id').val(data.user_id);
                $('#edit_user_name').val(data.user_name);
                $('select#edit_gender').val(data.gender);
                $('#userEditMoadl').modal('show');
            }
        });
    });

    $('#frmUserEdit').submit(function (e) { 
        e.preventDefault();
        var id = $('#id').val();
        var data = $('#frmUserEdit').serialize();
        REST.put('/user/edit/'+id, data, (err, result) => {
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
                    $('#userEditMoadl').modal('toggle');
                    $('#frmUserEdit').trigger('reset');
                    fetchData();
                }else{
                    $.toast({
                        heading: 'Sorry!',
                        text: err,
                        icon: 'error',
                        position: 'bottom-right'
                    });
                }
                
            }
        });
    });
}
