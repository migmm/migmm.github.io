import React from 'react';
import styled from 'styled-components';


interface FBChatProps {
    pageId: string;
}


const FBChat: React.FC<FBChatProps> = ({ pageId }) => {
    React.useEffect(() => {
        ((d, s, id) => {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = `https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js`;
            js.async = true;
            js.defer = true;
            fjs.parentNode?.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    return (
        <FBChatButtonContainer>
            <div id="fb-root">
                <div
                    className="fb-customerchat"
                    data-attribution="setup_tool"
                    data-page_id={pageId}
                    data-theme_color="#0084ff"
                    data-logged_in_greeting="¡Hola! ¿Cómo podemos ayudarte?"
                    data-logged_out_greeting="¡Hola! ¿Cómo podemos ayudarte?"
                ></div>
            </div>
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