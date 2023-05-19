import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload, UploadProps } from 'antd';
import React from 'react';
import axiosClient from '../../../api/axiosClient';

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: async (file) => {
        const formData = new FormData();
        formData.append('matchFile', file);

        return await axiosClient.post('/sports-bet/upload-match', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(err => {
            message.error(`뛰어나다 파일 만 보내십시오.`);
            return err
        });
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} 파일이 성공적으로 업로드되었습니다.`);
        } else if (status === 'error') {
            // message.error(`${info.file.name} 파일 업로드가 실패했습니다.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Export: React.FC = () => (
    <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20, gap: 10 }}>
            <p>*항상 최신 파일을 다운받은후 업로드 해주세요.*</p>
            <a
                className="flex items-center justify-center px-2 py-1 my-3 bg-gray-200 rounded-full dark:bg-dark-500 "
                href="/file/example.xlsx"
                download={'example-excel'}
                aria-label="down load excel"
            >
                <Button style={{ background: 'red' }}>
                    Download
                </Button>
            </a>

        </div>
        <Dragger {...props} style={{ display: 'flex', justifyContent: 'center', width: '50%', alignItems: 'center', minHeight: 270, margin: '0 auto' }}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">이 영역으로 파일을 클릭하거나 드래그하여 Excel을 업로드하십시오.</p>
            <p className="ant-upload-hint">
                여기에 Excel 파일을 알려주십시오
            </p>
        </Dragger>
    </React.Fragment>
);

export default Export;