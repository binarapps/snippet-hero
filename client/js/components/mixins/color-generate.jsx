import Colors from 'material-ui/lib/styles/colors';

let random = function(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let colors = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green',
              'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'grey'];
let letters = 'ABCDEFGHIJKLMNOQPRSTUW';
let intensity = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
let generateColor = function() {
  return Colors[random(colors) + random(intensity)];
}

let generateLetter = function() {
  return random(letters);
}

export {generateColor, generateLetter};
