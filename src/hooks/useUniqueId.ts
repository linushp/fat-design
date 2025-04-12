import {useMemo} from 'react';
import {uniqueId} from '../util/guid';

const useUniqueId = (): string => {
    return useMemo(() => {
        return uniqueId('gid-');
    }, []);
};


export {
    useUniqueId,
}
