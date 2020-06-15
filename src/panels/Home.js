import React from 'react';
import {
    PanelHeader,
    Button,
    Div,
    Panel,
    HorizontalScroll,
    Link,
} from '@vkontakte/vkui';
import Container from '../components/container/Container';

const Home = ({ id, setActiveModal, fieldStore, updateField }) => {
    const vkt = (
        <Div className={'PanelHeader__vkt'}>
            <Link href='https://vk.com/testers'>
                <img src={'./vkt.svg'} height={30}/>
            </Link> × Бинго
        </Div>
    );

    return (
        <Panel id={id}>
            <PanelHeader left={vkt} separator={false} />

            <Div className='Div__vkt_share'>
                <Button stretched mode="overlay_primary" size="xl" onClick={() => setActiveModal('share')}>
                    Поделиться своим бинго
                </Button>
            </Div>

            <HorizontalScroll>
                <Container fieldStore={fieldStore} updateField={updateField} />
            </HorizontalScroll>

            <Div className='Div__vkt_reset'>
                <Button stretched size="xl" onClick={() => setActiveModal('reset')}>
                    Сбросить всё
                </Button>
            </Div>
        </Panel>
    );
};

export default Home;
