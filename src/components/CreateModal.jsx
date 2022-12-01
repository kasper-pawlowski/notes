import { Button, Modal, Row, Text, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import useDate from '../hooks/useDate';
import supabase from '../services/supabase';

const CreateModal = ({ visible, closeHandler, note, setNote }) => {
    const { date } = useDate();

    const handleCreate = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('notes').insert([{ note: note.note, date }]);
        error && console.log(error);
        closeHandler();
    };

    return (
        <Modal closeButton aria-labelledby="create-note" open={visible} onClose={closeHandler}>
            <form onSubmit={handleCreate}>
                <Modal.Header>
                    <Text id="create-note" b size={18}>
                        Create note
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Textarea
                        aria-label="Textarea"
                        onChange={(e) => setNote({ note: e.target.value })}
                        size="lg"
                        color="primary"
                        bordered
                        placeholder="Enter your amazing ideas."
                        minRows={4}
                        maxRows={8}
                        required={true}
                        fullWidth={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default CreateModal;
