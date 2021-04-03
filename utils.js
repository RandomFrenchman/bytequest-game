var gcd = function(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

var shuffleString = function(str) {
    return str.split('').sort(
        function () { return 0.5 - Math.random() }).join('');
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
