import ReactTypingEffect from 'react-typing-effect';

import { Card } from "./Card.jsx"
import { HomeImage } from "../../img/HomeImage"

import "./Home.scss"

export const Home = () => {
    return (
        <div className="mt-2 pt-4 body-container">
            <section className="d-flex justify-content-around align-items-center pb-5">
                <div className="mx-5">
                    <h1 className="text-primary">Stop!</h1>
                    <p className="h4">You have one job: <strong>finish the draft.</strong></p>
                    <ul className="mt-3">
                        <li>Stop listening to spellcheck. <strong>Just write.</strong></li>
                        <li>Stop looking up synonyms. <strong>Just write.</strong></li>
                        <li>Stop researching. <strong>Just write.</strong></li>
                        <li>Stop reviewing yesterday's work. <strong>Just write.</strong></li>
                        <li>Stop getting in your own way. <strong>Just write.</strong></li>
                    </ul>
                </div>
                <div className="mx-5">
                    <h2 style={{fontFamily: "monospace", minWidth: "21em"}} className="my-4 pl-3">
                        <ReactTypingEffect
                            text={["Writing a first draft is hard...", "It's not about perfection...", "It's all about getting started!"]}
                            // typingDelay={1000}
                            eraseDelay={1500}
                            speed={100}
                            eraseSpeed={100}
                        />
                    </h2>
                    <HomeImage width="500" />
                </div>
            </section>
            <section className="home-bottom-content my-5 py-5 homeHeader">
                <h1 className="text-center font-weight-bold mt-4">What is Draftrr?</h1>
                <p className="text-center">Draftrr is a writing application that encourages finishing the first draft. It has a minimal interface and no formatting ability.</p>
                <div className="row my-5 d-flex flex-wrap justify-content-center">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
        </div>
    )
}
