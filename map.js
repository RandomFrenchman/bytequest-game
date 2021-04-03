const assets = {
    'grass': [3, 0],
    'water': [12, 1],
    'water l': [14, 0],
    'water r': [14, 1],
    'water t': [12, 0],
    'water tl': [11, 0],
    'water tr': [13, 0],
    'water b': [12, 2],
    'water bl': [11, 2],
    'water br': [13, 2],
    'house 1l': [0,21],
    'house 1c': [1,21],
    'house 1r': [2,21],
    'house 2l': [0,22],
    'house 2c': [1,22],
    'house 2r': [2,22],
    'house 3l': [0,23],
    'house 3c': [1,23],
    'house 3r': [2,23],
    'house 4l': [0,24],
    'house 4c': [1,24],
    'house 4r': [2,24],
    'sand': [17, 5],
    'stone': [0, 15],
}

const map = [
    ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water tl', 'water t', 'water t', 'water t', 'water tr', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water l', 'water', 'water', 'water', 'water r', 'grass', 'grass', 'house 1l', 'house 1c', 'house 1r', 'house 1l', 'house 1c', 'house 1r', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water l', 'water', 'water', 'water', 'water r', 'grass', 'grass', 'house 2l', 'house 2c', 'house 2r', 'house 2l', 'house 2c', 'house 2r', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water l', 'water', 'water', 'water', 'water r', 'grass', 'grass', 'house 3l', 'house 3c', 'house 3r', 'house 3l', 'house 3c', 'house 3r', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water l', 'water', 'water', 'water', 'water r', 'grass', 'grass', 'house 4l', 'house 4c', 'house 4r', 'house 4l', 'house 4c', 'house 4r', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water l', 'water', 'water', 'water', 'water r', 'grass', 'grass', 'grass', 'sand', 'stone', 'stone', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'water bl', 'water b', 'water b', 'water b', 'water br', 'grass', 'grass', 'grass', 'sand', 'sand', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'grass', 'grass', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
]

let gameMap = map.map(row => row.map(str => assets[str]));

// Add rows of zeros for the topbar
gameMap.unshift(Array(gameMap[0].length).fill(0));
gameMap.unshift(Array(gameMap[0].length).fill(0));

let mapResolution = {
    height: gameMap.length,
    width: gameMap[0].length
};
