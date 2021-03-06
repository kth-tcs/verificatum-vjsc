
// Copyright 2008-2019 Douglas Wikstrom
//
// This file is part of Verificatum JavaScript Cryptographic library
// (VJSC).
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// ######################################################################
// ################### Test ModPGroup.js ################################
// ######################################################################

M4_NEEDS(verificatum/arithm/ModPGroup.js)dnl
M4_NEEDS(verificatum/arithm/test_PGroup.js)dnl

var test_ModPGroup = (function () {
    var prefix = "verificatum.arithm.ModPGroup";
    var arithm = verificatum.arithm;

dnl Example groups.
M4_INCLUDE(verificatum/arithm/test_ModPGroup_params.js)dnl

    var pGroups = arithm.ModPGroup.getPGroups();

    var identities = function (testTime) {
        test_PGroup.identities(prefix, pGroups, testTime);
    };
    var multiplication_commutativity = function (testTime) {
        test_PGroup.multiplication_commutativity(prefix, pGroups, testTime);
    };
    var multiplication_associativity = function (testTime) {
        test_PGroup.multiplication_associativity(prefix, pGroups, testTime);
    };
    var exp = function (testTime) {
        test_PGroup.exp(prefix, pGroups, testTime);
    };
    var fixed = function (testTime) {
        test_PGroup.fixed(prefix, pGroups, testTime);
    };
    var inversion = function (testTime) {
        test_PGroup.inversion(prefix, pGroups, testTime);
    };
    var conversion = function (testTime) {
        test_PGroup.conversion(prefix, pGroups, testTime);
    };
    var encoding = function (testTime) {
        test_PGroup.encoding(prefix, pGroups, testTime);
    };
    var hex = function (testTime) {
        test_PGroup.hex(prefix, pGroups, testTime);
    };

    var run = function (testTime) {
        identities(testTime);
        multiplication_commutativity(testTime);
        multiplication_associativity(testTime);
        exp(testTime);
        fixed(testTime);
        inversion(testTime);
        conversion(testTime);
        encoding(testTime);
        hex(testTime);
    };
    return {
        pGroups: pGroups,
        run: run
    };
})();
