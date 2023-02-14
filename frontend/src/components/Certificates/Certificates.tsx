import React from "react";

const Certificates = () => {
    return (
        <>
            <div className="certifications-container">
                <h1>Certifications</h1>
                <div className="selectors-container">
                    <select name="select">
                        <option value="value3" selected>select</option>
                        <option value="linkedin">linkedin</option>
                        <option value="udemy" >udemy</option>
                    </select>
                </div>
                <div className="cards-container">
                    <div className="card">
                        <div className="image-container">
                            <img src="" alt="" />
                        </div>
                        <h2>Course</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Certificates;
