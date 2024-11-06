const cells = 31;

const items = [
    { name: '1', img: 'css/dogsimg/dogs10.webp', chance: 10 },
    { name: '2', img: 'css/dogsimg/dogs2.webp', chance: 15 },
    { name: '3', img: 'css/dogsimg/dogs3.webp', chance: 20 },
    { name: '4', img: 'css/dogsimg/dogs4.webp', chance: 25 },
    { name: '5', img: 'css/dogsimg/dogs5.webp', chance: 5 },
    { name: '6', img: 'css/dogsimg/dogs6.webp', chance: 25 }
];

function getItem() {
    let item;

    while (!item) {
        const chance = Math.floor(Math.random() * 100);

        items.forEach(elm => {
            if (chance < elm.chance && !item) item = elm;
        });
    }

    return item;
}

function generateItems() {
    document.querySelector('.list').remove();
    document.querySelector('.scope').innerHTML = `<ul class="list"></ul>`;

    const list = document.querySelector('.list');

    for (let i = 0; i < cells; i++) {
        const item = getItem();

        const li = document.createElement('li');
        li.setAttribute('data-item', JSON.stringify(item));
        li.classList.add('list__item');
        li.innerHTML = `<img src="${item.img}" alt="" />`;

        list.append(li);
    }
}

generateItems();

let isStarted = false;
let isFirstStart = true;

function start() {
    if (isStarted) return;
    else isStarted = true;

    if (!isFirstStart) generateItems();
    else isFirstStart = false;
    const list = document.querySelector('.list');

    setTimeout(() => {
        list.style.left = '50%';
        list.style.transform = 'translate3d(-50%, 0, 0)';
    }, 0);

    const item = list.querySelectorAll('li')[15];

    list.addEventListener('transitionend', () => {
        isStarted = false;
        item.classList.add('active');
        const data = JSON.parse(item.getAttribute('data-item'));

        console.log(data);
    }, { once: true });
}

document.querySelector('.start').addEventListener('click', function() {
    start();
});