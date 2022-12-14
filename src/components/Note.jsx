import React, { useState } from 'react';
import { Card, Text } from '@nextui-org/react';
import NoteModal from './NoteModal';

const Note = ({ note }) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState();

    const handler = () => {
        setVisible(true);
        setValue({ title: note.title, note: note.note });
    };

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <>
            <Card onClick={handler} isPressable isHoverable variant="bordered">
                <Card.Body>
                    <Text size="$xl" weight="semibold" css={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                        {note.title}
                    </Text>
                    <Text size="$md" css={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                        {note.note}
                    </Text>
                </Card.Body>
            </Card>
            <NoteModal visible={visible} closeHandler={closeHandler} note={note} value={value} setValue={setValue} />
        </>
    );
};

export default Note;
