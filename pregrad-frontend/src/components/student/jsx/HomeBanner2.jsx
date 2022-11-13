import React from 'react';
import "../css/HomeBanner2Styles.css";
import SkillHeader from "../../../img/home-banner/skill-header.png";

const HomeBanner2 = () => {
  return (
    <div>
      <div className='main_container_homebanner2'>
        <div className='heading_section_homebanner2'>
            <h2>Find Internships/ Jobs<br></br>for different skills</h2>
            <div className='heading_image_section_homebanner2'>
                <img src={SkillHeader} alt="skills" />
            </div>
        </div>

        <div className='skills_container_homebanner2'>
            <div className='skills_left_section_homebanner2'>
                <h3>Tech</h3>
                <h3>Management</h3>
                <h3>Media</h3>
                <h3>Additional Skills</h3>
            </div>

            <div className='skills_right_section_homebanner2'>
                <div className='skills_box_homebanner2' id='box1'>
                    <div className='single_skill_box_homebanner2'>
                        <p>Software</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Web Dev</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Machine Learning</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Mobile App</p>
                    </div>
                </div>

                <div className='skills_box_homebanner2'>
                    <div className='single_skill_box_homebanner2'>
                        <p>Digital Marketing</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Sales</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Financial Modeling</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Growth</p>
                    </div>
                </div>

                <div className='skills_box_homebanner2'>
                    <div className='single_skill_box_homebanner2'>
                        <p>Designing</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Video Editing</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Copywriting</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Content Writing</p>
                    </div>
                </div>

                <div className='skills_box_homebanner2'>
                    <div className='single_skill_box_homebanner2'>
                        <p>Project Management</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Social Media</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Manual Testing</p>
                    </div>
                    <div className='single_skill_box_homebanner2'>
                        <p>Operations</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner2
