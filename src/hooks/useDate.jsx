const useDate = () => {
    const dt = new Date();
    const day = dt.getDay();
    const month = dt.toLocaleDateString('en', { month: 'short' });
    const year = dt.getFullYear();
    const date = `${day} ${month}, ${year}`;

    return { date };
};

export default useDate;
