import React, { useState } from 'react';
import { Layer, Rect, Stage, Circle,Group } from "react-konva";
import Konva from 'konva';
import './App.css';

function create_rover_position(position, orientation) {


    return { position, orientation};
}

function create_obstacle(positionob) {


    return { positionob };
}



function deplacer(rover, commande) {

    let actionx = {

        a: { E: 1, O: -1, N: 0, S: 0 },


        r: { E: -1, O: 1, N: 0, S: 0 },

        d: { E: 0, O: 0, N: 0, S: 0 },

        g: { E: 0, O: 0, N: 0, S: 0 },

    };

    let actiony = {

        a: { E: 0, O: 0, N: -1, S: 1 },


        r: { E: 0, O: 0, N: 1, S: -1 },

        d: { E: 0, O: 0, N: 0, S: 0 },

        g: { E: 0, O: 0, N: 0, S: 0 },

    };

    let tab = ['N', 'E', 'S', 'O'];

    let x = tab.indexOf(rover.orientation);

    let sens = { d: 1, g: -1, a: 0, r: 0 };


    let new_orientation = ((x + sens[commande]) + 4) % 4;

    let orientationactuelle = tab[new_orientation];

    let mapx = actionx[commande];

    let mapy = actiony[commande];

    const valeurx = ((rover.position.x + mapx[orientationactuelle]) + 50) % 50;
    const valeury = ((rover.position.y + mapy[orientationactuelle]) + 50) % 50;

    const position = { x: valeurx, y: valeury };

    const orientation = orientationactuelle;


    return { position, orientation };



}

function update(rover, liste_action) {


    var step_move = liste_action.reduce(function (accumulateur, curent_val, index, array) {
        console.log(accumulateur, curent_val);
        return deplacer(accumulateur, curent_val);
    }, rover);


    var last_move = step_move;

    return last_move;

}

function modify_direction(orientation) {


   

    var sens = { 'N': 0, 'E': 1, 'S': 2, 'O':3  };

    var x = sens[orientation];


    return x;

}

function encaspsulation(val,rover) {


    let liste_deplacement = val.split("");



    return update(rover, liste_deplacement);

}

function App() {



    let x1 = 30;
    let y1 = 40;
    let positionob = { x: x1, y: y1 };

    const obstacle = create_obstacle(positionob);

    let absice = Math.floor(Math.random() * 50);

    let ordonne = Math.floor(Math.random() * 50);

    let position = { x: absice, y: ordonne };

    let orientationtab = ['N', 'E', 'S', 'O'];

    let nbr = Math.floor(Math.random() * 3);


    const [sens, setSens] = useState(nbr);


    let orientation = orientationtab[sens];

    const command = [];
    const [state, setState] = useState(command);

    const rover = create_rover_position(position, orientation);

    const [nextrover, setRover] = useState(rover);




    

    let direction = [0, 90, 180, 270]; 

   

    return (

        <div>
            <nav>
                <form align="center">

                    <label> Entrer une serie de deplacement : a pour avancer , r pour reculer , d pour droite , g pour gauche </label>
                    <input

                        type="text"
                        id="liste_action"
                        value={state}
                        onChange={(command) => setState(command.target.value)} 
                        

                    />
                    <input type="button" value="Deplacer" onClick={() => { console.log((modify_direction(nextrover.orientation))); setSens(modify_direction(nextrover.orientation)); setRover( encaspsulation(state,nextrover))}} />


                </form>
            </nav>
            <br></br>
            <br></br>
           
            <table width={800}
                height={800}
                border={2}
                align="center"
                
    
            >
                
                <thead >
    <Stage
          
          className="canvas"
                        width={800}
                        height={800}
          
         
        >

            
            
                        <Layer >

                            <Rect

                                width={40}
                                height={40}
                                x={obstacle.positionob.x * 16}
                                y={obstacle.positionob.y * 16}

                                fill="red"



                            />


                            <Group rotation={direction[sens]} x={nextrover.position.x * 16} y={nextrover.position.y * 16} >

                        <Rect

                            width={50}
                            height={50}
                            x={0}
                            y={0}
                           
                            fill="black"
                            


                        />

                    <Circle

                        x={0 + 25}
                        y={0}
                        radius={25}
                        fill="black"
                        
  
                   
                    />

                    </Group>
                
</Layer>

         
          
    
                </Stage>
                    </thead>
                </table>
            </div>
           
            
  );
};

export default App;
