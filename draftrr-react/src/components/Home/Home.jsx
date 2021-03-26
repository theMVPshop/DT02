import ReactTypingEffect from 'react-typing-effect';

import { Card } from "./Card.jsx"
import HomeImage from "../../img/HomeImage"

import "./Home.scss"

export const Home = () => {
    return (
        <div className="mt-5 pt-5 body-container">
            <div className="row d-flex align-items-center">
                <div className="col-lg-6 pl-5">
                    <h1 className="text-primary">Large text</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis laboriosam beatae sit dolores est quisquam dolorem temporibus doloribus? Voluptas nisi aliquam exercitationem a doloribus alias enim! Alias numquam corrupti eaque!</p>
                </div>
                <div className="col-lg-6">
                    <HomeImage width="500" />
                    <h2 className="mt-5">
                        <ReactTypingEffect
                            text={["Writing a first draft is hard...", "It isn't about perfection...", "It's about getting started"]}
                            // typingDelay={1000}
                            eraseDelay={1500}
                            speed={100}
                            eraseSpeed={100}
                        />
                    </h2>
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
