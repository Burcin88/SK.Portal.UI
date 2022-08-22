import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Button, Row, Col, List, useGlobalState, DateText, Title, Dropzone, Icon, Dropdown, Menu } from '@bilgeadam/fow-ui';
import useModal from "@hooks/useModal";
import { FormattedMessage, useIntl } from "react-intl";
import FilePreviewModal from '../FilePreviewModal';
import NoDataImage from "@assets/images/maskot.png";
import connector from "./utils/file-connector/lib";
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import api from './utils/file-connector/lib/api'
import { DropzoneWrapper, StyledFileNavigator, StyledFileManager } from './styles';

import { useMutation } from 'react-query';
import { client } from '@helpers/api';
import upload from './utils/file-connector/lib/capabilities/upload';
import { getCookie } from '@helpers/cookie';
import ConfirmModal from '@components/molecules/ConfirmModal';
import FormModal from "@components/molecules/FormModal";
import { FORM_COMPONENT_DIR } from "@types/componentDir";

const DataSourceFileManager = ({ datasource, id, mode, ...rest }) => {
    const [showPreview, setPreviewState] = useState(false);
    const fileManagerRef = useRef(null);
    const [drawerData, setDrawerData] = useState();
    const [showDropzone, setShowDropzone] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [connectorState, setConnectorState] = useState();
    const { longDateFormat } = useGlobalState();
    const { visibleModal, handleHideModal, handleModal } = useModal(true);
    const _authorization = getCookie('token');
    const intlr = useIntl();
    const sendModal = useModal();
    const authorizeModal = useModal();

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsBinaryString(file);
        })
    }

    const uploadMutation = useMutation(
        (data) => client.crm.upload(data),
        {
            onSuccess: () => {
                connectorState.actions.navigateToDir()
            },
        },
    );

    useEffect(() => {
        window.addEventListener('dragover', (event) => {
            setShowDropzone(true);
        });
        window.addEventListener('drop', (event) => {
            setShowDropzone(false);
        });
    }, []);

    const handleClose = () => {
        setPreviewState(false);
    }

    const handleResourceItemClick = (resourceData) => {
        setPreviewState(true);
        setDrawerData(resourceData.rowData)
    }

    const handleDrop = async (file) => {

        var result = await readFileAsync(file[0]);
        const data = {
            type: file[0].type,
            name: file[0].name,
            file: file[0]
        }
        upload(connectorState.apiOptions, connectorState.actions).handler(data);

        connectorState.actions.navigateToDir()

    }


    const dropzoneRender = (props) => {
        return <div style={{ width: "100%", height: "100%", }} {...props.getRootProps()}>
            <input {...props.getInputProps()} />
            <DropzoneWrapper>
                <Icon size={60} name="cloud-upload-alt" />
                <div>Drop your files for upload</div>
            </DropzoneWrapper>
        </div>
    }


    const handleOk = async (data) => {
        setRemoveLoading(true);
        var response = await api.removeResource(connectorState.apiOptions, data);
        connectorState.actions.navigateToDir();
        setRemoveLoading(false);
        setPreviewState(false);

        return response;
    }

    const handleCancel = (data) => { }

    const handleRemoveFile = async (data) => {
        ConfirmModal({ content: intlr.formatMessage({ id: "AreYouSure" }), okHandle: () => { handleOk(data) }, cancelHandle: () => { handleCancel(data) }, data })
    }


    const sendMail = (document) => {
        sendModal.handleModalForm(
            FORM_COMPONENT_DIR.MAIL_FORM,
            <FormattedMessage id="send-email" />,
            { document: document, buttonText: intlr.formatMessage({ id: 'Send' }), modelId: id, modelName: datasource, }
        );
    };

    const menu = () => (
        <Menu>
            <Menu.Item icon={<Icon name="check" size={13} style={{ width: 25 }} />}
                onClick={() => authorizeModal.handleModalForm(FORM_COMPONENT_DIR.AUTHORIZE_FORM, <FormattedMessage id="AuthorizeLead" />, { modelId: drawerData?.id, modelName: "document" })}>
                <FormattedMessage id="Authorize" />
            </Menu.Item>
        </Menu >
    )


    return (
        <>
            <Drawer title={<FormattedMessage id="DocumentInformation" />} width={520} closable={true} visible={showPreview} onClose={handleClose}
                footer={
                    <Row gutter={8}>
                        <Col><Dropdown overlay={() => menu(drawerData)}>
                            <Button
                                use="primary"
                                iconType="feather"
                                prefixIcon="more-horizontal"
                                suffixIconSize={14}
                                size="compact"
                            ></Button>
                        </Dropdown></Col>
                        <Col>
                            <a target="_blank" href={`${connectorState?.apiOptions.apiRoot}/files/download?fileId=${drawerData?.id}&access_token=${_authorization}`}>
                                <Button prefixIcon="download" use="primary"><FormattedMessage id="Download" /></Button>
                            </a>
                        </Col>
                        <Col><Button prefixIcon="eye" use="secondary" onClick={() => handleModal(drawerData?.id)}><FormattedMessage id="Preview" /></Button></Col>
                        <Col><Button prefixIcon="share" use="secondary" onClick={() => sendMail(drawerData)}><FormattedMessage id="Share" /></Button></Col>
                        <Col>
                            {/* <Button loading={removeLoading} prefixIcon="trash-alt" use="secondary" onClick={() => handleRemoveFile(drawerData)}><FormattedMessage id="Delete" /></Button> */}
                            <Button use="text" prefixIcon="trash-alt" onClick={() => handleRemoveFile(drawerData)}><FormattedMessage id={'Delete'} /></Button>
                        </Col>
                    </Row>
                }
            >
                <Title title={drawerData?.name}></Title>
                <Row>
                    <Col>
                        <FormattedMessage id="Created" />
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                        <p>
                            <DateText value={drawerData?.creationTime} format={longDateFormat} />
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormattedMessage id="Modified" />
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                        <p>
                            {drawerData?.modifiedTime ? <DateText value={drawerData?.modifiedTime} format={longDateFormat} /> : "-"}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormattedMessage id="Size" />
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                        <p>{drawerData?.sizeText}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormattedMessage id="Creator" />
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                        <p>{drawerData?.creatorUser?.fullName || "-"}</p>
                    </Col>
                </Row>
            </Drawer>
            <div style={{ height: '600px', position: "relative" }} ref={fileManagerRef}>
                <Title title={<FormattedMessage id='Files'></FormattedMessage>}></Title>
                <StyledFileManager>
                    <StyledFileNavigator
                        id="filemanager-1"
                        api={connector.api}
                        apiOptions={{
                            // /entities/49efd61f-dbff-4a5a-bae2-0b78930dc702/types/customer
                            ...connector.apiOptions,
                            modelId: id,
                            modelName: datasource,
                            apiRoot: process.env.REACT_APP_BA_API_URL + "/crm/v1",
                        }}
                        capabilities={(apiOptions, actions) => {
                            setConnectorState({ apiOptions, actions });
                            return ([
                                ...connector.capabilities(apiOptions, actions),
                            ])
                        }}
                        listViewLayout={connector.listViewLayout}
                        viewLayoutOptions={connector.viewLayoutOptions}

                        onResourceItemClick={handleResourceItemClick}
                    />
                </StyledFileManager>

                <div style={{ display: showDropzone ? 'block' : 'none', position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                    <Dropzone onDrop={handleDrop} childRender={dropzoneRender}></Dropzone>
                </div>

            </div>
            {/* <FileManager apiRoot={"https://gateway.preprod.fowapps.com/crm/v1/entities/0cf921b9-da41-429c-9066-05da919bf832/types/lead"}></FileManager> */}
            <FilePreviewModal id={drawerData?.id} visible={visibleModal} hide={handleHideModal} data={{ authorization: _authorization, apiRoot: connectorState?.apiOptions.apiRoot, ...drawerData }} />
            <FormModal info={sendModal.formInfo} visible={sendModal.visibleModal} hide={sendModal.handleHideModal} save={sendModal.handleSaveModalForm} />
            <FormModal info={authorizeModal.formInfo} visible={authorizeModal.visibleModal} hide={authorizeModal.handleHideModal} save={authorizeModal.handleSaveModalForm} />
        </>
    );
}

export default DataSourceFileManager;