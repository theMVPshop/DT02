import { ProfilePic } from "./ProfilePic"

import "./About.scss"

export const About = () => {
    return (
        <div className="body-container container mg-1">
            <section>
                <h1 className="text-center text-primary mb-5">About</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, earum sit! Vero totam quod minima aperiam repellendus a debitis ex tenetur suscipit perspiciatis quos odio, non id, esse illo aliquam.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, earum sit! Vero totam quod minima aperiam repellendus a debitis ex tenetur suscipit perspiciatis quos odio, non id, esse illo aliquam.</p>
            </section>
            <section className="d-flex flex-column align-items-center my-5">
                <h2 className="mb-2">Team</h2>
                <div className="profile-pics d-flex flex-wrap justify-content-center">
                    <ProfilePic name="Nick Black" avatar="avatar" github="nblack0917" linkedin="nick-a-black" />
                    <ProfilePic name="Chris Foy" avatar="avatar" github="rockman4417" linkedin="chris-foy123" />
                    <ProfilePic name="Lane Garner" avatar="avatar" github="lanegarner" linkedin="lanegarner" />
                    <ProfilePic name="Darryl Schomberg II" avatar="avatar" github="dschombergii" linkedin="darrylschombergii" />
                </div>
            </section>
        </div>
    )
}
