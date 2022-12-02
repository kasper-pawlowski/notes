import { Button, Container, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import NotesList from '../../components/NotesList';
import { BiSearchAlt2 } from 'react-icons/bi';

const Home = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <>
            <Container lg display="flex" alignItems="center" direction="column" css={{ gap: '30px', marginTop: '10px', paddingBottom: '60px' }}>
                <Input
                    onChange={(e) => setSearchValue(e.target.value)}
                    aria-label="search"
                    placeholder="Search"
                    bordered
                    color="primary"
                    size="lg"
                    labelRight={<BiSearchAlt2 />}
                    css={{
                        width: '100%',
                        '@sm': {
                            width: '400px',
                        },
                    }}
                />
                <NotesList searchValue={searchValue} />
            </Container>
        </>
    );
};

export default Home;
