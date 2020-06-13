import React, { useState, useEffect, ReactDOM } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ConfigProvider, ScreenSpinner, Snackbar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './app.css';
import Home from './panels/Home';


const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const [snack, setSnack] = useState(null);

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        // delete
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
            setSnack(<Snackbar layout='vertical' onClose={() => setSnack(null)}>
                Logged as: {user.first_name} {user.last_name}</Snackbar>)
        }

        fetchData();
        // delete
    }, []);

    return (
        <ConfigProvider isWebView={true}>
            <View activePanel={activePanel} popout={snack}>
                {/* panel ↓ */}
                <Home id='home' fetchedUser={fetchedUser}/>
            </View>
        </ConfigProvider>
    );
};

export default App;




