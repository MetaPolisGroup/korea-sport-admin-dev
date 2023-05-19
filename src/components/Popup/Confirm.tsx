import React from 'react';
import { ButtonProps } from 'antd';
import { LegacyButtonType } from 'antd/es/button/button';
import Popup, { ClosePopupEvent, PopupRef } from '.';

export interface ConfirmProps {
    title?: React.ReactNode,
    labelOk?: React.ReactNode,
    labelCancel?: React.ReactNode,
    onSubmit?: (e: React.MouseEvent<HTMLElement>, closePopup: ClosePopupEvent) => void,
    onCancel?: (e: React.MouseEvent<HTMLElement>, closePopup: ClosePopupEvent) => void,
    okType?: LegacyButtonType,
    okButtonProps?: ButtonProps,
    cancelButtonProps?: ButtonProps,
    selector: React.ReactNode,
    content?: React.ReactNode,
    width?: string | number,
    centered?: boolean,
    afterClose?: () => void,
}

const ConfirmRender: React.ForwardRefRenderFunction<PopupRef, ConfirmProps> = (props, ref) => {

    const {
        title,
        labelOk,
        labelCancel,
        onSubmit,
        onCancel,
        okType,
        okButtonProps,
        cancelButtonProps,
        selector,
        content,
        width,
        centered,
        afterClose
    } = props

    const modal = React.createRef<PopupRef>()

    React.useImperativeHandle(ref, () => ({
        open: () => modal.current?.open(),
        close: () => modal.current?.close()
    }))

    return <Popup
        ref={modal}
        title={title}
        width={width ?? 380}
        labelOk={labelOk ?? '동의하다'}
        labelCancel={labelCancel ?? '취소'}
        onSubmit={onSubmit}
        onCancel={onCancel}
        okType={okType}
        okButtonProps={okButtonProps}
        cancelButtonProps={cancelButtonProps}
        selector={selector}
        content={content}
        centered={centered ?? false}
        afterClose={afterClose} />
}

const Confirm = React.forwardRef<PopupRef, ConfirmProps>(ConfirmRender)

export default Confirm