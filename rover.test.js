

function create_rover(rover) {


    return {rover};

}

function create_rover_position(position, orientation) {


    return { position, orientation };
}


function updateorientation(rover, commande) {

    let orientation = ['N', 'E', 'S', 'O'];

    let x = orientation.indexOf(rover.orientation);

    let sens = { d: 1, g: -1 };


    let new_orientation = ((x + sens[commande]) + 4) % 4;

    let orientationactuelle = orientation[new_orientation];

    return { ...rover, orientationactuelle };

}

test('test creation rover', () => {

    let rover = { x: 0, y: 0 };

    let test = create_rover(rover);

    expect(test).toEqual({ rover: { x: 0, y: 0 } });
    
   
}
);

test('test creation rover avec position ', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'N';

    let test = create_rover_position(position,orientation);

    expect(test).toEqual({ position: { x: 0, y: 0 }, orientation: 'N' });
    


}
);
test('test_coordonnée et position aléatoire du rover', () => {

    let absice = Math.floor(Math.random() * 50);

    let ordonne = Math.floor(Math.random() * 50);

    let position = { x: absice, y: ordonne };

    let orientationtab = ['N', 'E', 'S', 'O'];

    let orientation = orientationtab[Math.floor(Math.random() * 3)];


    let test = create_rover_position(position, orientation);

    expect(test.position.x <= 50).toEqual(true);
    expect(test.position.y <= 50).toEqual(true);
    expect(test.orientation == orientation).toEqual(true);
   

}
);






test('passer de N à E en tournant à droite d', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleorientation = updateorientation(rover,'d');

    expect(nouvelleorientation.orientationactuelle).toEqual('E');
    
   



});

test('passer de N à O en tournant à gauche g', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleorientation = updateorientation(rover, 'g');

    expect(nouvelleorientation.orientationactuelle).toEqual('O');





});

test('passer de E à N en tournant à gauche g', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'E';

    const rover = create_rover_position(position, orientation);


    const nouvelleorientation = updateorientation(rover, 'g');

    expect(nouvelleorientation.orientationactuelle).toEqual('N');





});

function deplacer(rover,commande) {

    let actionx = {

        a : { E: 1, O: -1, N: 0, S: 0 },


        r: { E: -1, O: 1, N: 0, S: 0 },

        d: { E: 0, O: 0, N: 0, S: 0 },

        g: { E: 0, O: 0, N: 0, S: 0 },

    };

    let actiony = {

        a : { E: 0, O: 0, N: 1, S: -1 },


        r: { E: 0, O: 0, N: -1, S: 1 },

        d: { E: 0, O: 0, N: 0, S: 0 },

        g: { E: 0, O: 0, N: 0, S: 0 },

    };

    let tab = ['N', 'E', 'S', 'O'];

    let x = tab.indexOf(rover.orientation);

    let sens = { d: 1, g: -1 , a: 0, r: 0};


    let new_orientation = ((x + sens[commande]) + 4) % 4;

    let orientationactuelle = tab[new_orientation];

    let mapx = actionx[commande];

    let mapy = actiony[commande];

    const valeurx = ((rover.position.x + mapx[orientationactuelle]) + 50) % 50;
    const valeury = ((rover.position.y + mapy[orientationactuelle]) + 50) % 50;

    const position = { x: valeurx, y: valeury };

    const orientation = orientationactuelle;


    return { position,orientation };



}


test('avancer  en étant à E avec le rover à la  position x:0 , y:0  on doit avoir comme resultat x:1 y:0', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'E';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'a');

    expect(nouvelleposition.position).toEqual({ x: 1, y: 0 });
    expect(nouvelleposition.orientation).toEqual("E");





});

test('avancer  en étant à O avec le rover à la  position x:0 , y:0  on doit avoir comme resultat x:49 y:0', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'O';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'a');

    expect(nouvelleposition.position).toEqual({ x: 49, y: 0 });
    expect(nouvelleposition.orientation).toEqual("O");




});

test('avancer  en étant à E avec le rover à la  position x:49 , y:0  on doit avoir comme resultat x:0 y:0', () => {

    let position = { x: 49, y: 0 };

    let orientation = 'E';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'a');

    expect(nouvelleposition.position).toEqual({ x: 0, y: 0 });
    expect(nouvelleposition.orientation).toEqual("E");






});

test('avancer  en étant à N avec le rover à la  position x:0 , y:0  on doit avoir comme resultat x:0 y:1', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'a');

    expect(nouvelleposition.position).toEqual({ x: 0, y: 1 });
    expect(nouvelleposition.orientation).toEqual("N");





});


test('avancer  en étant à N avec le rover à la  position x:0 , y:49  on doit avoir comme resultat x:0 y:0', () => {

    let position = { x: 0, y: 49 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'a');

    expect(nouvelleposition.position).toEqual({ x: 0, y: 0 });
    expect(nouvelleposition.orientation).toEqual("N");





});

test('reculer  en étant à N avec le rover à la  position x:0 , y:0  on doit avoir comme resultat x:0 y:49', () => {

    let position = { x: 0, y:0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover,'r');

    expect(nouvelleposition.position).toEqual({ x: 0, y: 49 });
    expect(nouvelleposition.orientation).toEqual("N");





});

test('reculer  en étant à O avec le rover à la  position x:0 , y:0  on doit avoir comme resultat x:1 y:0', () => {

    let position = { x: 0, y: 0 };

    let orientation = 'O';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = deplacer(rover, 'r');

    expect(nouvelleposition.position).toEqual({ x: 1, y: 0 });
    expect(nouvelleposition.orientation).toEqual( "O" );





});

function update(rover, liste_action) {


    var step_move = liste_action.reduce(function (accumulateur, curent_val, index, array) {
        console.log(accumulateur, curent_val);
        return deplacer(accumulateur, curent_val);
    },rover);


    var last_move = step_move;

    return last_move;

}

test('serie daction avance 3 fois en étant au N avec le rover à la  position x:0 , y:0  , on doit avoir comme resultat x:0 y:3 orientation N', () => {

    let Liste_action = ["a", "a", "a"];


    let position = { x: 0, y: 0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = update(rover, Liste_action);

    expect(nouvelleposition.position).toEqual({ x: 0, y: 3 });
    expect(nouvelleposition.orientation).toEqual("N");





});

test('serie daction avance 2 fois ,puis oriente toi vers la droite et recule 1 fois en étant au N avec le rover à la  position x:0 , y:0  , on doit avoir comme resultat x:49 y:2 orientation O', () => {

    let Liste_action = [ "a","a","d","r"];


    let position = { x: 0, y: 0 };

    let orientation = 'N';

    const rover = create_rover_position(position, orientation);


    const nouvelleposition = update(rover, Liste_action);

    expect(nouvelleposition.position).toEqual({ x: 49, y: 2 });
    expect(nouvelleposition.orientation).toEqual("E");





});

function create_obstacle(obstacle) {

    const x = obstacle.x;

    const y = obstacle.y;

    return {x,y};

}



test('creer obstacle à la position x : 1 y: 3 ', () => {

    const obstacle = { x: 1, y: 3 };

    const position_obstacle = create_obstacle(obstacle);

    expect(position_obstacle).toEqual({ x: 1, y: 3 });

});









