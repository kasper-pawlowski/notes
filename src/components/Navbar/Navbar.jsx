import { Avatar, Button, Dropdown, Input, Navbar as Nav, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../services/supabase';

import CreateModal from '../CreateModal';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [note, setNote] = useState('');
    const handler = () => setVisible(true);
    const { user } = useAuth();

    const closeHandler = () => {
        setVisible(false);
        setNote();
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        error && console.log(error);
    };

    return (
        <>
            <Nav variant={'sticky'}>
                <Nav.Brand>
                    <Link to="/">
                        <Text b color="white" size={26}>
                            Notes
                        </Text>
                    </Link>
                </Nav.Brand>
                <Nav.Content>
                    {user ? <AppStackNavigator user={user} handleLogout={handleLogout} handler={handler} /> : <AuthStackNavigator />}
                </Nav.Content>
                <CreateModal visible={visible} closeHandler={closeHandler} note={note} setNote={setNote} />
            </Nav>
        </>
    );
};

export default Navbar;
