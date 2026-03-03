import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners';

const getSystemListURL = ""

function Home() {
    const [_error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [gameCards, setGameCards] = useState(<></>);

    // useEffect(() => {
    //     console.log('useEffect Home');
    //     fetch(getGameListURL)
    //         .then(response => response.json())
    //         .then(
    //             data => {
    //                 console.log(data);
    //                 setLoading(false);
    //                 setGameCards(data.map((game, index) =>
    //                     <GameCard
    //                         index={index}
    //                         id={game.ID}
    //                         title={game.Title}
    //                         image={game.ImageIcon}
    //                     />
    //                 ));
    //             },
    //             error => {
    //                 console.log(error)
    //                 setError(true);
    //                 setLoading(false);
    //             }
    //         )
    // }, []) // Rate limiting array

    return (<div>
        <p>This is the home page. Under construction.</p>
        <p>How did you get here, anyway?</p>
        <p>Psst, the key is {import.meta.env.VITE_RA_KEY}.</p>
    </div>)
}

export default Home