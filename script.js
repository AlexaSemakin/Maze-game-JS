document.onkeydown = checkKey;
window.onresize = checkSize;

let point_now = [0, 0],
    elements = [],
    go_to_vector = [],
    map = [],
    value = [],
    go_to = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ],
    hfinish = 0,
    finish = [],
    visyble_arrow = true,
    coins = 0,
    score = new Map(),
    widthLab = 320,
    minBlocks = 20,
    sizeBlock = 10,
    coinsPoints = new Set();

function setCharaterPoint(x, y) {
    document.getElementById("character").style = "left: " + (x * (sizeBlock + 6) + 5).toString() + "px; top: " + (y * (sizeBlock + 6) + 5).toString() + "px; " + "height: " + sizeBlock + "px; width: " + sizeBlock + "px;";
    if (y * (sizeBlock + 6) + 5 > 160) {
        document.getElementById('laberint').scrollTop = y * (sizeBlock + 6) + 5 - 160;
    } else {
        document.getElementById('laberint').scrollTop = 0;
    }
    if (x * (sizeBlock + 6) + 5 > 160) {
        document.getElementById('laberint').scrollLeft = x * (sizeBlock + 6) + 5 - 160;
    } else {
        document.getElementById('laberint').scrollLeft = 0;
    }
    if (x == finish[1] && y == finish[0]) {
        console.log(x, y);
        coins += Math.trunc(hfinish * hfinish / 10);
        next_lab();
    }
}

function to_top() {
    if (map[point_now[1]][point_now[0]][0] == 0) {
        point_now[1]--;
    }
    setCharaterPoint(point_now[0], point_now[1]);
}

function to_bottom() {
    if (map[point_now[1]][point_now[0]][2] == 0) {
        point_now[1]++;
    }
    setCharaterPoint(point_now[0], point_now[1]);
}

function to_left() {
    if (map[point_now[1]][point_now[0]][3] == 0) {
        point_now[0]--;
    }
    setCharaterPoint(point_now[0], point_now[1]);
}

