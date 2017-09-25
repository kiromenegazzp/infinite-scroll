'use strict';

let eventsIndex = 0;
let eventsLength;

const showEvent = event => {
    document.body.innerHTML += `<div class="event">
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

    if((window.pageYOffset + window.innerHeight) == scrollHeight) {
        console.log('bingo');

        eventsIndex += 5;
        console.log(eventsIndex);

        fetch('events.json')
            .then(response => {
                return response.text();
            })
            .then(data => {
                let events = JSON.parse(data);
                events = events.slice(eventsIndex, eventsIndex + 5);
                events.forEach(showEvent);
                events.forEach(event => console.log(event.title));

                if(eventsIndex >= eventsLength) {
                    console.log('ended');
                    window.removeEventListener('scroll', infiniteScroll);
                }

            });

    }
};

fetch('events.json')
    .then(response => {
        return response.text();
    })
    .then(data => {
        const events = JSON.parse(data);
        eventsLength = events.length;
        console.log(eventsLength);
        events.length = 5;
        events.forEach(showEvent);
    });

window.addEventListener('scroll', infiniteScroll);
