import React from 'react';
import PropTypes from 'prop-types';
import {PanelHeader, Button, Div, Panel, HorizontalScroll} from "@vkontakte/vkui";
import Cell from "../components/cell/Cell";
import Container from "../components/container/Container";
import bingoArray from "../bingoes";

const Home = ({ id, go }) => {
    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                Хайзенбинго VK
            </PanelHeader>

            <HorizontalScroll>
                <Container>
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
