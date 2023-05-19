import { Button, FormInstance, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import setting, { DomainFormRef, IResponseDomain, UpdateDomainDto } from "../../../../api/settingApi";
import Components from "../../../../components";
import { PopupConfirm, PopupRef } from "../../../../components/Popup";
import Utils from "../../../../utils";
import FormContent from "../Form";

const getColumns = (
  partners: IPartnerManageMent[]
): ColumnsType<IResponseDomain> => {
  return [
    {
      title: "보유지점",
      align: "center",
      dataIndex: "partner_with_domain",
      key: "partner_with_domain",
    },
    {
      title: "도메인",
      align: "left",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "가입코드 인증 해제",
      dataIndex: "unauth_sub_code",
      key: "unauth_sub_code",
      align: "center",
      render: (un) => {
        let color
        let text
        if (un) {
          color = '#2db7f5'
          text = '진실'
        } else {
          color = '#f50'
          text = '거짓'
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: "상태",
      dataIndex: "situation",
      key: "situation",
      align: "center",
      render: (un) => {
        let color
        let text
        if (un) {
          color = '#2db7f5'
          text = '진실'
        } else {
          color = '#f50'
          text = '거짓'
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: "설정",
      align: "center",
      dataIndex: "setting",
      key: "setting",
      fixed: "right",
      render: (_, data) => {
        const valueRef = React.createRef<DomainFormRef>();
        const btnDeleteRef = React.createRef<PopupRef>();
        const btnAcept = React.createRef<PopupRef>();

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Components.Popup
                ref={btnAcept}
                onSubmit={() => {
                  valueRef.current?.onSubmit((value) => {
                    if (value) {
                      (value as { id: string }).id = data.id
                      setting.DomainUpdate(value as UpdateDomainDto).then(i => {
                        if (i)
                          Utils.notification.success('성공')
                        else
                          Utils.notification.error('실패한')
                      })
                    }
                  })
                }}
                title='신규 생성'
                closable
                width={600}
                content={<FormContent partners={partners} ref={valueRef} domain={data} />}
                selector={<Button onClick={() => btnAcept.current?.open()}>신규작성</Button>}
              />
              <PopupConfirm
                ref={btnDeleteRef}
                onSubmit={() => {
                  setting.DomainDelete(data.id).then(i => {
                    if (i)
                      Utils.notification.success('성공')
                    else
                      Utils.notification.error('실패한')
                  })
                }}
                selector={
                  <Button
                    type="primary"
                    onClick={() => btnDeleteRef.current?.open()}
                  >
                    Delete
                  </Button>
                }
                title="승인"
                content={"이 도메인을 삭제 하시겠습니까 " + data.domain + ' ?'}
              />
            </div>
          </div>
        );
      },
    },
  ];
};
export { getColumns };
