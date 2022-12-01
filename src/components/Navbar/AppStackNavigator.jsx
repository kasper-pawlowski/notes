import { Button, Text, Navbar, Dropdown, Avatar, styled } from '@nextui-org/react';
import React from 'react';

const AppStackNavigator = ({ user, handleLogout, handler }) => {
    const StyledAvatar = styled(Avatar, {
        cursor: 'pointer',
    });

    return (
        <>
            <Navbar.Item>
                <Button auto shadow onClick={handler}>
                    <Text b>Create</Text>
                </Button>
            </Navbar.Item>
            <Dropdown placement="bottom-right">
                <Navbar.Item>
                    <Dropdown.Trigger>
                        <StyledAvatar
                            src={user.user_metadata.avatar_url ? user.user_metadata.avatar_url : null}
                            text={user.user_metadata.username ? user.user_metadata.username : null}
                        />
                    </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu aria-label="User menu actions" color="primary">
                    <Dropdown.Item textValue="profile" css={{ height: '$18' }}>
                        <Text b color="inherit" css={{ d: 'flex' }}>
                            Signed in as
                        </Text>
                        <Text b color="inherit" css={{ d: 'flex' }}>
                            {user.email}
                        </Text>
                    </Dropdown.Item>
                    <Dropdown.Item textValue="logout" withDivider css={{ padding: '0' }}>
                        <Button flat css={{ width: '100%' }} onClick={handleLogout}>
                            Log Out
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default AppStackNavigator;
