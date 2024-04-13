import './card-stack.scss';
import React, {useEffect} from "react";

const CardStack = ({distributionList}) => {

    const getSymbolBySuit = (suit) =>{
        let suits = {
            "H" : '♥',
            "S" : '♠',
            "C" : "♣",
            "D" : "♦"
        }
        return suits[suit]
    }


    return (
        <div className="card-stack grid-container">
            {distributionList.length ? distributionList.map((distributionItem, index) => {
                    return <div className="grid-item" >
                    <ul className="card_list"  data-person-index={index+1}>
                        {distributionItem.length ? distributionItem.map((item, index) => {
                            let suit = item.split('-')[0];
                            let cardNumber = item.split('-')[1]
                            return (
                                <li data-suit={getSymbolBySuit(suit)} data-number={cardNumber} style={{color: ['H','D'].includes(suit) ? '#d30202' : 'black'}}></li>
                            )
                        }) :
                            <React.Fragment>

                            </React.Fragment>
                        }
                    </ul>
                </div>
            }) : null}
        </div>
    )
}

export default CardStack;
