import React from 'react';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import ContainerStyles from '../../Styles/Container/Container';
import H1 from '../../Styles/H1/H1';

const SectionList = () => {

    const h1Text = 'Projects'
    return (
        <CommonStyles>
            <ContainerStyles>
                <H1 innerText={h1Text} />

                <div>
                    <div>
                    <div className="image">
                        <img src="" alt="" />
                    </div>
                    <div className="title">
                        <span>Title</span>
                    </div>
                    <div className="buttons">
                        <span>View</span>
                        <span>Edit</span>
                        <span>Delete</span>
                    </div>
                    </div>
                </div>
            </ContainerStyles>
        </CommonStyles>
    );
};

export default SectionList;
