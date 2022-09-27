
$("#modal").iziModal();

$(document).on('click', '.trigger', function (event) {
    event.preventDefault();
    // $('#modal').iziModal('setZindex', 99999);
    // $('#modal').iziModal('iframeHeight', 250);

    // $('#modal').iziModal('open', { zindex: 99999 });
    $('#modal').iziModal('open', {
        autoOpen: true,
        title:'Alert!!!'
    });
});
