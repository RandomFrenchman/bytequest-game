let aspectRatio;
let screenHeight, screenWidth;
let sprites;
let tileHeight, tileWidth;
let topbarHeight;

let health = 100;
let experience = 0;

// States
let showGameOnly = true;
let showQuest = false;
let showQuestion = false;

const colors = {
    black: '#000',
    green: '#3c3',
    grey: '#ccc',
    prune: '#63003c',
    red: '#c33',
    sand: '#fea',
    white: '#fff',
}

function preload() {
    sprites = loadImage('assets/serene-village.png');
    images = loadImage('assets/images.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setDimensions();
    noSmooth();

    inputBox = createInput('');
    textFont('Helvetica');
}

function drawOverlay() {
    fill('#000a');
    rect(0, topbarHeight, screenWidth, screenHeight - topbarHeight);
    fill(colors.sand);
    rect(
        tileWidth,
        tileHeight + topbarHeight,
        screenWidth - 2 * tileWidth, screenHeight - 2 * tileHeight - topbarHeight
    );
}

function draw() {
    inputBox.position(-10000, 10000);
    // Fill the background
    fill(0);
    rect(0, 0, windowWidth, windowHeight);

    translate(
        (windowWidth - screenWidth) / 2,
        (windowHeight - screenHeight) / 2,
    );
    // Draw the map
    for (var i = 0; i < mapResolution.height; i++) {
        for (var j = 0; j < mapResolution.width; j++) {
            image(sprites, j * tileWidth, i * tileHeight, tileWidth, tileHeight, 16 * 3, 0, 16, 16); // Background tile
            image(sprites, j * tileWidth, i * tileHeight, tileWidth, tileHeight, 16 * gameMap[i][j][0], 16 * gameMap[i][j][1], 16, 16); // Map tile
        }
    }
    // Draw the UI
    fill(colors.prune);
    noStroke();
    rect(0, 0, screenWidth, topbarHeight); // Topbar
    fill(colors.grey);
    for (var i = 1; i <= 3; i++) {
        // UI buttons (inventory, settings and avatar)
        rect(screenWidth - 1.5 * i * tileWidth, screenHeight - 1.5 * tileHeight, tileWidth, tileHeight);
    }
    // Health bar
    stroke(colors.red);
    noFill();
    rect(tileWidth, tileHeight, tileWidth * 12, 6, 12);
    textSize(24);
    fill(colors.red);
    rect(tileWidth, tileHeight, health / 100 * tileWidth * 12, 6, 12);
    // Experience bar
    stroke(colors.green);
    noFill();
    rect(tileWidth, .5 * tileHeight, tileWidth * 12, 6, 12);
    textSize(24);
    fill(colors.green);
    rect(tileWidth, .5 * tileHeight, experience / 100 * tileWidth * 12, 6, 12);
    noStroke();
    // Draw the quest
    if (showQuest) {
        drawOverlay();
        // Draw buttons
        textAlign(CENTER, CENTER);
        fill(colors.red);
        rect(2 * tileWidth, screenHeight - 3 * tileHeight, 3 * tileWidth, tileHeight);
        fill(colors.white);
        text('Decline', 3.5 * tileWidth, screenHeight - 2.5 * tileHeight);
        fill(colors.green);
        rect(6 * tileWidth, screenHeight - 3 * tileHeight, tileWidth * 3, tileHeight);
        fill(colors.white);
        text('Accept', 7.5 * tileWidth, screenHeight - 2.5 * tileHeight);

        // Draw the main text
        textAlign(LEFT, TOP);
        fill(colors.black)
        text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, felis at aliquet efficitur, eros augue pulvinar sem, vitae luctus massa lectus ac lectus. Nunc venenatis mauris eget nunc rutrum imperdiet. Nam dignissim sit amet nisl eu luctus. Cras suscipit orci ex, ut venenatis eros egestas maximus.',
            2 * tileWidth,
            2 * tileHeight + topbarHeight,
            screenWidth - 4 * tileWidth,
            screenHeight - 8 * tileHeight
        );
    }
    // Draw the question
    if (showQuestion) {
        draw_question();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setDimensions();
}

function setDimensions() {
    var factor = min(windowHeight / mapResolution.height, windowWidth / mapResolution.width);
    factor = Math.ceil(factor);
    screenWidth = mapResolution.width * factor;
    screenHeight = mapResolution.height * factor;
    tileWidth = screenWidth / mapResolution.width;
    tileHeight = screenHeight / mapResolution.height;
    topbarHeight = tileHeight * 2;
}

// Event
function isMouseInTile(x, y) {
    // TODO: Check consistency with map coordinates
    correctedMouseX = mouseX - (windowWidth - screenWidth) / 2;
    correctedMouseY = mouseY - (windowHeight - screenHeight) / 2;
    return (
        x * tileWidth <= correctedMouseX && (x + 1) * tileWidth >= correctedMouseX
        && y * tileHeight <= correctedMouseY && (y + 1) * tileHeight >= correctedMouseY
    );
}

function isMouseInButton(x, y) {
    return isMouseInTile(x, y) || isMouseInTile(x + 1, y) || isMouseInTile(x + 2, y);
}

function mouseClicked() {
    if (showGameOnly && isMouseInTile(10, 8)) {
        showQuest = true;
        showGameOnly = false;
    }
    if (showQuest) {
        if (isMouseInButton(2, mapResolution.height - 3)) {
            showQuest = false;
            showGameOnly = true;
        } else if (isMouseInButton(6, mapResolution.height - 3)) {
            showQuest = false;
            showQuestion = true;
            
            answer = '';
            choice = 0;
        }
    }
    if (showQuestion) {
        if (isMouseInTile(mapResolution.width - 3, 4)) {
            showQuestion = false;
            showGameOnly = true;
        }
        if (isMouseInButton(2, mapResolution.height - 3)) {
            if (inputBox.value() != solutions[questionNumber - 1]) {
                health = max(0, health - 10);
            } else {
                questionNumber += 1;
                inputBox.value('');

                if (questionNumber == questionCount + 1) {
                    showQuestion = false;
                    showGameOnly = true;

                    experience += 20;
                }
            }
        }
    }
}
