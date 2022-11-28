import { Container, Loading as Loader } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
    return (
        <Container display="flex" justify="center" css={{ marginTop: '30px' }}>
            <Loader size="md" />
        </Container>
    );
};

export default Loading;
