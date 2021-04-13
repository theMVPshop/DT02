import "./Card.scss"

export const Card = ({card}) => {
    if (card === 'card1') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
                <h3 className="card-heading">Zero Distraction</h3>
                <div className="w-80 p-2">
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ornare quam viverra orci sagittis eu volutpat.</p>
                </div>
            </div>
        )
    } else if (card === 'card2') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
            <h3 className="card-heading">Minimal Editing</h3>
            <div className="w-80 p-2">
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim.</p>
            </div>
        </div>
        )
    } else if (card === 'card3') {
        return (
            <div className="home-card d-flex flex-column align-items-center">
            <h3 className="card-heading">100% Accountability</h3>
            <div className="w-80 p-2">
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue.</p>
            </div>
        </div>
        )
    } 
}
