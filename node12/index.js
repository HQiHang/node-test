class Calculate {
    static addition(num1, num2){
        return parseFloat(num1) + parseFloat(num2);
    }
    static subtraction(num1, num2){
        return parseFloat(num1) - parseFloat(num2);
    }
    static multiplication(num1, num2){
        return parseFloat(num1) * parseFloat(num2);
    }
    static division(num1, num2){
        return parseFloat(num1) / parseFloat(num2);
    }
    static remainder(num1, num2){
        return parseFloat(num1) % parseFloat(num2);
    }
}
module.exports = Calculate;