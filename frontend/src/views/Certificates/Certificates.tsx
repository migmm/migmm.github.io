import React from "react";
import styled from "styled-components";

const Certificates = () => {
    return (
        <CertificatesStyles>
            <div className="certifications-container">
                <h1>Certifications</h1>
                <div className="selectors-container">
                    <span>Browse by</span>
                    {/* <label htmlFor="select-company">Company</label> */}
                    <select name="select" className="select-company" id="select-company">
                        <option value="value3" selected>
                            Company
                        </option>
                        <option value="linkedin">linkedin</option>
                        <option value="udemy">udemy</option>
                    </select>
                    <span>or</span>
                    {/* <label htmlFor="select-category">Category</label> */}
                    <select name="select" className="select-category" id="select-category">
                        <option value="value3" selected>
                            Category
                        </option>
                        <option value="linkedin">nodejs</option>
                        <option value="udemy">scrum</option>
                    </select>
                </div>
                <div className="cards-container">
                    {/* CARD */}
                    <div className="card">
                        <div className="image-container">
                            <img src="" alt="" />
                        </div>
                        {/*  <div className="img-miniature-container">
                            <img src="" alt="" />
                        </div> */}
                        <h2>Course</h2>
                    </div>

                    {/* CARD */}
                    <div className="card">
                        <div className="image-container">
                            <img src="" alt="" />
                        </div>
                        {/*  <div className="img-miniature-container">
                            <img src="" alt="" />
                        </div> */}
                        <h2>Course</h2>
                    </div>

                    {/* CARD */}
                    <div className="card">
                        <div className="image-container">
                            <img src="" alt="" />
                        </div>
                        {/*  <div className="img-miniature-container">
                            <img src="" alt="" />
                        </div> */}
                        <h2>Course</h2>
                    </div>
                </div>
                <div className="pagination-container">
                    <span className="pages">
                        Pages <span className="pages">1</span>
                        <span className="pages">2</span>
                        <span className="pages">3</span>
                    </span>
                    <select name="select" className="select-page" id="select-page">
                        <option value="value3" selected>
                            Qty per page
                        </option>
                        <option value="linkedin">10</option>
                        <option value="udemy">20</option>
                    </select>
                </div>
            </div>
        </CertificatesStyles>
    );
};

export default Certificates;

const CertificatesStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

    .certifications-container {
        margin: 1em;

        h1 {
            font-family: "Work Sans", sans-serif;
            font-weight: 800;
            text-align: center;
            margin: 1em 1em 0.5em 1em;
        }

        .selectors-container {
            text-align: center;
            font-family: "Work Sans", sans-serif;
            font-weight: 600;
            margin-bottom: 1em;
            font-size: 1.3em;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 0.5em;

            .select-company,
            .select-category {
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                border: none;
                font-size: 1em;
                cursor: pointer;
            }

            .select-company:hover,
            .select-category:hover {
                color: grey;
            }
        }

        .cards-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1em;

            @media (min-width: 768px) {
                display: flex;
                flex-direction: row;
                gap: 1em;
            }

            .card {
                width: 100%;
                height: 200px;
                margin-bottom: 2em;

                @media (min-width: 768px) {
                    max-width: 300px;
                }

                .image-container {
                    background-color: #0069c5;
                    height: 150px;
                    border-radius: 30px;
                }

                h2 {
                    font-family: "Work Sans", sans-serif;
                    font-weight: 700;
                    margin-top: 0.5em;
                }
            }
        }

        .pagination-container {
            text-align: center;
            font-family: "Work Sans", sans-serif;
            font-weight: 600;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 0.5em;
            margin-bottom: 1em;
            font-size: 1.3em;

            select {
                display: none;
                border: none;
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                font-size: 1em;
            }
        }
    }
`;
