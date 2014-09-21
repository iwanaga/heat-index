'use strict';

describe('HI functions', function() {
    var HI;
    beforeEach(function() {
        HI = require('../index.js');
    });

    describe('getType', function() {
        it('{}', function() {
            expect(HI.getType({})).toEqual('Object');
        });
        it('undefined', function() {
            expect(HI.getType()).not.toEqual('Object');
        });
    });

    describe('toFahrenheit', function() {
        it('melt point of water', function() {
            expect(HI.toFahrenheit(0)).toEqual(32);
        });
        it('steam point', function() {
            expect(HI.toFahrenheit(100)).toEqual(212);
        });
        it('sampling test', function() {
            expect(HI.toFahrenheit(30)).toEqual(86);
        });
    });

    describe('toCelsius', function () {
        [0, 30, 100].forEach(function (t) {
            it('inverse conversion: ' + t, function () {
                expect(HI.toCelsius(HI.toFahrenheit(t))).toEqual(t);
            });
        });
    });

    describe('heatIndex', function () {
        describe('error handling', function () {
            it('empty arg', function () {
                expect(function () {
                    HI.heatIndex();
                }).toThrow();
            });
            it('wrong arg', function () {
                expect(function () {
                    HI.heatIndex([]);
                }).toThrow();
            });
        });

        describe('return value', function () {
            it("Steadman's result: t < 80F", function () {
                expect(Math.round(HI.heatIndex({temperature: 20, humidity: 40}))).toEqual(19);
            });
            it('regression w/o adjustment: t > 112F', function () {
                expect(Math.round(HI.heatIndex({temperature: 32, humidity: 60}))).toEqual(37);
            });
            it('regression w/ subtraction adjustment: 80 <= t <= 112, h < 13', function () {
                expect(Math.round(HI.heatIndex({temperature: 30, humidity: 10}))).toEqual(28);
            });
            it('regression w/ addition adjustment: 80 <= t <= 87, h > 85', function () {
                expect(Math.round(HI.heatIndex({temperature: 30, humidity: 90}))).toEqual(41);
            });
        });
    });
});
