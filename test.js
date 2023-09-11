function recursiveFibonacci(n){
    if(n<=0){
        return n;
    }
    return recursiveFibonacci(n-1) + recursiveFibonacci(n-2)
}

console.log(recursiveFibonacci(7))