import "./Home.scss"
import HomeImage from '../../img/HomeImage'

export const Home = () => {
    return (
        <div className="container body-container">
            <div className="row">
                <div className="col-lg-6">
                    <h1 >Large text</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis laboriosam beatae sit dolores est quisquam dolorem temporibus doloribus? Voluptas nisi aliquam exercitationem a doloribus alias enim! Alias numquam corrupti eaque!</p>
                </div>
                <div className="col-lg-6">
                    <HomeImage width="500" />
                </div>
            </div>
        </div>
    )
}
