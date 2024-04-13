import React, {useState} from 'react';
import './home.scss';
import CardStack from "../../components/card-stack";

const Home = () => {
    const [numPlayers, setNumPlayers] = useState('');
    const [distribution, setDistribution] = useState([]);

    const handleDistribution = () => {
        const totalPlayers = parseInt(numPlayers);
        if (!totalPlayers || totalPlayers < 0) {
            alert('Input value does not exist or value is invalid');
            setDistribution([])
            return;
        }

        const cards = [];
        const suits = ['S', 'H', 'D', 'C'];
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j < 4; j++) {
                let cardValue = i;
                if (i === 1) cardValue = 'A';
                else if (i === 10) cardValue = 'X';
                else if (i === 11) cardValue = 'J';
                else if (i === 12) cardValue = 'Q';
                else if (i === 13) cardValue = 'K';
                cards.push(suits[j] + '-' + cardValue);
            }
        }

        const shuffledCards = shuffleArray(cards);
        const distributionArray = Array(totalPlayers).fill('').map(() => []);
        let index = 0;
        shuffledCards.forEach((card) => {
            distributionArray[index].push(card);
            index = (index + 1) % totalPlayers;
        });

        setDistribution(distributionArray);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div className="home-container">
            <div className="header">
                <img src={require('../../assets/logo.png')} width="180"></img>
            </div>
            <div className="form-container">
                <div className="input-box">
                    <div className="label">Number of players</div>
                    <input type="number" className="form-control" placeholder="Enter number of players" value={numPlayers}
                           onChange={(e) => setNumPlayers(e.target.value)}/>
                </div>
                <button onClick={handleDistribution}>Distribute Cards</button>
            </div>
            {distribution.length ? (<div>

                    <div className="raw-output">
                        <div>Raw output:</div>
                        {distribution.map((item, index) => {
                            return <div>
                                Player {index + 1} - {item.toString()}
                            </div>
                        })}
                    </div>


                <CardStack distributionList={distribution}></CardStack>
            </div> ) : null}
        </div>
    );
};

export default Home;
