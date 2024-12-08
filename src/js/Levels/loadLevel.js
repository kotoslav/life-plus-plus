import Level1 from "./Level1/Level1";

export default function loadLevel(level, entities) {
    switch(level) {
        case 'level1':
            return new Level1(entities);
            break;
        default:
            console.log('Не выбран уровень!')
            return new Level1(entities);
    }
}