import { Nullable } from './interfaces/types';
export default class Config<T> {
    private filePath;
    private store;
    constructor(filePath?: Nullable<string>, defaults?: Partial<T>);
}
