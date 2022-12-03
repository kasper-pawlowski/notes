import { Text } from '@nextui-org/react';
import Note from './Note';
import './NotesList.css';
import Columned from 'react-columned';
import Loading from './Loading';
import useNotes from '../hooks/useNotes';

const NotesList = ({ searchValue }) => {
    const { notes, loading, error } = useNotes();

    return loading ? (
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
    );
};

export default NotesList;
