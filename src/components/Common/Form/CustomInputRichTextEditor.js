import React, {useEffect, useRef, useState} from 'react';
import { TextareaAutosize } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CustomLable from './CustomLable';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    [{ align: [] }],
    ['clean'],
];

let error;
function CustomInputRichTextEditor({ name, ...otherProps }) {
    const { showlabel, placeholder, title } = otherProps;
    const [field, meta, helpers] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
    };

    const quillRef = useRef(null);

    useEffect(() => {
        if (quillRef.current) {
            let quill = quillRef.current.getEditor();
            quill.root.dataset.placeholder = otherProps.placeholder;
            quill.root.style.direction = 'rtl';
            quill.root.style.textAlign = 'right';
            quill.root.style.minHeight = '100px';
            quill.container.style.border = '.2rem dashed #D1D1D6';
            quill.container.style.borderRadius = '0.5rem';

            quill.root.addEventListener('focus', ()=> {
                quill.container.style.borderColor = "#0877BD";
            });
            quill.root.addEventListener('blur', ()=> {
                quill.container.style.borderColor = "#D1D1D6";
            });

            // setQuillInstances((prevState) => ({
            //     ...prevState,
            //     [name]: quill,
            // }));
        }
    }, [name, otherProps.placeholder]);

    useEffect(() => {
        let quill = quillRef.current.getEditor();
        if (meta && meta.error && meta.touched) {
            quill.container.style.borderColor = "#d32f2f";
        } else {
            quill.container.style.borderColor = "#D1D1D6";
        }
    }, [meta.error, meta.touched ]);

    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const handleChange = (content) => {
        helpers.setValue(content);
    };

    error = meta.touched && meta.error;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {showlabel && <CustomLable id={name} name={title || placeholder} />}
            {/*<CustomTextareaAutosize aria-label="minimum height" {...otherProps} {...configTextField} />*/}
            <ReactQuill
                ref={quillRef}
                value={field.value}
                onChange={handleChange}
                style={CustomRichTextEditorStyle}
                modules={{ toolbar: toolbarOptions }}
                {...otherProps}
            />
            {meta.touched && meta.error && (
                <Box sx={{ color: '#d32f2f', fontSize: '1.2rem', textAlign: 'left', ...otherProps.sx?.helper }}>{meta.error}</Box>
            )}
        </Box>
    );
}

export default CustomInputRichTextEditor;
const CustomRichTextEditorStyle = {
    width: '100%',
    fontFamily: 'inherit',
};
