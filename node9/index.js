const add = (n1, n2) => {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    return parseFloat(n1 + n2);
};

module.exports = add;