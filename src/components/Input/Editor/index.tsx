import React, { useEffect, useImperativeHandle } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Form } from 'antd';
import axiosClient from '../../../api/axiosClient';
import 'react-quill/dist/quill.snow.css';

export interface InputEditorValue {
    text: string;
    html: string;
}

export interface InputEditorRef {
    setHtml: (value: string) => void;
    getValue: () => InputEditorValue;
}

export interface InputEditorProps {
    id?: string;
    name?: string;
    label?: string;
    width?: string | number;
    height?: string | number;
    initialValue?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    rules?: any[];
    onChange?: (value: { text: string; html: string }) => void;
    notification?: string,
    path?: string
}

const InputEditor = React.forwardRef<InputEditorRef, InputEditorProps>(
    (props, ref) => {
        const quillRef = React.useRef<ReactQuill>(null);

        const {
            id,
            name,
            label,
            width,
            height,
            initialValue,
            placeholder,
            readOnly,
            disabled,
            onChange,
            rules,
            notification,
            path
        } = props;


        const sizeStyle = Quill.import('attributors/style/size')
        sizeStyle.whitelist = ['10px', '11px', '12px', '13px', false, '15px', '16px', '17px', '18px', '19px', '20px', '21px', '22px', '23px', '24px', '25px', '26px', '27px', '28px', '29px', '30px', '31px', '32px', '33px', '34px', '35px', '36px', '37px', '38px', '39px', '40px', '41px', '42px', '43px', '44px', '45px', '46px', '47px', '48px', '49px', '50px']
        // useEffect(() => {
        //     if (quillRef.current && initialValue) {
        //         const quill = quillRef.current.getEditor();
        //         quill.clipboard.dangerouslyPasteHTML(initialValue);
        //     }
        // }, [quillRef, initialValue]);

        useImperativeHandle(ref, () => ({
            setHtml: (value: string) => {
                if (quillRef.current) {
                    const quill = quillRef.current.getEditor();
                    quill.clipboard.dangerouslyPasteHTML(value);
                }
            },
            getValue: (): InputEditorValue => {
                if (quillRef.current) {
                    const quill = quillRef.current.getEditor();
                    return {
                        text: quill.getText(),
                        html: quill.root.innerHTML,
                    };
                }
                return {
                    text: '',
                    html: '',
                };
            },
        }));

        const handleOnChange = (content: string) => {
            if (onChange) {
                onChange({
                    text: quillRef.current?.getEditor().getText() || '',
                    html: content,
                });
            }
        };

        const imageHandler = (e: any) => {
            const editor = quillRef.current?.getEditor();
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {

                const file = input.files?.[0];
                if (/^image\//.test(file?.type!)) {
                    const formData = new FormData();
                    formData.append("file", file!);
                    const res = await axiosClient.post('/notification/image/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    const url = res
                    editor?.insertEmbed(editor.getSelection() as any, "image", url);
                } else {
                    alert('이미지 만 업로드 할 수 있습니다.');
                }
            };
        }

        return (
            <Form.Item name={name} label={label} className="input-editor" rules={rules}>
                <ReactQuill
                    id={id}
                    ref={quillRef}
                    value={initialValue}
                    placeholder={placeholder || '컨텐츠 가져 오기...'}
                    readOnly={readOnly}
                    onChange={handleOnChange}
                    modules={{
                        toolbar: {
                            container: [
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'align': [false, 'center', 'right', 'justify'] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                ['link', 'image', 'video'],
                                [{ 'color': [] }, { 'background': [] }],
                                ['clean']
                            ],
                            handlers: {
                                image: imageHandler
                            }
                        },
                    }} />
            </Form.Item>)
    })
export default InputEditor