let sizeBlock = [10, 10];

document.onkeydown = checkKey;

function setCharaterPoint(x, y) {
    document.getElementById("character").style = "left: " + (x * (sizeBlock[0] + 6) + 5).toString() + "px; top: " + (y * (sizeBlock[1] + 6) + 5).toString() + "px;";
    if (x == finish[1] && y == finish[1]) {
        alert('ФИНИШ');
        generate();
    }
}

function to_top() {
    if (map[point_now[1]][point_now[0]][0] == 0) {
        point_now[1]--;
    }
    to_go_point();
}

function to_bottom() {
    if (map[point_now[1]][point_now[0]][2] == 0) {
        point_now[1]++;
    }
    to_go_point();
}

function to_left() {
    if (map[point_now[1]][point_now[0]][3] == 0) {
        point_now[0]--;
    }
    to_go_point();
}

function to_right() {
    if (map[point_now[1]][point_now[0]][1] == 0) {
        point_now[0]++;
    }
    to_go_point();
}

function to_go_point() {
    setCharaterPoint(point_now[0], point_now[1]);
}

function change_visible_text() {
    if (document.getElementById('checkbox-visible-text').checked) {
        document.getElementById("button_top").className = "visible_text";
    } else {
        document.getElementById("button_top").className = "non_visible_text";
    }
    if (document.getElementById('checkbox-visible-text').checked) {
        document.getElementById("button_left").className = "visible_text";
    } else {
        document.getElementById("button_left").className = "non_visible_text";
    }
    if (document.getElementById('checkbox-visible-text').checked) {
        document.getElementById("button_bottom").className = "visible_text";
    } else {
        document.getElementById("button_bottom").className = "non_visible_text";
    }
    if (document.getElementById('checkbox-visible-text').checked) {
        document.getElementById("button_right").className = "visible_text";
    } else {
        document.getElementById("button_right").className = "non_visible_text";
    }
}

function checkKey(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            e.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }
    if (e.keyCode == '38') {
        to_top();
    } else if (e.keyCode == '40') {
        to_bottom();
    } else if (e.keyCode == '37') {
        to_left();
    } else if (e.keyCode == '39') {
        to_right();
    }
    to_go_point()
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let point_now = [0, 0];
let elements = [];
let go_to_vector = [];
let map = [];
let value = [];
let go_to = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
let hfinifh = 0;
let finish = [];
let visyble_arrow = true;

function generate() {
    let val = parseInt(document.getElementById('size_lab_textbox').value);
    document.getElementById("display").innerHTML = "";
    map = [];
    start(val);
}

function restart_generate() {
    n = map.length;
    map = [];
    value = [];
    start(n);
}

async function generete_interface() {
    setCharaterPoint(0, 0);
    point_now = [0, 0];
    document.getElementById("display").innerHTML = "";
    let i = 0,
        j = 0;
    map.forEach(array => {
        array.forEach(item => {
            let block_image = document.createElement("div");
            block_image.className = "imageBlock";
            document.getElementById("display").append(block_image);
            let style = "";
            let color_border = "black";
            let color_not_border = "transparent";
            if (item[0] == 1) {
                style += "border-top: 3px solid " + color_border + "; ";
            } else {
                style += "border-top: 3px solid " + color_not_border + "; ";
            }
            if (item[1] == 1) {
                style += "border-right: 3px solid " + color_border + "; ";
            } else {
                style += "border-right: 3px solid " + color_not_border + "; ";
            }
            if (item[2] == 1) {
                style += "border-bottom: 3px solid " + color_border + "; ";
            } else {
                style += "border-bottom: 3px solid " + color_not_border + "; ";
            }
            if (item[3] == 1) {
                style += "border-left: 3px solid " + color_border + "; ";
            } else {
                style += "border-left: 3px solid " + color_not_border + "; ";
            }
            if (i == finish[0] && j == finish[1]) {
                style += "background-color: green; "
                console.log([i, j]);
            }
            block_image.style = style;
            j++;
        });
        document.getElementById("display").innerHTML += "<br>";
        i++;
        j = 0;
    });
}

function generate_go_to_vector(count) {
    elements = [];
    go_to_vector = [];
    for (let i = 0; i < count; i++) {
        elements.push(i);
    }
    while (go_to_vector.length < 4) {
        let index = getRandomInt(elements.length);
        let element = elements[index];
        go_to_vector.push(element);
        elements.splice(index, 1);
    }
}

function getNum(a, b) {
    a |= 1 << b;
    return a;
}


function dfs(startPoint, n) {
    var stack = [];
    stack.push([
        startPoint, [-1, -1], 0
    ]);
    value[startPoint[0]][startPoint[1]] = 0;
    while (stack.length > 0) {
        let stackElement = stack.pop();
        let nowX = stackElement[0][0];
        let nowY = stackElement[0][1];
        let wasX = stackElement[1][0];
        let wasY = stackElement[1][1];
        if (map[nowX][nowY].length == 0) {
            map[nowX][nowY] = [0, 0, 0, 0];
            value[nowX][nowY] = stackElement[2];
            if (value[nowX][nowY] > hfinifh) {
                hfinifh = value[nowX][nowY];
                finish = [nowX, nowY]
            }
            generate_go_to_vector(go_to.length);
            go_to_vector.forEach(item => {
                let toX = nowX + go_to[item][0];
                let toY = nowY + go_to[item][1];
                if (toX != wasX || toY != wasY) {
                    if ((toX < 0) || (toX >= n) || (toY < 0) || (toY >= n) || map[toX][toY].length > 0) {
                        map[nowX][nowY][item] = 1;
                    } else {
                        stack.push([
                            [toX, toY],
                            [nowX, nowY],
                            stackElement[2] + 1
                        ]);
                    }
                }
            });
        }
    }
}

function makeWals() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            for (let k = 0; k < go_to.length; k++) {
                let toX = i + go_to[k][0];
                let toY = j + go_to[k][1];
                if (map[i][j][k] == 0 && (toX >= 0) && (toX < map.length) && (toY >= 0) && (toY < map.length) && map[toX][toY][getMirorItem(k)] == 1) {
                    map[i][j][k] = 1;
                }
            }
        }
    }
}

function getMirorItem(index) {
    if (index == 0) {
        return 2;
    }
    if (index == 2) {
        return 0;
    }
    if (index == 1) {
        return 3;
    }
    if (index == 3) {
        return 1;
    }
}

function start(n, m) {
    for (let i = 0; i < n; i++) {
        value.push([]);
        map.push([]);
        for (let j = 0; j < n; j++) {
            map[i].push([]);
            value[i].push([]);
        }
    }
    dfs([0, 0], n);
    makeWals();
    console.log('generated success');
    generete_interface();
    console.log('image generated success');
    console.log(value);
}