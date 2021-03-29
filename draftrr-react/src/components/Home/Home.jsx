import ReactTypingEffect from 'react-typing-effect';

import { Card } from "./Card.jsx"
import HomeImage from "../../img/HomeImage"

import "./Home.scss"

export const Home = () => {
    return (
        <div className="mt-5 pt-5 body-container">
            <div className="d-flex justify-content-center align-items-center">
                <div className="mx-5">
                    <h1 className="text-primary">Stop it!</h1>
                    <p>You have one job: <strong><u>finish the draft.</u></strong></p>
                    <p>
                        Stop listening to spellcheck. <strong>Just write.</strong><br />
                        Stop looking up synonyms. <strong>Just write.</strong><br />
                        Stop researching. <strong>Just write.</strong><br />
                        Stop reviewing yesterday's work. <strong>Just write.</strong><br />
                        Stop getting in your own way. <strong>Just write.</strong>
                    </p>
                </div>
                <div className="mx-5">
                    <h2 style={{fontFamily: "monospace"}} className="mt-5">
                        <ReactTypingEffect
                            text={["Writing a first draft is hard...", "It isn't about perfection...", "It's about getting started"]}
                            // typingDelay={1000}
                            eraseDelay={1500}
                            speed={100}
                            eraseSpeed={100}
                        />
                    </h2>
                    <HomeImage width="500" />
                </div>
            </div>
            <div className="home-bottom-content">
                <h1 className="text-center mt-5 pt-5">What is Draftrr?</h1>
                <div className="row my-5 d-flex flex-wrap justify-content-center">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}
