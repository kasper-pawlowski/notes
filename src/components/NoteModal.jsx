import React, { useEffect, useState } from 'react';
import { Modal, Button, Text, Textarea, Input } from '@nextui-org/react';
import supabase from '../services/supabase';
import useDate from '../hooks/useDate';

const NoteModal = ({ visible, closeHandler, note, value, setValue }) => {
    const { date } = useDate();

    const handleUpdate = async () => {
        if (value.note !== '') {
            const { error } = await supabase.from('notes').update({ title: value.title, note: value.note, date }).eq('id', note.id);
            error && console.log(error);
            closeHandler();
            setValue();
        } else {
            handleDelete();
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase.from('notes').delete().eq('id', note.id);
        error && console.log(error);
        closeHandler();
    };

    return (
        <Modal closeButton open={visible} onClose={closeHandler}>
            <Modal.Header>
                <Text b size={18}>
                    Edit note
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    initialValue={note?.title}
                    aria-label="title"
                    bordered
                    onChange={(e) => setValue({ ...value, title: e.target.value })}
                    size="lg"
                    color="primary"
                    placeholder="Title"
                />
                <Textarea
                    initialValue={note?.note}
                    aria-label="note"
                    onChange={(e) => setValue({ ...value, note: e.target.value })}
                    size="lg"
                    color="primary"
                    bordered
                    placeholder="Enter your amazing ideas."
                    minRows={4}
                    maxRows={8}
                    required
                    fullWidth={true}
                />
                <Text>{date}</Text>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={handleDelete}>
                    Delete
                </Button>
                <Button auto flat color="error" onClick={closeHandler}>
                    Cancel
                </Button>
                <Button auto onClick={handleUpdate}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NoteModal;
