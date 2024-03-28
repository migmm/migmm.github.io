import React from 'react';
import styled from 'styled-components';
import { FacebookProvider, CustomChat } from 'react-facebook';

interface FBChatProps {
    pageId: string;
}

const FBChat: React.FC<FBChatProps> = ({ pageId }) => {
    return (
        <FBChatButtonContainer>
            <FacebookProvider appId="1057521941935363" chatSupport>
                <CustomChat pageId="184581498068766" minimized={false} />
            </FacebookProvider>
        </FBChatButtonContainer>
    );
};

const FBChatButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    z-index: 1000;
`;

export default FBChat;
