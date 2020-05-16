function wave(str){
    var result = [];
    str = str.toLowerCase();
    for (let index = 0; index < str.length; index++) {
        let str2 = str.split("");
        if (str2[index].trim() == "")
          continue;
        str2[index] = str2[index].toUpperCase();
        result.push(str2.join(""));
    }
    return result;
  }

console.log(wave("hello"));