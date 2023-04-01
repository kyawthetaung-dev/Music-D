$(function() {
    init();
    fetchData();
    fetchData();
    events();
});

init = () => {
    var columns = [
        { "data": "music_id" },
        { "data": "music_name" },
        { "data": "music_image" },
        { "data": "artist_id" },
        { "data": "album_id" },
        { "data": "music_files" },
    ];

    var columnsDef = [{
            "targets": 6,
            "data": "music_id",
            "render": function(data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center">
                    <button type="button" class="btn btn-info btn-icon btn-sm btnEdit" style="width : 45%" data-id="${data}"><i class="fas fa-user-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm btnDelete" style="width : 45%" data-id="${data}" data-value="${row.music_id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
                `;
                return dom;
            }
        },
        {
            "targets": 0,
            "data": "music_id",
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

    Ray.initDataTable('.tbl_music', true, columns, columnsDef);
}

fetchData = () => {
    REST.get('/music/list', (err, results) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
        } else {
            if (results.data.length > 0) {
                Ray.renderData('.tbl_music', results.data);
            }
        }
    });
}

events = () => {
    $('#frmMusicCreate').submit(function(e) {
        e.preventDefault();
        var data = $('#frmMusicCreate').serialize();
        REST.post('/music/create', data, (err, result) => {
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
                        text: 'A new music added!',
                        icon: 'success',
                        position: 'bottom-right'
                    });
                    $('#musicModal').modal('toggle');
                    $('#frmMusicCreate').trigger('reset');
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
        $('#frmMusicCreate').trigger('reset');
        $('#frmMusicEdit').trigger('reset');
    });


    $(document).on('click', '.btnEdit', function() {
        var id = $(this).data('id');
        REST.get('/music/edit/' + id, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                var data = result.data;
                $('#edit_music_id').val(data.music_id);
                $('#edit_music_name').val(data.music_name);
                $('#edit_released_date').val(data.released_at);
                $('#musicEditModal').modal('show');
            }
        });
    });

    $('#frmMusicEdit').submit(function(e) {
        e.preventDefault();
        var id = $('#edit_music_id').val();
        var data = $('#frmMusicEdit').serialize();
        REST.put('/music/edit/' + id, data, (err, result) => {
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
                    $('#musicEditModal').modal('toggle');
                    $('#frmMusicEdit').trigger('reset');
                    fetchData();
                }
            }
        });
    });
}

$(document).on('click', '.btnDelete', function() {
    var id = $(this).data('id');
    var value = $(this).data('value');
    REST.delete('/music/delete/', id, value, (err, result) => {
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