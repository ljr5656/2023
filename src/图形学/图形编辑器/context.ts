import { createContext } from 'react';
import { Editor } from './editor';

const EditorContext = createContext<Editor | null>(null);

export { EditorContext };