function to_right() {
    if (map[point_now[1]][point_now[0]][1] == 0) {
        point_now[0]++;
    }
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

function checkSize(e) {
    widthLab = 320;
    minBlocks = 20;
}

function checkKey(e) {
    e = e || window.event;
    console.log(e.keyCode);
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
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generate(type = -1) {
    let val = map.length;
    if (map.length == 0) {
        val = 20;
    }
    if (type == 1) {
        val = parseInt(document.getElementById('size_lab_textbox').value);
    }
    document.getElementById("display").innerHTML = "";
    clear_var();
    if (val < minBlocks) {
        sizeBlock = widthLab / val - 6;
    } else {
        sizeBlock = 10;
    }
    document.getElementById('laberint').style = "height: " + widthLab + "px; width: " + widthLab + "px;";
    start(val);
}

function clear_var() {
    map = [];
    value = [];
    hfinish = 0;
    finish = [];
}

async function generete_interface() {
    setCharaterPoint(0, 0);
    point_now = [0, 0];
    document.getElementById("display").innerHTML = "";
    for (let i = 0; i < map.length; i++) {
        const array = map[i];
        for (let j = 0; j < array.length; j++) {
            const item = array[j];
            let block_image = document.createElement("div");
            block_image.className = "imageBlock";
            document.getElementById("display").append(block_image);
            let style = "";
            let color_border = "black";
            let color_not_border = "transparent";
            style += "position: absolute; ";
            style += "display: inline-block; ";
            style += "top: " + (i * (sizeBlock + 6)).toString() + "px; ";
            style += "left: " + (j * (sizeBlock + 6)).toString() + "px; ";
            style += "height: " + (sizeBlock).toString() + "px; ";
            style += "width: " + ((sizeBlock)).toString() + "px; ";
            if (i == finish[0] && j == finish[1]) {
                block_image.classList.add("coin");
            } else {
                style += "background-color: transporate; ";
            }
            style += "border-width: 3px; border-style: solid; border-color: ";
            for (let i = 0; i < 4; i++) {
                style += (item[i] == 1) ? " " + color_border : " " + color_not_border;
            }
            block_image.style = style + "; ";
        }
    }

    let block_image = document.createElement("div");
    block_image.className = "imageBlock";
    document.getElementById("display").append(block_image);
    let style = "";
    style += "position: absolute; ";
    style += "display: inline-block; ";
    style += "top: " + (map.length * (sizeBlock + 6)).toString() + "px; ";
    style += "left: " + (map.length * (sizeBlock + 6)).toString() + "px; ";
    style += "height: " + (5).toString() + "px; ";
    style += "width: " + (5).toString() + "px; ";
    style += "background-color: transporate; ";
    block_image.style = style;

}

function getNum(a, b) {
    a |= 1 << b;
    return a;
}

function SetCoinsValue() {
    document.getElementById("CoinsText").innerHTML = "<div style='display: block; text-align: left; '>Coins: " + getCountMoney(coins) + " <div style = 'margin: 1px 0px; height: 15px; width: 15px;' id='_coin'></div></div> " +
        "<div style='display: block; text-align: left; '> Size: " + (map.length).toString() + " </div>" +
        "<div style='display: block; text-align: left; '>Score: " + score.get(map.length).toString() + "</div>";
}

function start(n) {
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
    generete_interface();
    if (score.get(map.length) == undefined) {
        score.set(map.length, 0);
    }
    SetCoinsValue();
}

function generateCoins() {
    for (let i = 0; i < Math.sqrt(map.length); i++) {
        let item = [getRandomInt(map.length), getRandomInt(map.length)];
        if (!coinsPoints.has(item)) {
            coinsPoints.add(item);
        }
    }
    for (let item of coinsPoints) {
        let block_image = document.createElement("div");
        block_image.className = "coin";
        document.getElementById("display").append(block_image);
        let style = "";
        style += "position: absolute; ";
        style += "display: inline-block; ";
        style += "top: " + (item[0] * (sizeBlock + 6)).toString() + "px; ";
        style += "left: " + (item[1] * (sizeBlock + 6)).toString() + "px; ";
        style += "height: " + (5).toString() + "px; ";
        style += "width: " + (5).toString() + "px; ";
        style += "background-color: transporate; ";
        block_image.style = style;
    }
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

function dfs(startPoint, n) {
    var stack = [];
    stack.push([
        startPoint, [-1, -1], 0
    ]);
    while (stack.length > 0) {
        let stackElement = stack.pop();
        let nowX = stackElement[0][0];
        let nowY = stackElement[0][1];
        let wasX = stackElement[1][0];
        let wasY = stackElement[1][1];
        if (map[nowX][nowY].length == 0) {
            map[nowX][nowY] = [0, 0, 0, 0];
            value[nowX][nowY] = stackElement[2];
            if (stackElement[2] > hfinish) {
                hfinish = stackElement[2];
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

//поставить парные
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


//сгенерировать новый лаберинт
function next_lab() {
    if (score.get(map.length) == undefined) {
        score.set(map.length, 1);
    } else {
        score.set(map.length, score.get(map.length) + 1);
    }
    SetCoinsValue();
    generate();
}

// получить зеркальное направление стены
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

function buy_scin(id) {
    if (coins >= 200000) {
        let classnow = document.getElementById('character').className;
        let classscin = document.getElementById('scin' + id.toString()).className;
        document.getElementById('scin' + id.toString()).classList = classnow;
        document.getElementById('character').className = classscin;
        document.getElementById('_character').className = classscin;
        coins -= 200000;
        SetCoinsValue();
    }
}

function getCountMoney(count) {
    if (count < 1000) {
        return count.toString();
    } else if (count < 1000000) {
        return Math.round(count / 1000).toString() + "K";
    } else if (count < 1000000000) {
        return Math.round(count / 1000000).toString() + "M";
    } else {
        return Math.round(count / 1000000000).toString() + "B";
    }
}