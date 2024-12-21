

const inGameMessage = (type) => {
    switch(type) {
        case 'success':
            return "Pika!";
        case 'fail':
            return "kekeke..."
        case 'won':
            break;
        default:
            return "Let's catch some Pokemons!";
    }
}

export default inGameMessage