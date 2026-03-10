import SiteNavbar from "../components/Navbar"

function About(){
    return(<>
    <SiteNavbar />
    <p className="mt-5">
        Heyo! I'm Sam. This site was created for the final project of my JSCRIPT-320 course at University
        of Washington as part of my full-stack web development certificate course. It is a purely front-end project using
        Javascript and React, and accesses information from the website <a href="https://retroachievements.org">RetroAchievements</a> via&#160;
        <a href="https://api-docs.retroachievements.org">its API.</a>
    </p>
    <p>
        If you need me for any reason or if the site's causing problems, you can reach me on Discord @rapidemboar or DM my&#160;
        <a href="https://retroachievements.org/user/rapidemboar">RetroAchievements profile.</a>
    </p>
    <p>
        I do want to create more projects in the future, something I can put out there. If you've somehow managed to stumble across this page randomly, I hope we'll
        see each other again when that comes to pass.
    </p>
    </>)
}

export default About