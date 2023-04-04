$(function() {
    init();
    fetchData();
    fetchData();
    events();
});

init = () => {
    var columns = [
        { "data": "artist_id" },
        { "data": "artist_name" },
        { "data": "artist_image" },
        { "data": "artist_gender" },
    ];

    var columnsDef = [{
            "targets": 4,
            "data": "artist_id",
            "render": function(data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center">
                    <button type="button" class="btn btn-info btn-icon btn-sm btnEdit" style="width : 45%" data-id="${data}"><i class="fas fa-user-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm btnDelete" style="width : 45%" data-id="${data}" data-value="${row.artist_id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
                `;
                return dom;
            }
        },

        {
            "targets": 2,
            "data": "artist_image",
            "render": function(data, type, row, meta) {
                var col = `
                <img src="${row.artist_image}" alt="images" width="30px">
            `;
                return col;
            }
        },
        {
            "targets": 0,
            "data": "artist_id",
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

    Ray.initDataTable('.tbl_artist', true, columns, columnsDef);
}

fetchData = () => {
    REST.get('/artist/list', (err, results) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
        } else {
            if (results.data.length > 0) {
                Ray.renderData('.tbl_artist', results.data);
            }
        }
    });
}

events = () => {
    $('#frmArtistCreate').submit(function(e) {
        e.preventDefault();
        var data = $('#frmArtistCreate').serialize();
        REST.post('/artist/create', data, (err, result) => {
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
                    $('#artistModal').modal('toggle');
                    $('#frmArtistCreate').trigger('reset');
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
        $('#frmArtistCreate').trigger('reset');
        $('#frmArtistEdit').trigger('reset');
    });


    $(document).on('click', '.btnEdit', function() {
        var id = $(this).data('id');
        REST.get('/artist/edit/' + id, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                var data = result.data;
                $('#edit_artist_id').val(data.artist_id);
                $('#edit_artist_name').val(data.artist_name);
                $('#edit_artist_image').val(data.artist_img);
                $('#edit_artist_gender').val(data.artist_gender);
                $('#artistEditModal').modal('show');
            }
        });
    });

    $('#frmArtistEdit').submit(function(e) {
        e.preventDefault();
        var id = $('#edit_artist_id').val();
        var data = $('#frmArtistEdit').serialize();
        REST.put('/artist/edit/' + id, data, (err, result) => {
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
                    $('#artistEditModal').modal('toggle');
                    $('#frmArtistEdit').trigger('reset');
                    fetchData();
                }
            }
        });
    });
}

$(document).on('click', '.btnDelete', function() {
    var id = $(this).data('id');
    var value = $(this).data('value');
    REST.delete('/artist/delete/', id, value, (err, result) => {
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