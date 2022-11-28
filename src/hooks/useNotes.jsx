import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

const useNotes = () => {
    const [notes, setNotes] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        const { data, error } = await supabase.from('notes').select('*').order('updated_at', { ascending: false });
        if (error) {
            setError('Could not fetch notes');
            console.log(error);
            setLoading(false);
        }
        if (data) {
            setNotes(data);
            setError(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const notesListener = supabase
            .channel('public:notes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, () => {
                fetchNotes();
            })
            .subscribe();

        () => notesListener.unsubscribe();
    }, []);

    return { notes, loading, error };
};

export default useNotes;
