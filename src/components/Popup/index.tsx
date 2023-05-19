import React from 'react';
import { ButtonProps, Modal } from 'antd';
import { LegacyButtonType } from 'antd/es/button/button';
import PopupConfirm from './Confirm';

export type ClosePopupEvent = () => void

export interface PopupProps {
    selector?: React.ReactNode,
    title?: React.ReactNode,
    width?: string | number,
    labelOk?: React.ReactNode,
    labelCancel?: React.ReactNode,
    onSubmit?: (e: React.MouseEvent<HTMLElement>, closePopup: ClosePopupEvent) => void,
    onCancel?: (e: React.MouseEvent<HTMLElement>, closePopup: ClosePopupEvent) => void,
    okType?: LegacyButtonType,
    okButtonProps?: ButtonProps,
    cancelButtonProps?: ButtonProps,
    okLoading?: boolean,
    afterOpen?: () => void,
    afterClose?: () => void,
    mask?: boolean,
    maskClosable?: boolean,
    closable?: boolean,
    content?: React.ReactNode,
    footer?: React.ReactNode,
    centered?: boolean,
    className?: string
}

export interface PopupRef {
    open: () => void,
    close: () => void
}

const PopupRender: React.ForwardRefRenderFunction<PopupRef, PopupProps> = (props, ref) => {

    const {
        title,
        width,
        labelOk,
        labelCancel,
        onSubmit,
        onCancel,
        okType,
        okButtonProps,
        cancelButtonProps,
        okLoading,
        afterOpen,
        afterClose,
        selector,
        content,
        footer,
        className
    } = props
    let { mask, maskClosable, closable, centered } = props

    if (mask === undefined) mask = true
    if (maskClosable === undefined) maskClosable = true
    if (closable === undefined) closable = true
    if (centered === undefined) closable = false

    const [show, setShow] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
        open: () => {
            toggleShow(true, setShow)
            afterOpen?.()
        },
        close: () => toggleShow(false, setShow)
    }))

    return <React.Fragment>
        {selector}
        <Modal
            title={title}
            width={width}
            open={show}
            okText={labelOk ?? '확인하다'}
            cancelText={labelCancel ?? '취소'}
            onOk={e => onSubmit
                ? onSubmit(e, () => toggleShow(false, setShow))
                : toggleShow(false, setShow)}
            onCancel={e => onCancel
                ? onCancel(e, () => toggleShow(false, setShow))
                : toggleShow(false, setShow)}
            okType={okType}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
            confirmLoading={okLoading}
            afterClose={() => afterClose?.()}
            mask={mask}
            maskClosable={maskClosable}
            closable={true}
            footer={footer}
            centered={centered}
            className={className}
            destroyOnClose>
            {content}
        </Modal>
    </React.Fragment>
}

const toggleShow = (
    show: boolean,
    setShow: React.Dispatch<boolean>) => {

    setShow(show)
}

const Popup = React.forwardRef<PopupRef, PopupProps>(PopupRender)

export default Popup

export {
    PopupConfirm
}