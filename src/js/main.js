(function (document) {
    var buttons = document.getElementsByTagName('button'),
    ii = 0,
    toggle = function () {
        this.nextElementSibling.classList.toggle('is-visible');
    };

    for (ii; ii < buttons.length; ii++) {
        buttons[ii].addEventListener('click', toggle, false);
    }
})(document);
