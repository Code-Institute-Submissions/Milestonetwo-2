describe('Swedenmap D3 functions with jasmine', function () {
    var c;

    beforeEach(function () {
        c = mapid2();
        c.render();
    });

    afterEach(function () {
        d3.selectAll('svg2').remove();
    });

    describe('the sweden map', function () {
        it('should be created', function () {
            expect(getSvg2()).not.toBeNull();
        });

        it('should have the correct height', function () {
            expect(getSvg2().attr('height')).toBe('500');
        });

        it('should have the correct width', function () {
            expect(getSvg2().attr('width')).toBe('300');
        });

    })

    function getSvg2() {
        return d3.select('svg');
    };
});





describe('The Open-Modal-Button', function () {

    it('works on click event', function () {
        $('.btnl1').trigger('click');
        expect($('.btnl1').hasClass('.divedescription')).toBe(false);
        $('.btnl2').trigger('click');
        expect($('.btnl2').hasClass('.divedescription')).toBe(false);
        $('.btnl3').trigger('click');
        expect($('.btnl3').hasClass('.divedescription')).toBe(false);
    });
});

describe('The New-Dive-button', function () {

    it('works on click event', function () {
        $('#newD1').trigger('click');
        expect($('#newD1').hasClass('.divedescription')).toBe(false);
    });
});

describe('The New-Dive-button', function () {

    it('works on click event', function () {
        $('#newD1').trigger('click');
        expect($('#newD1').hasClass('.divedescription')).toBe(false);
    });
});

