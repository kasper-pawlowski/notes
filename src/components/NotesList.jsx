import { Container, Button, Input, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import Note from './Note';
import './NotesList.css';
import Columned from 'react-columned';
import Loading from './Loading';
import { BiSearchAlt2 } from 'react-icons/bi';
import useNotes from '../hooks/useNotes';

const NotesList = () => {
    const { notes, loading, error } = useNotes();
    const [searchValue, setSearchValue] = useState('');

    return (
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
            {loading ? (
                <Loading />
            ) : (
                <>
                    {error && <Text>{error}</Text>}
                    {notes && (
                        <Columned className="columned">
                            {notes
                                .filter((value) => {
                                    if (searchValue === '') {
                                        return value;
                                    } else if (value.note.toLowerCase().includes(searchValue.toLowerCase())) {
                                        return value;
                                    }
                                })
                                .map((note) => (
                                    <Note key={note.id} note={note} />
                                ))}
                        </Columned>
                    )}
                </>
            )}
        </Container>
    );
};

export default NotesList;
