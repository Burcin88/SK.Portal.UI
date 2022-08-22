import styled from 'styled-components';
import { Panel } from '@bilgeadam/fow-ui';
import { FileNavigator, FileManager } from '@opuscapita/react-filemanager';

export const DropzoneWrapper = styled.div`
    width:100%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;


export const StyledFileNavigator = styled(FileNavigator)`
`
export const StyledFileManager = styled(FileManager)`
    height:93%!important;
    

    .oc-fm--toolbar__item[data-test-id="toolbar-item--upload"]{
        padding:0px 12px;
        font-family: Montserrat;

        background-color:var(--primary-color)!important;
        width:auto!important;
        font-weight: 700;
        font-size: 16px
        letter-spacing: 0.5px;
        color:#ffffff;
        text-align: center;
        border-radius: 4px!important;
        border:1px solid transparent;
        position: relative!important;

        .oc-fm--toolbar__item-icon{
            margin-right:4px;

            svg{
                fill:#ffffff;
            }
        } 

        &::after{
            content: attr(title);
            position: relative;
            top: 0;
        }
    }
`