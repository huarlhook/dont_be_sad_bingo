import React from 'react';
import {
    PanelHeader,
    Button,
    Div,
    Panel,
    HorizontalScroll,
} from '@vkontakte/vkui';
import Container from '../components/container/Container';

const Home = ({ id, setActiveModal, fieldStore, updateField }) => {
    const vkt = (
        <Div className={'PanelHeader__vkt'}><img src={'./vkt.svg'} height={30}/> × Бинго</Div>
    );

    return (
        <Panel id={id}>
            <PanelHeader left={vkt} separator={false}>

            </PanelHeader>

            <HorizontalScroll>
                <Container fieldStore={fieldStore} updateField={updateField}>
                </Container>
            </HorizontalScroll>

            <Div className='Div__vkt_share'>
                <Button stretched mode="overlay_primary" size="xl" onClick={() => setActiveModal('share')}>
                    Поделиться своим бинго
                </Button>
            </Div>

            <Div className='Div__vkt_reset'>
                <Button stretched size="xl" onClick={() => setActiveModal('reset')}>
                    Сбросить всё
                </Button>
            </Div>
        </Panel>
    );
};

export default Home;
