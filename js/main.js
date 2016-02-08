function steinCalc(globalObject) {
  $(document).ready(function() {
    var symbolsInScreen = '',
      symbolFromButton, firstNumber, secondNumber, percentFlag, firstNumberTemp, secondNumberTemp, resultNumber, percentNumber, actionName, memNumber = '0',
      memNumberTemp, keyPressValue, flagRPN = 'false';

    var ActivateRPNMode = Backbone.View.extend({
      el: $(document),
      events: {
        "click #rPN": "activateRPN"
      },
      activateRPN: function() {
        $('#screenOfCalc').text('0');
        symbolsInScreen = '';
        if (flagRPN === 'false') {
          flagRPN = 'true';
          $(".nonRPN").prop("disabled", true);
          $('#rPN').addClass('activeRPN');
        } else if (flagRPN === 'true') {
          flagRPN = 'false';
          $(".nonRPN").prop("disabled", false);
          $('#rPN').removeClass('activeRPN');
        }
      }
    });
    var activateRPNMode = new ActivateRPNMode();

    var KeyPressMode = Backbone.View.extend({
      el: $(document),
      events: {
        'keypress': 'keyPressAction'
      },
      keyPressAction: function(eventObject) {
        keyPressValue = eventObject.which;
        eventObject.preventDefault();
        if (keyPressValue === 37) {
          $('#percent:input').focus().click();
        } else if (keyPressValue === 40) {
          $('#leftParenthesis:input').focus().click();
        } else if (keyPressValue === 41) {
          $('#rightParenthesis:input').focus().click();
        } else if (keyPressValue === 42) {
          $('#multiplyButton:input').focus().click();
        } else if (keyPressValue === 43) {
          $('#plusButton').focus().click();
        } else if ((keyPressValue === 44) || (keyPressValue === 46)) {
          $('#dotButton').focus().click();
        } else if ((keyPressValue === 45) || (keyPressValue === 95)) {
          $('#subtractButton').focus().click();
        } else if (keyPressValue === 47) {
          $('#divisionButton').focus().click();
        } else if (keyPressValue === 48) {
          $('#nullButton').focus().click();
        } else if (keyPressValue === 49) {
          $('#oneButton').focus().click();
        } else if (keyPressValue === 50) {
          $('#twoButton').focus().click();
        } else if (keyPressValue === 51) {
          $('#threeButton').focus().click();
        } else if (keyPressValue === 52) {
          $('#fourButton').focus().click();
        } else if (keyPressValue === 53) {
          $('#fiveButton').focus().click();
        } else if (keyPressValue === 54) {
          $('#sixButton').focus().click();
        } else if (keyPressValue === 55) {
          $('#sevenButton:input').focus().click();
        } else if (keyPressValue === 56) {
          $('#eightButton:input').focus().click();
        } else if (keyPressValue === 57) {
          $('#nineButton:input').focus().click();
        } else if ((keyPressValue === 61) || (keyPressValue === 13)) {
          $('#equalButton:input').focus().click();
        } else if (keyPressValue === 94) {
          $('#power:input').focus().click();
        } else if ((keyPressValue === 67) || (keyPressValue === 99)) {
          $('#reset').focus().click();
        } else if ((keyPressValue === 69) || (keyPressValue === 101)) {
          $('#exp').focus().click();
        } else if ((keyPressValue === 80) || (keyPressValue === 112)) {
          $('#pi').focus().click();
        } else if (keyPressValue === 8) {
          $('#delLast:input').focus().click();
        } else if ((keyPressValue === 82) || (keyPressValue === 114)) {
          $('#rPN').focus().click();
        }
      }
    });
    var keyPressMode = new KeyPressMode();

    var ButtonsClickMode = Backbone.View.extend({
      el: $(document),
      events: {
        "click .buttons": "buttonClickAction"
      },
      buttonClickAction: function(eventObject) {
        var idOfButton = eventObject.target.id,
          classOfButton = eventObject.target.className;
        if (($('#screenOfCalc').text() === 'Error - divide by zero') || ($('#screenOfCalc').text() === 'Error - incorrect formula')) {
          $('#screenOfCalc').text('0');
          symbolsInScreen = '';
        }
        $('.buttons').removeClass('activeButton');
        $('#' + idOfButton).addClass('activeButton');
        setTimeout(function() {
          $('.buttons').removeClass('activeButton');
        }, 300);
        if ($('#' + idOfButton).is('.symbol')) {
          if ($('#' + idOfButton).is('#dotButton') && ($('#screenOfCalc').text() === '0')) {
            symbolsInScreen = '0.';
            $('#screenOfCalc').text(symbolsInScreen);
          } else if (($('#' + idOfButton).is('#dotButton')) && (flagRPN === 'true')) {
            var symbolsBeforeDot = -1,
              tempSymArr = [],
              tempString = '';
            var tempStr = $('#screenOfCalc').text();
            tempSymArr = tempStr.split(/[\+,\-,\/,\*,\(]/);
            symbolsBeforeDot = tempSymArr[tempSymArr.length - 1].indexOf('.');
            if (symbolsBeforeDot === -1) {
              symbolFromButton = $('#' + idOfButton).text();
              symbolsInScreen += symbolFromButton;
              $('#screenOfCalc').text(symbolsInScreen);
            }
          } else if ($('#' + idOfButton).is('#dotButton')) {
            var symbolsBeforeDot = -1;
            symbolsBeforeDot = $('#screenOfCalc').text().indexOf('.');
            if (symbolsBeforeDot === -1) {
              symbolFromButton = $('#' + idOfButton).text();
              symbolsInScreen += symbolFromButton;
              $('#screenOfCalc').text(symbolsInScreen);
            }
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#pi'))) {
            symbolsInScreen = '3.14159';
            $('#screenOfCalc').text(symbolsInScreen);
          } else if ($('#' + idOfButton).is('#pi')) {
            if ($('#screenOfCalc').text() !== '0') {
              symbolsInScreen = $('#screenOfCalc').text() + '3.14159';
              $('#screenOfCalc').text(symbolsInScreen);
            } else {
              symbolsInScreen = '3.14159';
              $('#screenOfCalc').text(symbolsInScreen);
            }
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#exp'))) {
            symbolsInScreen = '2.718';
            $('#screenOfCalc').text(symbolsInScreen);
          } else if ($('#' + idOfButton).is('#exp')) {
            if ($('#screenOfCalc').text() !== '0') {
              symbolsInScreen = $('#screenOfCalc').text() + '2.718';
              $('#screenOfCalc').text(symbolsInScreen);
            } else {
              symbolsInScreen = '2.718';
              $('#screenOfCalc').text(symbolsInScreen);
            }
          } else if ($('#' + idOfButton).is('#leftParenthesis')) {
            if (flagRPN === 'true') {
              var tempStr = $('#screenOfCalc').text();
              var tempSymb = tempStr[tempStr.length - 1];
              if ((((tempStr.length - 1) === 0) && (tempSymb === '0')) || ((tempSymb !== ')') && (tempSymb !== '.') && (isNaN(parseInt(tempSymb))))) {
                symbolFromButton = $('#' + idOfButton).text();
                symbolsInScreen += symbolFromButton;
                $('#screenOfCalc').text(symbolsInScreen);
              }
            }
          } else if ($('#' + idOfButton).is('#rightParenthesis')) {
            if (flagRPN === 'true') {
              var tempStr = $('#screenOfCalc').text();
              var tempSymb = tempStr[tempStr.length - 1];
              if (((tempStr.length - 1) !== 0) && ((tempSymb !== '(') || (!isNaN(parseInt(tempSymb))))) {
                symbolFromButton = $('#' + idOfButton).text();
                symbolsInScreen += symbolFromButton;
                $('#screenOfCalc').text(symbolsInScreen);
              }
            }
          } else {
            symbolFromButton = $('#' + idOfButton).text();
            symbolsInScreen += symbolFromButton;
            $('#screenOfCalc').text(symbolsInScreen);
          }
        } else if ($('#' + idOfButton).is('.action')) {
          if ($('#' + idOfButton).is('#reset')) {
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#plusButton'))) {
            actionName = 'plus';
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ((flagRPN === 'true') && ($('#' + idOfButton).is('.rPNAction'))) {
            var notDoubleAction = $('#screenOfCalc').text()[($('#screenOfCalc').text().length) - 1];
            if ((notDoubleAction !== '/') && (notDoubleAction !== '*') && (notDoubleAction !== '-') && (notDoubleAction !== '+') && (notDoubleAction !== '(')) {
              symbolFromButton = $('#' + idOfButton).text();
              symbolsInScreen += symbolFromButton;
              $('#screenOfCalc').text(symbolsInScreen);
            } else {
              $('#screenOfCalc').text(symbolsInScreen);
            };
          } else if ($('#' + idOfButton).is('#mSave')) {
            if (!isNaN($('#screenOfCalc').text())) {
              memNumberTemp = $('#screenOfCalc').text();
              memNumber = parseFloat(memNumberTemp);
            }
          } else if ($('#' + idOfButton).is('#mRead')) {
            firstNumber = memNumber;
            $('#screenOfCalc').text(firstNumber);
            symbolsInScreen = firstNumber;
          } else if ($('#' + idOfButton).is('#mClear')) {
            memNumber = '0';
          } else if ($('#' + idOfButton).is('#mPlus')) {
            if (!isNaN($('#screenOfCalc').text())) {
              memNumberTemp = $('#screenOfCalc').text();
              memNumber += parseFloat(memNumberTemp);
            }
          } else if ($('#' + idOfButton).is('#mMinus')) {
            if (!isNaN($('#screenOfCalc').text())) {
              memNumberTemp = $('#screenOfCalc').text();
              memNumber -= parseFloat(memNumberTemp);
            }
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#subtractButton'))) {
            actionName = 'subtract';
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ($('#' + idOfButton).is('#delLast')) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = firstNumberTemp.slice(0, firstNumberTemp.length - 1);
            $('#screenOfCalc').text(firstNumber);
            symbolsInScreen = firstNumber;
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#plusMinus'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            if (firstNumberTemp.slice(0, 1) === '-') {
              firstNumber = firstNumberTemp.slice(1, firstNumberTemp.length);
            } else {
              firstNumber = '-' + firstNumberTemp;
            }
            $('#screenOfCalc').text(firstNumber);
            symbolsInScreen = firstNumber;
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#sin'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            resultNumber = Math.sin(firstNumber);
            $('#screenOfCalc').text(resultNumber);
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#cos'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            resultNumber = Math.cos(firstNumber);
            $('#screenOfCalc').text(resultNumber);
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#squarePower'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            resultNumber = Math.pow(firstNumber, 2);
            $('#screenOfCalc').text(resultNumber);
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#powerThree'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            resultNumber = Math.pow(firstNumber, 3);
            $('#screenOfCalc').text(resultNumber);
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#power'))) {
            actionName = 'power';
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#multiplyButton'))) {
            actionName = 'multiply';
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#divisionButton'))) {
            actionName = 'division';
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            $('#screenOfCalc').text('0');
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#squareRoot'))) {
            firstNumberTemp = $('#screenOfCalc').text();
            firstNumber = parseFloat(firstNumberTemp);
            resultNumber = Math.sqrt(firstNumber);
            $('#screenOfCalc').text(resultNumber);
            symbolsInScreen = '';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#percent'))) {
            secondNumberTemp = $('#screenOfCalc').text();
            secondNumber = parseFloat(secondNumberTemp);
            percentNumber = (firstNumber / 100 * secondNumber);
            $('#screenOfCalc').text(percentNumber);
            percentFlag = 'true';
          } else if ((flagRPN === 'false') && ($('#' + idOfButton).is('#equalButton'))) {
            secondNumberTemp = $('#screenOfCalc').text();
            secondNumber = parseFloat(secondNumberTemp);
            if (percentFlag === 'true') {
              if (actionName === 'plus') {
                resultNumber = (firstNumber + percentNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
                percentFlag = 'false';
              } else if (actionName === 'subtract') {
                resultNumber = (firstNumber - percentNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
                percentFlag = 'false';
              } else if (actionName === 'multiply') {
                resultNumber = (firstNumber * percentNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
                percentFlag = 'false';
              } else if (actionName === 'division') {
                if (percentNumber !== 0) {
                  resultNumber = (firstNumber / percentNumber);
                  $('#screenOfCalc').text(resultNumber);
                  symbolsInScreen = '';
                  percentFlag = 'false';
                } else {
                  $('#screenOfCalc').text('Error - divide by zero');
                  symbolsInScreen = '';
                }
              } else if (actionName === 'power') {
                resultNumber = Math.pow(firstNumber, percentNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
                percentFlag = 'false';
              }
            } else { //if (percentFlag === 'false')
              if (actionName === 'plus') {
                resultNumber = (firstNumber + secondNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
              } else if (actionName === 'subtract') {
                resultNumber = (firstNumber - secondNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
              } else if (actionName === 'multiply') {
                resultNumber = (firstNumber * secondNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
              } else if (actionName === 'division') {
                if (secondNumber !== 0) {
                  resultNumber = (firstNumber / secondNumber);
                  $('#screenOfCalc').text(resultNumber);
                  symbolsInScreen = '';
                } else {
                  $('#screenOfCalc').text('Error - divide by zero');
                  symbolsInScreen = '';
                }
              } else if (actionName === 'power') {
                resultNumber = Math.pow(firstNumber, secondNumber);
                $('#screenOfCalc').text(resultNumber);
                symbolsInScreen = '';
              }
            }
          } else if ((flagRPN === 'true') && ($('#' + idOfButton).is('#equalButton'))) {
            var outResult, result, inVal = $('#screenOfCalc').text();

            function stringFormulaToArray(stringFormula) {
              var tempArr = [],
                tempVar = '',
                leftCount = 0,
                rightCount = 0,
                tempFormul;
              tempFormul = stringFormula[stringFormula.length - 1];
              for (var i = 0; i < stringFormula.length; i++) {
                if (stringFormula[i] === '(') {
                  leftCount++;
                }
                if (stringFormula[i] === ')') {
                  rightCount++;
                }
              }
              if ((leftCount !== rightCount) || ((isNaN(tempFormul)) && (tempFormul !== ')'))) {
                return 'Error';
              } else {

                for (var i = 0; i < stringFormula.length; i++) {
                  if ((isNaN(stringFormula[i])) && (stringFormula[i] !== '.')) {
                    if (tempVar === '') {
                      tempArr.push(stringFormula[i]);
                      tempVar = '';
                    } else {
                      tempArr.push(tempVar);
                      tempVar = '';
                      tempArr.push(stringFormula[i]);
                    }
                  } else if (i !== stringFormula.length - 1) {
                    tempVar += stringFormula[i];
                  } else {
                    tempVar += stringFormula[i];
                    tempArr.push(tempVar);
                    tempVar = '';
                  }
                }
              }
              return tempArr;
            }

            function symbolPriority(inSymbol) {
              switch (inSymbol) {
                case ')':
                  return 0;
                  break;
                case '(':
                  return 1;
                  break;
                case '+':
                  return 2;
                  break;
                case '-':
                  return 2;
                  break;
                case '*':
                  return 3;
                  break;
                case '/':
                  return 3;
                  break;
                default:
                  return 'Error!'
                  break;
              }
            }

            function toReversePolishNotation(inVar) {
              var stack = [],
                rpn = [],
                tempVal;
              tempVal = stringFormulaToArray(inVar);
              if (tempVal !== 'Error') {
                for (var i = 0; i < tempVal.length; i++) {
                  if (!isNaN(parseFloat(tempVal[i]))) {
                    if (i === tempVal.length - 1) {
                      rpn.push(tempVal[i]);
                      while (stack.length > 0) {
                        rpn.push(stack.pop());
                      }
                    } else {
                      rpn.push(tempVal[i]);
                    }
                  } else if (symbolPriority(tempVal[i]) === 1) {
                    stack.push(tempVal[i]);
                  } else if (symbolPriority(tempVal[i]) === 2) {
                    if ((stack.length === 0) || (symbolPriority(stack[stack.length - 1]) === 1)) {
                      stack.push(tempVal[i]);
                    } else if ((symbolPriority(stack[stack.length - 1]) === 2) || (symbolPriority(stack[stack.length - 1]) === 3)) {
                      rpn.push(stack.pop());
                      if ((symbolPriority(stack[stack.length - 1]) === 2) || (symbolPriority(stack[stack.length - 1]) === 3)) {
                        rpn.push(stack.pop());
                        stack.push(tempVal[i]);
                      } else {
                        stack.push(tempVal[i]);
                      }
                    } else {
                      stack.push(tempVal[i]);
                    }
                  } else if (symbolPriority(tempVal[i]) === 3) {
                    if ((stack.length === 0) || (symbolPriority(stack[stack.length - 1]) === 1)) {
                      stack.push(tempVal[i]);
                    } else if (symbolPriority(stack[stack.length - 1]) === 3) {
                      rpn.push(stack.pop());
                      if (symbolPriority(stack[stack.length - 1]) === 3) {
                        rpn.push(stack.pop());
                        stack.push(tempVal[i]);
                      } else {
                        stack.push(tempVal[i]);
                      }
                    } else {
                      stack.push(tempVal[i]);
                    }
                  } else if (symbolPriority(tempVal[i]) === 0) {
                    for (var j = stack.length - 1; j > 0; j--) {
                      if (symbolPriority(stack[j]) !== 1) {
                        rpn.push(stack.pop());
                      } else {
                        stack.pop();
                        break;
                      }
                    }
                  }
                }
                return rpn;
              } else {
                return 'Error - incorrect formula';
              }
            }

            function solveReversePolishNotation(formulaInRPN) {
              var answerOfSolve = 0,
                arrayOfTempAnswers = [],
                tempVariable, glass, tempFormula = [],
                tempAnswer;
              for (var i = 0; i < formulaInRPN.length; i++) {
                glass = formulaInRPN[i];
                tempFormula[i] = glass;
              }
              var i = -1;
              while (tempFormula.length > 2) {
                i++;
                if ((!isNaN(tempFormula[i])) && (!isNaN(tempFormula[i + 1])) && (isNaN(tempFormula[i + 2]))) {
                  if (tempFormula[i + 2] === '+') {
                    tempAnswer = (parseFloat(tempFormula[i]) + parseFloat(tempFormula[i + 1]));
                    tempFormula[i] = tempAnswer;
                    tempFormula.splice(i + 1, 2);
                    i = -1;
                  } else if (tempFormula[i + 2] === '-') {
                    tempAnswer = (parseFloat(tempFormula[i]) - parseFloat(tempFormula[i + 1]));
                    tempFormula[i] = tempAnswer;
                    tempFormula.splice(i + 1, 2);
                    i = -1;
                  } else if (tempFormula[i + 2] === '*') {
                    tempAnswer = (parseFloat(tempFormula[i]) * parseFloat(tempFormula[i + 1]));
                    tempFormula[i] = tempAnswer;
                    tempFormula.splice(i + 1, 2);
                    i = -1;
                  } else if (tempFormula[i + 2] === '/') {
                    if (parseFloat(tempFormula[i + 1]) !== 0) {
                      tempAnswer = (parseFloat(tempFormula[i]) / parseFloat(tempFormula[i + 1]));
                      tempFormula[i] = tempAnswer;
                      tempFormula.splice(i + 1, 2);
                      i = -1;
                    } else {
                      return 'Error - divide by zero';
                      break;
                    }
                  }
                }
              }
              answerOfSolve = tempFormula[0];
              return answerOfSolve;
            }
            outResult = toReversePolishNotation(inVal);

            if (outResult !== 'Error - incorrect formula') {
              result = solveReversePolishNotation(outResult);
            } else {
              result = 'Error - incorrect formula';
            }
            $('#screenOfCalc').text(result);
            symbolsInScreen = '';
          }
        }
      }
    });
    var buttonsClickMode = new ButtonsClickMode();

    $('#screenOfCalc').text('0');
  });
}
steinCalc($(document));