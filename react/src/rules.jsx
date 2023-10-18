import React from 'react';

const Rules = () => {
    return (
        <div className="rules-container">
            <h1>Rules for the Poster-Making Competition on Cybersecurity Awareness</h1>
            <div className="rule-section">
                <h2>1. Eligibility:</h2>
                <ul>
                    <li>Participants must register for the event using a valid email ID to be eligible for prizes.</li>
                </ul>
            </div>
            <div className="rule-section">
                <h2>2. Team Participation:</h2>
                <ul>
                    <li>Participants can choose to compete individually or as a team with only one registration required by the team leader.</li>
                    <li>Team size is limited to 1 to 3 members.</li>
                </ul>
            </div>
            <div className="rule-section">
                <h2>3. Prizes:</h2>
                <ul>
                    <li className='firstPlace'>First Place: ₹4,000/-</li>
                    <li className='secondPlace'>Second Place: ₹2,500/-</li>
                    <li className='thirdPlace'>Third Place: ₹1,500/-</li>
                </ul>
            </div>
            <div className="rule-section">
                <h2>4. Fair Play:</h2>
                <ul>
                    <li>Any attempt to tamper with the competition website will result in immediate disqualification.</li>
                </ul>
            </div>
            <div className="rule-section">
                <h2>5. Submission Requirements:</h2>
                <ul>
                    <li>Submissions should be unique; duplicate entries will be disqualified.</li>
                    <li>Posters can be either hand-drawn or painted and photographed in good quality or digitally created using graphics tablets.</li>
                    <li>Do not use copyrighted images from the internet in your posters; any such usage will lead to immediate disqualification.</li>
                    <li>Image size should not exceed 10MB, and acceptable file extensions for submissions are .jpg, .jpeg, or .png only.</li>
                </ul>
            </div>
            <div className="rule-section">
                <h2>6. Submission Deadline:</h2>
                <ul>
                    <li>The submission deadline is 28th October at 12:00 PM.</li>
                </ul>
            </div>
            <p className="good-luck-message">Please ensure that you adhere to these rules and guidelines for a fair and exciting poster-making competition on cybersecurity awareness. Good luck!</p>
        </div>
    );
};

export default Rules;