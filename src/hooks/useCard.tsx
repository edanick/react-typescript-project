import { useEffect, useState } from 'react';


import { Card } from '../@types';
import getCard from '../service/getCard';

export default function useCard(id: string) {
    const [card, setCard] = useState<Card>(),
        [error, setError] = useState<any>();

    useEffect(() => {
        getCard(id).then(({ data }) => {
            setCard(data);
        }).catch((err: any) => {
            setError(err);
        });
    }, []);

    return { card, error };
}