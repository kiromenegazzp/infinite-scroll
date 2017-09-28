'use strict';

let eventsIndex = 0;
let eventsLength;
const container = document.querySelector('.container');

const showEvent = event => {
    container.innerHTML += `<div class="event">
                                <h2 class="event__title">Название: ${event.title}</h2>
                                <p class="event__price">Цена: ${event.price}</p>
                                <p class="event__date">Дата: ${event.datetime}</p>
                            </div>`;
};

const infiniteScroll = () => {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    const spinner = document.querySelector('.spinner');

    if((window.pageYOffset + window.innerHeight) == scrollHeight) {
        console.log('bingo');

        eventsIndex += 5;
        console.log(eventsIndex);

        spinner.classList.remove('hidden');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'events.json', true);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(`${xhr.status} : ${xhr.statusText}`);
            } else {
                let events = JSON.parse(xhr.responseText);
                events = events.slice(eventsIndex, eventsIndex + 5);
                events.forEach(showEvent);
                events.forEach(event => console.log(event.title));
                spinner.classList.add('hidden');

                if(eventsIndex >= eventsLength) {
                    console.log('ended');
                    window.removeEventListener('scroll', infiniteScroll);
                }
            }
        };

    }
};


const xhr = new XMLHttpRequest();
xhr.open('GET', 'events.json', true);
xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
        alert(`${xhr.status} : ${xhr.statusText}`);
    } else {
        const events = JSON.parse(xhr.responseText);
        eventsLength = events.length;
        console.log(eventsLength);
        events.length = 5;
        events.forEach(showEvent);
    }
};

window.addEventListener('scroll', infiniteScroll);
