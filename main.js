const arrayFromCodes = (array, min, max) => {
  for (let i = min; i <= max; i++) {
    array.push(String.fromCharCode(i));
  }
};

const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const randomOutput = (array1, array2) => {
  array1.push(array2[randomIndex(array2)]);
};

const replaceVal = (oldVal, newVal, array) => {
  for (let i = 0; i <= array.length; i++) {
    if (array[i] === oldVal) {
      array[i] = newVal;
    }
  }
  return array;
};

const concatArrays = (...any) => {
  let array = [];
  for (let i = 0; i < any.length; i++) {
    array = array.concat(any[i]);
  }
  return array;
};

const letters = [];
arrayFromCodes(letters, 65, 90);
arrayFromCodes(letters, 97, 122);

const alpha = [];
arrayFromCodes(alpha, 48, 57);
arrayFromCodes(alpha, 65, 90);
arrayFromCodes(alpha, 97, 122);

const digits = [];
arrayFromCodes(digits, 48, 57);

const nonAlpha = [];
arrayFromCodes(nonAlpha, 32, 47);
arrayFromCodes(nonAlpha, 58, 64);
arrayFromCodes(nonAlpha, 91, 96);
arrayFromCodes(nonAlpha, 123, 126);

const whitespace = [];
arrayFromCodes(whitespace, 9, 10);
arrayFromCodes(whitespace, 12, 13);

const nonWhitespace = concatArrays(alpha, digits, nonAlpha);
const nonDigit = concatArrays(letters, nonAlpha, whitespace);

const plusOperator = (i, selector, data, outputFromInput) => {
  let randomMax = Math.floor(Math.random() * 30);
  if (outputFromInput === "random") {
    for (let j = 0; j <= randomMax; j++) {
      selector.append(data[Math.floor(Math.random() * data.length)]);
    }
  } else if (outputFromInput === "same") {
    if (data === input[i + 1]) {
      for (let j = 0; j <= randomMax; j++) {
        selector.append(data); // * / + .
      }
    } else if (data === input[i]) {
      for (let j = 0; j <= randomMax; j++) {
        selector.append(data);
      } //abbas123
    }
  } else if (outputFromInput === "whitespace") {
    for (let j = 0; j <= randomMax; j++) {
      selector.append(data);
    }
  }
};

const asteriskOperator = (i, selector, data, outputFromInput) => {
  let randomMax = Math.floor(Math.random() * 30);
  if (randomMax === 0) {
    selector.append("");
  } else {
    if (outputFromInput === "random") {
      for (let j = 0; j < randomMax; j++) {
        selector.append(data[Math.floor(Math.random() * data.length)]);
      }
    } else if (outputFromInput === "same") {
      if (data === input[i + 1]) {
        for (let j = 0; j < randomMax; j++) {
          selector.append(data); // + * / .
        }
      } else if (data === input[i]) {
        for (let j = 0; j < randomMax; j++) {
          selector.append(data); //abbas123
        }
      }
    } else if (outputFromInput === "whitespace") {
      for (let j = 0; j < randomMax; j++) {
        selector.append(data); //abbas123
      }
    }
  }
};

const zeroOrOne = (i, selector, data, outputFromInput) => {
  let a = Math.floor(Math.random() * 2);
  if (a === 0) {
    selector.append("");
  } else {
    if (outputFromInput === "random") {
      selector.append(data[randomIndex(data)]);
    } else if (outputFromInput === "same") {
      if (data === input[i + 1]) {
        selector.append(data); // + * / .
      } else if (data === input[i]) {
        selector.append(data);
      } // abbas123
    } else if (outputFromInput === "whitespace") {
      selector.append(data);
    }
  }
};

const printExactly = (i, number, selector, data, outputFromInput) => {
  if (outputFromInput === "random") {
    for (let k = 0; k < number; k++) {
      selector.append(data[randomIndex(data)]);
    }
  } else if (outputFromInput === "same") {
    if (data === input[i + 1]) {
      for (let k = 0; k < number; k++) {
        selector.append(data); // + * / .
      }
    } else if (data === input[i]) {
      for (let k = 0; k < number; k++) {
        selector.append(data); //abbas123
      }
    }
  } else if (outputFromInput === "whitespace") {
    for (let k = 0; k < number; k++) {
      selector.append(data);
    }
  }
};

