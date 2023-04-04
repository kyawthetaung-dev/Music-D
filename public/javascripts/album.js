$(function() {
    init();
    fetchData();
    fetchData();
    events();
});

init = () => {
    var columns = [
        { "data": "alb_id" },
        { "data": "alb_name" },
        { "data": "alb_image" },
    ];

    var columnsDef = [{
            "targets": 3,
            "data": "alb_id",
            "render": function(data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center">
                    <button type="button" class="btn btn-info btn-icon btn-sm btnEdit" style="width : 45%" data-id="${data}"><i class="fas fa-user-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm btnDelete" style="width : 45%" data-id="${data}" data-value="${row.album_id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
                `;
                return dom;
            }
        },

        {
            "targets": 2,
            "data": "alb_image",
            "render": function(data, type, row, meta) {
                var col = `
                <img src="${row.alb_image}" alt="images" width="30px">
            `;
                return col;
            }
        },
        {
            "targets": 0,
            "data": "alb_id",
            "render": function(data, type, row, meta) {
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

    Ray.initDataTable('.tbl_album', true, columns, columnsDef);
}

fetchData = () => {
    REST.get('/album/list', (err, results) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
        } else {
            if (results.data.length > 0) {
                Ray.renderData('.tbl_album', results.data);
            }
        }
    });
}

events = () => {
    $('#frmAlbumCreate').submit(function(e) {
        e.preventDefault();
        var data = $('#frmAlbumCreate').serialize();
        REST.post('/album/create', data, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                var code = result.code;
                if (code == 200) {
                    $.toast({
                        heading: 'Success!',
                        text: 'A new album added!',
                        icon: 'success',
                        position: 'bottom-right'
                    });
                    $('#albumModal').modal('toggle');
                    $('#frmAlbumCreate').trigger('reset');
                    fetchData();
                } else {
                    $.toast({
                        heading: 'Error!',
                        text: 'Fail!',
                        icon: 'error',
                        position: 'bottom-right'
                    });
                }

            }
        });
    });

    $('.btn-dismiss').on('click', function() {
        $('#frmAlbumCreate').trigger('reset');
        $('#frmAlbumEdit').trigger('reset');
    });


    $(document).on('click', '.btnEdit', function() {
        var id = $(this).data('id');
        REST.get('/album/edit/' + id, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                var data = result.data;
                $('#edit_album_id').val(data.alb_id);
                $('#edit_album_name').val(data.alb_name);
                $('#edit_album_img').val(data.alb_image);
                $('#albumEditModal').modal('show');
            }
        });
    });

    $('#frmAlbumEdit').submit(function(e) {
        e.preventDefault();
        var id = $('#edit_album_id').val();
        var data = $('#frmAlbumEdit').serialize();
        REST.put('/album/edit/' + id, data, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                var code = result.code;
                if (code == 200) {
                    $.toast({
                        heading: 'Success!',
                        text: 'Updated user!',
                        icon: 'success',
                        position: 'bottom-right'
                    });
                    $('#albumEditModal').modal('toggle');
                    $('#frmAlbumEdit').trigger('reset');
                    fetchData();
                }
            }
        });
    });
}

$(document).on('click', '.btnDelete', function() {
    var id = $(this).data('id');
    var value = $(this).data('value');
    REST.delete('/album/delete/', id, value, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            fetchData();
        }
    });
});