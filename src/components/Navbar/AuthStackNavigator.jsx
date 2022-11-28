import React from 'react';
import { Button, Navbar, Text } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const AuthStackNavigator = () => {
    return (
        <>
            <Navbar.Item>
                <Link to="/login">
                    <Button auto light>
                        <Text b>Log in</Text>
                    </Button>
                </Link>
            </Navbar.Item>
            <Navbar.Item>
                <Link to="/signup">
                    <Button auto flat>
                        <Text b>Sign up</Text>
                    </Button>
                </Link>
            </Navbar.Item>
        </>
    );
};

export default AuthStackNavigator;