const quantifiers = (mainArray, i, data, charsAfterI, outputFromInput) => {
  if (outputFromInput === "random") {
    //wildcard point, \w,W,d,D,s,S
    switch (mainArray[i + charsAfterI]) {
      case "+":
        plusOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "*":
        asteriskOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "?":
        zeroOrOne(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "{":
        for (let j = i + charsAfterI + 1; j < mainArray.length; j++) {
          if (mainArray[j] === "}") {
            let numbers = [];
            for (let k = i + charsAfterI + 1; k < j; k++) {
              numbers.push(mainArray[k]);
            }
            let min = "";
            for (i of numbers) {
              if (i === ",") {
                break;
              } else {
                min = min.concat(i);
              }
            }
            let maxArray = [];
            for (let i = numbers.length - 1; i >= 0; i--) {
              if (numbers[i] === ",") {
                break;
              } else {
                maxArray.push(numbers[i]);
              }
            }
            let max = "";
            for (let i = maxArray.length - 1; i >= 0; i--) {
              max = max.concat(maxArray[i]);
            }
            min = Number(min);
            max = Number(max);
            console.log(min, max);
            let r;
            if (min < max) {
              r = Math.floor(Math.random() * (max + 1 - min) + min);
              printExactly(i, r, $("#output"), data, outputFromInput);
            } else if (min > max && max === 0) {
              if (min > 30) {
                $("#output")
                  .html("MINIMUM QUANTIFIER SHOULD NOT BE GREATER THAN 30")
                  .css({ color: "red" });
                break;
              }
              if (max === 0) {
                r = Math.floor(Math.random() * (30 - min) + min);
                printExactly(i, r, $("#output"), data, outputFromInput);
                console.log(r);
              }
            } else if (min === max) {
              printExactly(i, min, $("#output"), data, outputFromInput);
            } else {
              $("#output").html("Invalid Regex").css({ color: "red" });
            }
            i = j;
            return i;
          }
        }
        break;
      default:
        $("#output").append(data[randomIndex(data)]);
        return i + charsAfterI - 1;
    }
  } else if (outputFromInput === "same") {
    //abbas /+*-
    switch (mainArray[i + charsAfterI]) {
      case "+":
        plusOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "*":
        asteriskOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "?":
        zeroOrOne(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "{":
        for (let j = i + charsAfterI + 1; j < mainArray.length; j++) {
          if (mainArray[j] === "}") {
            let numbers = [];
            for (let k = i + charsAfterI + 1; k < j; k++) {
              numbers.push(mainArray[k]);
            }
            let min = "";
            for (i of numbers) {
              if (i === ",") {
                break;
              } else {
                min = min.concat(i);
              }
            }
            let maxArray = [];
            for (let i = numbers.length - 1; i >= 0; i--) {
              if (numbers[i] === ",") {
                break;
              } else {
                maxArray.push(numbers[i]);
              }
            }
            let max = "";
            for (let i = maxArray.length - 1; i >= 0; i--) {
              max = max.concat(maxArray[i]);
            }
            min = Number(min);
            max = Number(max);
            console.log(min, max);
            let r;
            if (min < max) {
              r = Math.floor(Math.random() * (max + 1 - min) + min);
              for (let i = 0; i < r; i++) {
                $("#output").append(data);
              }
              // printExactly(i, r, $("#output"), data, outputFromInput);
            } else if (min > max && max === 0) {
              if (min > 30) {
                $("#output")
                  .html("MINIMUM QUANTIFIER SHOULD NOT BE GREATER THAN 30")
                  .css({ color: "red" });
                break;
              } else {
                r = Math.floor(Math.random() * (30 - min) + min);
                for (let i = 0; i < r; i++) {
                  $("#output").append(data);
                }
                console.log(r);
              }
            } else if (min === max) {
              for (let i = 0; i < min; i++) {
                $("#output").append(data);
              }
            } else {
              $("#output").html("Invalid Regex").css({ color: "red" });
            }
            i = j;
            return i;
          }
        }
        break;
      default:
        $("#output").append(mainArray[i + charsAfterI - 1]);
        return i + charsAfterI - 1;
    }
  } else if (outputFromInput === "whitespace") {
    switch (mainArray[i + charsAfterI]) {
      case "+":
        plusOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "*":
        asteriskOperator(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "?":
        zeroOrOne(i, $("#output"), data, outputFromInput);
        return i + charsAfterI;
      case "{":
        for (let j = i + charsAfterI + 1; j < mainArray.length; j++) {
          if (mainArray[j] === "}") {
            let numbers = [];
            for (let k = i + charsAfterI + 1; k < j; k++) {
              numbers.push(mainArray[k]);
            }
            let min = "";
            for (i of numbers) {
              if (i === ",") {
                break;
              } else {
                min = min.concat(i);
              }
            }
            let maxArray = [];
            for (let i = numbers.length - 1; i >= 0; i--) {
              if (numbers[i] === ",") {
                break;
              } else {
                maxArray.push(numbers[i]);
              }
            }
            let max = "";
            for (let i = maxArray.length - 1; i >= 0; i--) {
              max = max.concat(maxArray[i]);
            }
            min = Number(min);
            max = Number(max);
            console.log(min, max);
            let r;
            if (min < max) {
              r = Math.floor(Math.random() * (max + 1 - min) + min);
              printExactly(i, r, $("#output"), data, outputFromInput);
            } else if (min > max && max === 0) {
              if (min > 30) {
                $("#output")
                  .html("MINIMUM QUANTIFIER SHOULD NOT BE GREATER THAN 30")
                  .css({ color: "red" });
                break;
              }
              if (max === 0) {
                r = Math.floor(Math.random() * (30 - min) + min);
                printExactly(i, r, $("#output"), data, outputFromInput);
                console.log(r);
              }
            } else if (min === max) {
              printExactly(i, min, $("#output"), data, outputFromInput);
            } else {
              $("#output").html("Invalid Regex").css({ color: "red" });
            }
            i = j;
            return i;
          }
        }
        break;
      default:
        $("#output").append(data);
        return i + charsAfterI - 1;
    }
  }
};

/* replaceVal('\"','\"',nonAlpha); */

let input;
let temp;
$("#click").on("click", () => {
  $("#output").empty().css({
    color: "unset",
  });

  input = Array.from($("#regex").val());
  let group = [];
  for (let i = 0; i < input.length; i++) {
    //place capture groups in an array(group) as a single array element
    if (input[i] === "(") {
      let str = "";
      while (input[i] !== ")") {
        str += input[i];
        i++;
      }
      str += input[i];
      group.push(str);
    } else {
      group.push(input[i]);
    }
  }
  console.log("array between parentheses:", group);
  let group2 = [];
  for (let i = 0; i < group.length; i++) {
    //place each regex input separated by | symbol as single array(group2) elemets
    let str = "";
    while (group[i] !== "|" && i < group.length) {
      str += group[i];
      i++; //1
    }
    group2.push(str);
  }
  console.log("group2", group2);
  let inputString;
  if (group2.length > 1) {
    //there are multiple regex input separated by an OR symbol
    inputString = group2[randomIndex(group2)]; //choose a random regex from those separated by |
  } else if (group2.length === 1) {
    //regex input doesn't contain an |
    inputString = group2[0];
  } else {
    $("#output")
      .append("Empty Regex")
      .css({ color: "blue", "font-size": "24px" });
  }
  input = Array.from(inputString);
  console.log(input);

  callSelf(input, 0);
  function callSelf(array, counter) {
    for (let i = counter; i < array.length; i++) {
      console.log(array, "of index [", i, "]");
      if (array[i] === "(") {
        console.log(`input of [${i}] = ${array[i]}`);
        for (let j = i; j < array.length; j++) {
          if (array[j] === ")") {
            console.log(`input of [${j}] = ${array[j]}`);
            let captureGroup = [];
            for (let k = i + 1; k < j; k++) {
              captureGroup.push(array[k]);
            }
            let hasVerticalBar = false;
            for (let z = 0; z < captureGroup.length; z++) {
              if (captureGroup[z] === "|") {
                hasVerticalBar = true;
              }
            }
            if (hasVerticalBar === true) {
              console.log(`capturegroup contains |`);
              console.log(captureGroup);
              let ORarray = captureGroup.join("").split("|"); //['ab','cd']
              console.log(ORarray);
              let ORrandom = ORarray[randomIndex(ORarray)];
              let ORarray2 = Array.from(ORrandom);
              console.log(ORarray2);
              callSelf(ORarray2, 0);
              i = j;
              console.log("should be input of index= ", j);
            } else {
              console.log(`captureGroup = ${captureGroup}`);
              callSelf(captureGroup, 0);
              i = j;
            }
            break;
          }
        }
      } else if (array[i] === "\\") {
        switch (array[i + 1]) {
          case "w":
            i = quantifiers(array, i, alpha, 2, "random");
            break;
          case "W":
            i = quantifiers(array, i, nonAlpha, 2, "random");
            break;
          case "d":
            i = quantifiers(array, i, digits, 2, "random");
            break;
          case "D":
            i = quantifiers(array, i, nonDigit, 2, "random");
            break;
          case "s":
            i = quantifiers(array, i, whitespace, 2, "random");
            break;
          case "S":
            i = quantifiers(array, i, nonWhitespace, 2, "random");
            break;
          case "\\":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case "*":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case ".":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case "+":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case "/":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case "(":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case ")":
            i = quantifiers(array, i, array[i + 1], 2, "same");
          case "|":
            i = quantifiers(array, i, array[i + 1], 2, "same");
            break;
          case "t":
            i = quantifiers(
              array,
              i,
              "&nbsp;&nbsp;&nbsp;&nbsp;",
              2,
              "whitespace",
            );
            break;
          case "n":
            i = quantifiers(array, i, "<br>", 2, "whitespace");
            break;
          case "r":
            i = quantifiers(array, i, "&#13;", 2, "whitespace");
            break;
        }
      } else if (/[^?+*/|()]/.test(array[i])) {
        i = quantifiers(array, i, array[i], 1, "same");
      } else if (array[i] === " ") {
        i = quantifiers(array, i, "&nbsp;", 1, "whitespace");
      } else if (array[i] === ".") {
        let wildcard = [];
        arrayFromCodes(wildcard, 32, 126);
        i = quantifiers(array, i, wildcard, 1, "random");
      } else if (array[i] === "[") {
        let charactersSet = [];
        let j = i + 1;
        while (array[j] !== "]") {
          charactersSet.push(array[j]);
          j++;
        }
        let all = concatArrays(letters, alpha, nonAlpha, digits, whitespace);
        if (charactersSet[0] === "^") {
          let dontMatch = charactersSet.filter((element) => element !== "^");
          let temp = [];
          for (let k = 0; k < dontMatch.length; k++) {
            console.log(k);
            if (dontMatch[k + 1] === "-") {
              let rangeStart, rangeEnd;
              for (let j = 48; j <= 57; j++) {
                if (dontMatch[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (dontMatch[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              for (let j = 65; j <= 90; j++) {
                if (dontMatch[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (dontMatch[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              for (let j = 97; j <= 122; j++) {
                if (dontMatch[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (dontMatch[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              if (rangeStart < rangeEnd) {
                let range = [];
                arrayFromCodes(range, rangeStart, rangeEnd);
                for (let i = 0; i < range.length; i++) {
                  temp.push(range[i]);
                }
                k = k + 2;
              }
            } else if (dontMatch[k] === "\\") {
              function pushNegated(k) {
                temp.push(dontMatch[k] + dontMatch[k + 1]);
                return k + 1;
              }
              switch (dontMatch[k + 1]) {
                case "w":
                  k = pushNegated(k);
                  break;
                case "W":
                  k = pushNegated(k);

                  break;
                case "d":
                  k = pushNegated(k);

                  break;
                case "D":
                  k = pushNegated(k);

                  break;
                case "s":
                  k = pushNegated(k);

                  break;
                case "S":
                  k = pushNegated(k);

                  break;
                case "\\":
                  k = pushNegated(k);

                  break;
                case "*":
                  k = pushNegated(k);

                  break;
                case "+":
                  k = pushNegated(k);

                  break;
                case "n":
                  temp.push("<br></br>");
                  k++;
                  break;
                case "t":
                  temp.push("&nbsp;&nbsp;&nbsp;&nbsp");
                  k++;
                  break;
              }
            } else {
              temp.push(dontMatch[k]);
            }
          }
          console.log(temp);

          negatedRandom();
          function negatedRandom() {
            let r = randomIndex(all);
            let counter = 0;
            console.log("all[r] = ", all[r]);
            for (let f = 0; f < temp.length; f++) {
              switch (temp[f]) {
                case "\\w":
                  if (/\w/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                case "\\d":
                  if (/\d/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                case "\\W":
                  if (/\W/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                case "\\D":
                  if (/\D/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                case "\\s":
                  if (/\s/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                case "\\S":
                  if (/\S/.test(all[r]) === false) {
                    counter++;
                  } else {
                    negatedRandom();
                  }
                  break;
                default:
                  if (all[r] === temp[f]) {
                    negatedRandom();
                  } else {
                    counter++;
                  }
              }
            }
            console.log(counter);
            if (counter === temp.length) {
              console.log(`counter final=${counter}`);
              $("#output").append(all[r]);
            }
          }
        } else {
          let temp = [];
          for (let k = 0; k < charactersSet.length; k++) {
            console.log(k);
            if (charactersSet[k + 1] === "-") {
              let rangeStart, rangeEnd;
              for (let j = 48; j <= 57; j++) {
                if (charactersSet[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (charactersSet[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              for (let j = 65; j <= 90; j++) {
                if (charactersSet[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (charactersSet[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              for (let j = 97; j <= 122; j++) {
                if (charactersSet[k] === String.fromCharCode(j)) {
                  rangeStart = j;
                }
                if (charactersSet[k + 2] === String.fromCharCode(j)) {
                  rangeEnd = j;
                }
              }
              if (rangeStart < rangeEnd) {
                let range = [];
                arrayFromCodes(range, rangeStart, rangeEnd);
                for (let i = 0; i < range.length; i++) {
                  temp.push(range[i]);
                }
                // $("#output").append(temp[randomIndex(temp)]);
                // console.log(temp);
                k = k + 2;
              }
            } else if (charactersSet[k] === "\\") {
              switch (charactersSet[k + 1]) {
                case "w":
                  randomOutput(temp, alpha);
                  k++;
                  break;
                case "W":
                  randomOutput(temp, nonAlpha);
                  k++;
                  break;
                case "d":
                  randomOutput(temp, digits);
                  k++;
                  break;
                case "D":
                  randomOutput(temp, nonDigit);
                  k++;
                  break;
                case "s":
                  randomOutput(temp, whitespace);
                  k++;
                  break;
                case "S":
                  randomOutput(temp, nonWhitespace);
                  k++;
                  break;
                case "\\":
                  temp.push("\\");
                  k++;
                  break;
                case "*":
                  temp.push("*");
                  k++;
                  break;
                case "+":
                  temp.push("+");
                  k++;
                  break;
                case "n":
                  temp.push("<br></br>");
                  k++;
                  break;
                case "t":
                  temp.push("&nbsp;&nbsp;&nbsp;&nbsp");
                  k++;
                  break;
              }
            } else {
              temp.push(charactersSet[k]);
            }
          }
          console.log(temp);
          $("#output").append(temp[randomIndex(temp)]);
        }
        i = j;
      } else {
        console.log(`${array[i]} caused an error`);
        $("#output").html("invalid regex");
        $("#output").css({
          color: "red",
        });
        break;
      }
    }
  }
  // for (let i = 0; i < input.length; i++) {
  //   console.log(`input index: ${i}`);
  //   if (input[i] === "\\") {
  //     switch (input[i + 1]) {
  //       case "w":
  //         i = quantifiers(input, i, alpha, 2, "random");
  //         break;
  //       case "W":
  //         i = quantifiers(input, i, nonAlpha, 2, "random");
  //         break;
  //       case "d":
  //         i = quantifiers(input, i, digits, 2, "random");
  //         break;
  //       case "D":
  //         i = quantifiers(input, i, nonDigit, 2, "random");
  //         break;
  //       case "s":
  //         i = quantifiers(input, i, whitespace, 2, "random");
  //         break;
  //       case "S":
  //         i = quantifiers(input, i, nonWhitespace, 2, "random");
  //         break;
  //       case "\\":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case "*":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case ".":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case "+":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case "/":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case "(":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case ")":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //       case "|":
  //         i = quantifiers(input, i, input[i + 1], 2, "same");
  //         break;
  //       case "t":
  //         i = quantifiers(
  //           input,
  //           i,
  //           "&nbsp;&nbsp;&nbsp;&nbsp;",
  //           2,
  //           "whitespace",
  //         );
  //         break;
  //       case "n":
  //         i = quantifiers(input, i, "<br>", 2, "whitespace");
  //         break;
  //       case "r":
  //         i = quantifiers(input, i, "&#13;", 2, "whitespace");
  //         break;
  //     }
  //   } else if (/[^?+*/|()]/.test(input[i])) {
  //     i = quantifiers(input, i, input[i], 1, "same");
  //   } else if (input[i] === " ") {
  //     i = quantifiers(input, i, "&nbsp;", 1, "whitespace");
  //   } else if (input[i] === ".") {
  //     let wildcard = [];
  //     arrayFromCodes(wildcard, 32, 126);
  //     i = quantifiers(input, i, wildcard, 1, "random");
  //   } else if (input[i] === "[") {
  //     let charactersSet = [];
  //     let j = i + 1;
  //     while (input[j] !== "]") {
  //       charactersSet.push(input[j]);
  //       j++;
  //     }
  //     let all = concatArrays(letters, alpha, nonAlpha, digits, whitespace);
  //     if (charactersSet[0] === "^") {
  //       let dontMatch = charactersSet.filter((element) => element !== "^");
  //       let temp = [];
  //       for (let k = 0; k < dontMatch.length; k++) {
  //         console.log(k);
  //         if (dontMatch[k + 1] === "-") {
  //           let rangeStart, rangeEnd;
  //           for (let j = 48; j <= 57; j++) {
  //             if (dontMatch[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (dontMatch[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           for (let j = 65; j <= 90; j++) {
  //             if (dontMatch[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (dontMatch[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           for (let j = 97; j <= 122; j++) {
  //             if (dontMatch[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (dontMatch[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           if (rangeStart < rangeEnd) {
  //             let range = [];
  //             arrayFromCodes(range, rangeStart, rangeEnd);
  //             for (let i = 0; i < range.length; i++) {
  //               temp.push(range[i]);
  //             }
  //             k = k + 2;
  //           }
  //         } else if (dontMatch[k] === "\\") {
  //           function pushNegated(k) {
  //             temp.push(dontMatch[k] + dontMatch[k + 1]);
  //             return k + 1;
  //           }
  //           switch (dontMatch[k + 1]) {
  //             case "w":
  //               k = pushNegated(k);
  //               break;
  //             case "W":
  //               k = pushNegated(k);

  //               break;
  //             case "d":
  //               k = pushNegated(k);

  //               break;
  //             case "D":
  //               k = pushNegated(k);

  //               break;
  //             case "s":
  //               k = pushNegated(k);

  //               break;
  //             case "S":
  //               k = pushNegated(k);

  //               break;
  //             case "\\":
  //               k = pushNegated(k);

  //               break;
  //             case "*":
  //               k = pushNegated(k);

  //               break;
  //             case "+":
  //               k = pushNegated(k);

  //               break;
  //             case "n":
  //               temp.push("<br></br>");
  //               k++;
  //               break;
  //             case "t":
  //               temp.push("&nbsp;&nbsp;&nbsp;&nbsp");
  //               k++;
  //               break;
  //           }
  //         } else {
  //           temp.push(dontMatch[k]);
  //         }
  //       }
  //       console.log(temp);

  //       negatedRandom();
  //       function negatedRandom() {
  //         let r = randomIndex(all);
  //         let counter = 0;
  //         console.log("all[r] = ", all[r]);
  //         for (let f = 0; f < temp.length; f++) {
  //           switch (temp[f]) {
  //             case "\\w":
  //               if (/\w/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             case "\\d":
  //               if (/\d/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             case "\\W":
  //               if (/\W/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             case "\\D":
  //               if (/\D/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             case "\\s":
  //               if (/\s/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             case "\\S":
  //               if (/\S/.test(all[r]) === false) {
  //                 counter++;
  //               } else {
  //                 negatedRandom();
  //               }
  //               break;
  //             default:
  //               if (all[r] === temp[f]) {
  //                 negatedRandom();
  //               } else {
  //                 counter++;
  //               }
  //           }
  //         }
  //         console.log(counter);
  //         if (counter === temp.length) {
  //           console.log(`counter final=${counter}`);
  //           $("#output").append(all[r]);
  //         }
  //       }
  //     } else {
  //       let temp = [];
  //       for (let k = 0; k < charactersSet.length; k++) {
  //         console.log(k);
  //         if (charactersSet[k + 1] === "-") {
  //           let rangeStart, rangeEnd;
  //           for (let j = 48; j <= 57; j++) {
  //             if (charactersSet[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (charactersSet[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           for (let j = 65; j <= 90; j++) {
  //             if (charactersSet[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (charactersSet[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           for (let j = 97; j <= 122; j++) {
  //             if (charactersSet[k] === String.fromCharCode(j)) {
  //               rangeStart = j;
  //             }
  //             if (charactersSet[k + 2] === String.fromCharCode(j)) {
  //               rangeEnd = j;
  //             }
  //           }
  //           if (rangeStart < rangeEnd) {
  //             let range = [];
  //             arrayFromCodes(range, rangeStart, rangeEnd);
  //             for (let i = 0; i < range.length; i++) {
  //               temp.push(range[i]);
  //             }
  //             // $("#output").append(temp[randomIndex(temp)]);
  //             // console.log(temp);
  //             k = k + 2;
  //           }
  //         } else if (charactersSet[k] === "\\") {
  //           switch (charactersSet[k + 1]) {
  //             case "w":
  //               randomOutput(temp, alpha);
  //               k++;
  //               break;
  //             case "W":
  //               randomOutput(temp, nonAlpha);
  //               k++;
  //               break;
  //             case "d":
  //               randomOutput(temp, digits);
  //               k++;
  //               break;
  //             case "D":
  //               randomOutput(temp, nonDigit);
  //               k++;
  //               break;
  //             case "s":
  //               randomOutput(temp, whitespace);
  //               k++;
  //               break;
  //             case "S":
  //               randomOutput(temp, nonWhitespace);
  //               k++;
  //               break;
  //             case "\\":
  //               temp.push("\\");
  //               k++;
  //               break;
  //             case "*":
  //               temp.push("*");
  //               k++;
  //               break;
  //             case "+":
  //               temp.push("+");
  //               k++;
  //               break;
  //             case "n":
  //               temp.push("<br></br>");
  //               k++;
  //               break;
  //             case "t":
  //               temp.push("&nbsp;&nbsp;&nbsp;&nbsp");
  //               k++;
  //               break;
  //           }
  //         } else {
  //           temp.push(charactersSet[k]);
  //         }
  //       }
  //       console.log(temp);
  //       $("#output").append(temp[randomIndex(temp)]);
  //     }
  //     i = j;
  //   } else {
  //     console.log(`${input[i]} caused an error`);
  //     $("#output").html("invalid regex");
  //     $("#output").css({
  //       color: "red",
  //     });
  //     break;
  //   }
  // }
});
