import { ProfilePic } from "./ProfilePic"
// import { WoodPeckerTop } from '../../img/WoodPeckerTop'

import "./About.scss"

export const About = () => {
    return (
        <div>
            <div className="body-container container mg-1">
                <section>
                    <h1 className="text-center text-primary mb-5">About</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, earum sit! Vero totam quod minima aperiam repellendus a debitis ex tenetur suscipit perspiciatis quos odio, non id, esse illo aliquam.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, earum sit! Vero totam quod minima aperiam repellendus a debitis ex tenetur suscipit perspiciatis quos odio, non id, esse illo aliquam.</p>
                </section>
                </div>
                <div className="teamSection">
                    <div className="body-container container mg-1">
                        <section className="d-flex flex-column align-items-center my-5">
                            <div className="teamHeading">Team</div>
                            <div className="profile-pics d-flex flex-wrap justify-content-center">
                                <ProfilePic name="Nick Black" role="Front End Developer" avatar="nick" github="nblack0917" linkedin="nick-a-black" />
                                <ProfilePic name="Chris Foy" role="Back End Developer" avatar="chris" github="rockman4417" linkedin="chris-foy123" />
                                <ProfilePic name="Lane Garner" role="Front End Developer" avatar="lane" github="lanegarner" linkedin="lanegarner" />
                                <ProfilePic name="Darryl Schomberg II" role="Back End Developer" avatar="darryl" github="dschombergii" linkedin="darrylschombergii" />
                                <ProfilePic name="Keith Kritselis" role="Project Manager" avatar="keith" github="kkritselis" linkedin="keith-kritselis" />
                            </div>
                        </section>
                    </div>
                    {/* <div className="woodpeckerOnFooter">
                        <WoodPeckerTop width="200px" />
                    </div> */}
                </div>
            </div>
    )
}
