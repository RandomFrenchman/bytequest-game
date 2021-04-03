let quest_type = 'multiple_choice';
// multiple_choice, shuffle, input

let questionNumber = 1;
let questionCount = 2;

const input_questions = [
    'I eat an apple.\nJe mange une pomme\n\nI',
    'You eat an apple.\nTu manges une pomme.\n\nYou',
];
const input_solutions = [
    'Je', 'Tu'
]

const shuffle_solution = 'QUESTION';
let shuffle_question = shuffleString(shuffle_solution);

let answer = '';
let choice = 0;
let green_letters = [];

function draw_question() {
    drawOverlay();
    fill(colors.black);
    textAlign(LEFT, TOP);
    text('Quest ' + questionNumber + '/' + questionCount, 2 * tileWidth, 2 * tileHeight + topbarHeight);
    textAlign(RIGHT, TOP);
    text('✕', screenWidth - 2 * tileWidth, 2 * tileHeight + topbarHeight);


    textAlign(CENTER, TOP);
    if (quest_type == 'input') {
        inputBox.position(windowWidth/2 - 90, windowHeight/2 + 90);
    } else if (quest_type == 'shuffle') {
        textSize(36);
        textAlign(LEFT, TOP);
        textFont('Menlo');
        for (var i = 0; i < shuffle_question.length; i++) {
            text(shuffle_question[i], tileWidth*2 + tileWidth*i, 4*tileHeight + topbarHeight);
            text(answer[i], tileWidth*2 + tileWidth*i, 5*tileHeight + topbarHeight);
            text('_', tileWidth*2 + tileWidth*i, 5*tileHeight + topbarHeight);
        }
        fill(colors.green);
        for (var i = 0; i < green_letters.length; i++) {
            index = green_letters[i];
            text(shuffle_question[index], tileWidth*2 + tileWidth*index, 4*tileHeight + topbarHeight);
        }
        fill(colors.black);
        textFont('Helvetica');
    } else if (quest_type == 'multiple_choice') {
        textAlign(LEFT, TOP);
        text('Lorem ipsum dolor sit amet:', tileWidth*2, 6*tileHeight);
        image(images, 2*tileWidth, 7*tileHeight, tileWidth, tileHeight, 0, 0, 16, 16);
        image(images, 4*tileWidth, 7*tileHeight, tileWidth, tileHeight, 16, 0, 16, 16);
        image(images, 6*tileWidth, 7*tileHeight, tileWidth, tileHeight, 32, 0, 16, 16);
        if (choice > 0) {
            textAlign(CENTER, CENTER);
            textFont(16);
            text('✕', 2*(choice + 1.25)*tileWidth, 8.5*tileHeight);
        }
    }

    // Submit button
    textAlign(CENTER, CENTER);
    fill(colors.green);
    rect(2*tileWidth, screenHeight-3*tileHeight, 3*tileWidth, tileHeight);
    fill(colors.white);
    text('Submit', 3.5*tileWidth, screenHeight - 2.5*tileHeight);
}

function keyTyped() {
    if (isLetter(key)) {
        answer = answer + key;
        answer = answer.slice(0, shuffle_solution.length);

        let i = shuffle_question.indexOf(key.toUpperCase());
        if (i > -1) {
            green_letters.push(i);
        }
    }
}

function keyPressed() {
    if (keyCode == BACKSPACE) {
        answer = answer.slice(0, -1);
    }
    choice = 1;
}
