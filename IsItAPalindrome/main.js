function isPalindrome(x) {
    x = x.toLowerCase();
    for (let index = 0; index < (x.length/2); index++) {
        if (x[index] != x[x.length - index - 1])
            return false;
    }
    return true;
  }

console.log(isPalindrome("Hallo"))
console.log(isPalindrome("yay"));