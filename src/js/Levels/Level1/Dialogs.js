import { Assets, Sprite } from "pixi.js"

const avatars = [
    `/src/Assets/Avatars/1.png`
]

export const dialogs = [
    {   
        greet: "– Добрый вечер, я сегодня на даче была, поливала, полола, траву косила, ох-ох, так устала.. Полезла я значит на чердак, еле-еле забралась, муж по пьяни ногу сломал, пусть ему пусто будет! Всё самой приходится делать теперь. Так вот, а там гнездо! Осиное! Я взяла вилы и давай гнездо сбивать, ну одна, зараза укусила все-таки!",
        avatar: avatars[0],
        conversation: new Map([
            ["Сколько лет Вашему сыну?", "32 годика"],
            ["Сколько дней держится температура?", "Рано утром поднялась в 5:32"],
            ["Какие еще симптомы у вашего сына?", "Небольшой кашель и насморк"],
        ]),
        accept: "Вызов принят, ожидайте бригаду скорой помощи",
        decline: "По этому вопросу обращайтесь в поликлиннику, до свидания",
        timeToSave: 120000
    },
    {   
        greet: "Здравствуйте, моему сыночку плохо, температура 38,5! Скорее приезжайте!",
        avatar: avatars[0],
        conversation: new Map([
            ["Сколько лет Вашему сыну?", "32 годика"],
            ["Сколько дней держится температура?", "Рано утром поднялась в 5:32"],
            ["Какие еще симптомы у вашего сына?", "Небольшой кашель и насморк"],
        ]),
        accept: "Вызов принят, ожидайте бригаду скорой помощи",
        decline: "По этому вопросу обращайтесь в поликлиннику, до свидания",
        timeToSave: 0
    },
]