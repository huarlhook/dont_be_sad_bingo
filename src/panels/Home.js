import React from 'react';
import {
    PanelHeader,
    Button,
    Div,
    Panel,
    HorizontalScroll,
} from "@vkontakte/vkui";
import Container from "../components/container/Container";

const Home = ({ id, setActiveModal, fieldStore, updateField }) => {
    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                Хайзенбинго VK
            </PanelHeader>

            <HorizontalScroll>
                <Container fieldStore={fieldStore} updateField={updateField}>
                </Container>
            </HorizontalScroll>

            <Div>
                <Button stretched mode="overlay_primary" size="xl" onClick={() => setActiveModal('share')}>
                    Поделиться своим бинго
                </Button>
                <Button stretched mode="overlay_primary" size="xl" onClick={() => setActiveModal('reset')}>
                    Сбросить бинго
                </Button>
            </Div>
        </Panel>
    );
};

export default Home;
