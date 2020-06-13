import React from 'react';
import PropTypes from 'prop-types';
import {PanelHeader, Button, Div, Panel, HorizontalScroll} from "@vkontakte/vkui";
import Cell from "../components/cell/Cell";
import Container from "../components/container/Container";
import bingoArray from "../bingoes";

const Home = ({ id, go }) => {
    const cards = bingoArray.map(text => {
        return <Cell>{text}</Cell>
    });

    return (
        <Panel id={id}>
            <PanelHeader className='test' separator={false}>
                Хайзенбинго VK
            </PanelHeader>

            <HorizontalScroll>
                <Container>
                    {cards}
                </Container>
            </HorizontalScroll>


            {/*<Div>*/}
                {/*    <Button mode="commerce">Поделиться</Button>*/}
                {/*</Div>*/}

        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired
};

export default Home;
