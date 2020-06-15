import React, { useState, useEffect, useLayoutEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    ConfigProvider,
    ModalRoot,
    ModalCard,
    Div,
    Headline,
    Text,
    FormLayout,
    Input,
} from '@vkontakte/vkui';
import Home from './panels/Home';
import '@vkontakte/vkui/dist/vkui.css';
import './app.css';

const CONST_APP_ID = 'https://vk.com/app7490838';

const App = () => {
    useLayoutEffect(() => {
        function resize() {
            const element = document.getElementById('container').parentElement;
            element.scrollLeft = (element.scrollWidth - element.offsetWidth) / 2;
        }

        window.addEventListener('resize', resize, false);
        window.addEventListener('load', resize, false);
        window.addEventListener('orientationchange', resize, false);

        setTimeout(() => resize());

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('load', resize);
            window.removeEventListener('orientationchange', resize);
        }
    }, []);

    function getHash() {
        if (window.location.hash === '') {
            return 0;
        }

        const value = window.location.hash.slice(1);
        if (Number.isFinite(+value)) {
            return value;
        }
    }

    const [activePanel] = useState('home');
    const [activeModal, setActiveModal] = useState(null);
    const [fieldStore, updateField] = useState(getHash);

    const getShareUrl = () => {
        return `${CONST_APP_ID}`.concat(fieldStore ? `#${fieldStore}` : '');
    };

    const shareAction = (url) => {
        bridge.send('VKWebAppShare', {'link': url})
            .finally(() => setActiveModal(null));
    };

    const resetAction = () => {
        updateField(0);
        setActiveModal(null);
    };

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }

            if (type === 'VKWebAppViewRestore') {
                const hash = getHash();

                if (!hash) {
                    return;
                }

                updateField(hash);
            }
        });
    }, []);

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={ () => setActiveModal(null) }>
            <ModalCard
                id='share'
                onClose={() => setActiveModal(null)}
                header='Поделиться своим бинго'
                actions={[ { title: 'Поделиться результатом', mode: 'primary', action: () => { shareAction(getShareUrl()) } } ]}
            >
                <Div>
                    <FormLayout>
                        <Input type="text" defaultValue={getShareUrl()} readOnly={true} />
                    </FormLayout>

                    <Headline align={'center'} weight="regular" style={{ marginTop: 2 }}>
                        Скопируйте ссылку, либо нажмите кнпоку ниже чтобы поделиться
                    </Headline>
                </Div>
            </ModalCard>

            <ModalCard
                id='reset'
                onClose={() => setActiveModal(null)}
                header='Сбросить бинго?'
                actions={ [{ title: 'Дааа...', mode: 'primary', action: () => { resetAction() }}] }
            >
                <Div>
                    <Text weight="regular" style={{ marginTop: 5 }}>...и очистить душу от пожаров.</Text>
                </Div>
            </ModalCard>
        </ModalRoot>
    );

    return (
        <ConfigProvider scheme={'bright_light'} isWebView={true}>
            <View activePanel={activePanel} modal={modal}>
                <Home id='home' setActiveModal={setActiveModal} fieldStore={fieldStore} updateField={updateField} />
            </View>
        </ConfigProvider>
    );
};

export default App;




