import React, {useState, useEffect, useLayoutEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    ConfigProvider,
    ModalRoot,
    ModalCard,
    Textarea,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './app.css';
import Home from './panels/Home';


const App = () => {
    useLayoutEffect(() => {
        function resize() {
            const temp1 = document.getElementById('container').parentElement;
            temp1.scrollLeft = (temp1.scrollWidth - temp1.offsetWidth) / 2;
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

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }

            if (type === 'VKWebAppCopyTextResult') {
                console.log('err');
            }
        });
    }, []);

    const getHash = () => {
        if (window.location.hash === '') {
            return 0;
        }

        const value = window.location.hash.slice(1);
        if (Number.isFinite(+value)) {
            return value;
        }
    };

    const isMobile = window.innerWidth < 748; // ?

    const [activePanel, setActivePanel] = useState('home');
    const [activeModal, setActiveModal] = useState(null);
    const [fieldStore, updateField] = useState(getHash);

    const getShareUrl = () => {
        return `https://vk.com/app7490838#${fieldStore}`;
    };

    const copyAndExit = () => {
        //bridge.send('VKWebAppCopyText', {text: "Этот текст будет скопирован в буфер обмена."}).catch();
        setActiveModal(null);
    };

    const shareAction = () => {
        bridge.send("VKWebAppShare", {"link": getShareUrl()})
            .finally(() => setActiveModal(null));
    };

    const resetAction = () => {
        updateField(0);
        setActiveModal(null);
    };

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={ () => setActiveModal(null) }>
            <ModalCard
                id='share'
                onClose={() => setActiveModal(null)}
                header="Поделиться ссылкой"
                actions={[ { title: 'Поделиться результатом', mode: 'primary', action: () => { shareAction('') } } ]}
            >
                <Textarea value={getShareUrl()} readonly={true} />
            </ModalCard>

            <ModalCard
                id='reset'
                onClose={() => setActiveModal(null)}
                header="Сбросить бинго?"
                actions={ [{ title: 'Да', mode: 'primary', action: () => { resetAction() }}] }
            >
            </ModalCard>
        </ModalRoot>
    );

    return (
        <ConfigProvider scheme={'bright_light'} isWebView={true}>
            <View activePanel={activePanel} modal={modal}>
                {/* panel ↓ */}
                <Home id='home' setActiveModal={setActiveModal} fieldStore={fieldStore} updateField={updateField} />
            </View>


        </ConfigProvider>
    );
};

export default App;




