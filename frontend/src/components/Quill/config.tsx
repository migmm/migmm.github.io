import ReactQuill from "react-quill";

const Font = ReactQuill.Quill.import('formats/font');

Font.whitelist = ['Work-Sans'];
ReactQuill.Quill.register(Font, true);

export type Resize = 'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit';

export const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        [{ font: Font.whitelist }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code'],
    ],
    clipboard: {
        matchVisual: false,
    },
};

export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code',
];