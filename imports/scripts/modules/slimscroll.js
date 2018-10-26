// SLIMSCROLL
// -----------------------------------


function initSlimsSroll() {

    $('[data-scrollable]').each(function() {

        var element = $(this),
            defaultHeight = 250;

        element.slimScroll({
            height: (element.data('height') || defaultHeight)
        });

    });
}

export default initSlimsSroll;