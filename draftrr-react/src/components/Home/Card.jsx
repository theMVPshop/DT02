import "./Card.scss"

export const Card = ({card}) => {
    if (card === 'card1') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
                <h3 className="card-heading">Zero Distraction</h3>
                <div className="w-80 p-2">
                    <p className="card-text">Focus... That's the goal. Keep moving forward... That's the strategy.  We've removed all the artiface of the modern writing application and built in features designed to keep you moving forward</p>
                </div>
            </div>
        )
    } else if (card === 'card2') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
            <h3 className="card-heading">Minimal Editing</h3>
            <div className="w-80 p-2">
                <p className="card-text">Write now, edit later... The first draft should be the worst draft... Let it be what it's supposed to be... a proof of concept.  </p>
            </div>
        </div>
        )
    } else if (card === 'card3') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
            <h3 className="card-heading">100% Accountability</h3>
            <div className="w-80 p-2">
                <p className="card-text">When you create a new document, you are asked to choose an accountability buddy.  Only they can unlock the first draft.  The sooner you fininsh, the sooner you regain control of the work.</p>
            </div>
        </div>
        )
    } 
}
