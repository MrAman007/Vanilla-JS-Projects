const budget = {
    inc: 0,
    exp: 0,
    total: 0
}

var formatNumber = function (num, type) {
    var numSplit, int, dec, type;
    /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands

        2310.4567 -> + 2,310.46
        2000 -> + 2,000.00
        */

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
    }

    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

};
function updateBudget(type, value) {
    if (type === 'inc') {
        budget.inc += value;
        budget.total = budget.inc - budget.exp;
    } else {
        budget.exp += value;
        budget.total = budget.inc - budget.exp;
    }
}

function updateUI() {
    let inc = formatNumber(budget.inc, 'inc');
    let exp = formatNumber(budget.exp, 'exp');
    let total;
    if (budget.inc - budget.exp < 0) {
        total = formatNumber(budget.total, 'exp');
    } else {
        total = formatNumber(budget.total, 'inc');
    }
    document.getElementById('balance-value').textContent = total;
    document.getElementById('income-value').textContent = inc;
    document.getElementById('expense-value').textContent = exp;
}

function addListItem(obj) {
    let value = formatNumber(obj.value, obj.type);
    if (obj.type === 'inc') {
        let html =
            '<div class="income-item"><span class="desc-span">%desc%</span><span class="value-span">%value%</span></div>';
        let newhtml = html.replace("%desc%", obj.desc);
        newhtml = newhtml.replace("%value%", value);

        document
            .querySelector(".income-display-right-list")
            .insertAdjacentHTML("beforeend", newhtml);
    } else {
        let html = '<div class="expense-item"><span class="desc-span">%desc%</span><span class="value-span">%value%</span></div>';
        let newhtml = html.replace('%desc%', obj.desc);
        newhtml = newhtml.replace('%value%', value);

        document
            .querySelector(".expense-display-right-list")
            .insertAdjacentHTML("beforeend", newhtml);

    }

}

function clearField(descDOM, valueDOM) {
    descDOM.value = '';
    valueDOM.value = '';
}


function newEntry() {
    const operatorDOM = document.getElementById("operator");
    const descDOM = document.getElementById("description");
    const valueDOM = document.getElementById("value");

    const obj = {
        type: operatorDOM.value,
        desc: descDOM.value,
        value: parseFloat(valueDOM.value),
    };

    clearField(descDOM, valueDOM);
    if (obj.value > 0 && obj.desc.length > 0) {
        addListItem(obj);
        updateBudget(obj.type, obj.value);
        updateUI();
    }

}


//SUBMIT BUTTON
document.getElementById("submit").addEventListener("click", (event) => {
    newEntry();
});

//ENTER KEY
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        newEntry();
    }
});



// const html = '<div class="income-item"><span class="desc-span">%desc%</span><span class="value-span">$%value%</span><span class="cross-span">X</span></div>';
