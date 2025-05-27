import React, { useEffect, useState, useCallback } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const { sourceId } = props;
    const [lastMessage, setLastMessage] = useState<string | number>('-1');

    const onMessage = useCallback((message: number) => {
        setLastMessage(message);
    }, []);

    useEffect(() => {
        setLastMessage('-1');
        subscribe(sourceId, onMessage);
        return () => {
            unsubscribe(sourceId, onMessage);
        };
    }, [sourceId, onMessage]);

    return (
        <div>
            {sourceId}: {lastMessage}
        </div>
    );
}