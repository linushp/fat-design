import React from 'react'
import ReactDOM from 'react-dom/client'
import {Upload, Button, Icon,Dialog} from '../src/index';
import './index.css'


class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.saveUploaderRef = ref => {
            if (!ref) return;
            this.uploaderRef = ref.getInstance();
            props.dialogRef.uploaderRef = this.uploaderRef;
        };
    }


    beforeUpload = (info, options) => {
        console.log("FileUploader beforeUpload callback : ", info, options);
        return options;
    };

    onProgress = (info, options) => {
        console.log("FileUploader onProgress callback : ", info, options);
    };

    onSuccess = async (info, options) => {
        console.log("FileUploader onSuccess callback : ", info, options);
        const {dialogRef} = this.props;
        await dialogRef.onUploadSuccess(info);
        this.tryFinished(info, options)
    };


    onError = (info, options) => {
        console.log("FileUploader onError callback : ", info, options);
        this.tryFinished(info, options)
    };

    tryFinished = (info, infoList) => {
        const {dialogRef} = this.props;
        if (dialogRef.isFinished) {
            return;
        }
        const okDefer = dialogRef.okDefer;
        if (Array.isArray(infoList)) {
            let finishedCount = 0;
            for (let i = 0; i < infoList.length; i++) {
                const infoElement = infoList[i];
                const isSuccess = infoElement?.response?.success;
                if (infoElement.percent === 100 && isSuccess === true) {
                    finishedCount++;
                }
            }
            if (finishedCount === infoList.length) {
                dialogRef.isFinished = true;
                okDefer.resolve(true)
            }
        }
    }

    render() {
        const action = "http://127.0.0.1:7002";
        const uploadProps = this.props.uploadProps || {};
        return (
            <div style={{width: '600px'}}>
                <Upload.Dragger
                    action={action}
                    ref={this.saveUploaderRef}
                    listType="image"
                    beforeUpload={this.beforeUpload}
                    onProgress={this.onProgress}
                    onSuccess={this.onSuccess}
                    onError={this.onError}
                    multiple
                    useDataURL
                    onChange={(v)=>{}}
                    {...uploadProps}
                >
                    <div className="next-upload-drag">
                        <p className="next-upload-drag-icon">
                            <Icon type="upload"/>
                        </p>
                        <p className="next-upload-drag-text">
                            点击或者拖动文件到虚线框内上传
                        </p>
                        <p className="next-upload-drag-hint">
                            支持 docx, xlsx, PDF, PNG, JPG , txt 等类型的文件
                        </p>
                    </div>
                </Upload.Dragger>
            </div>
        );
    }
}



const showCreateDialog = (btnItem, actions, uploadProps) => {

    const onUploadSuccess = async (info) => {

    }


    const dialogRef = {
        isFinished: false,
        uploaderRef: null,
        onUploadSuccess: onUploadSuccess,
        okDefer: {}
    }

    const onOk = async ({formValues}) => {
        const uploaderRef = dialogRef.uploaderRef
        uploaderRef.startUpload();
        await new Promise((resolve, reject) => {
            dialogRef.okDefer.resolve = resolve;
            dialogRef.okDefer.reject = reject;
        });
        Message.success('保存成功')
        actions.updatePaginationProps({current: 1});
        actions.doQuery();
    }


    Dialog.show({
        title: '上传文件',
        content: (
            <FileUploader dialogRef={dialogRef} uploadProps={uploadProps}/>
        ),
        onOk
    });

}


export function DemoUpload(){
    return (
        <div>
            <Button onClick={()=>{showCreateDialog({},{})}}>listType="image"</Button>


            <Button onClick={()=>{
                showCreateDialog({},{},{
                    listType:'card'
                })
            }}>listType="card"</Button>


            <Button onClick={()=>{
                showCreateDialog({},{},{
                    listType:'text'
                })
            }}>listType="text"</Button>



        </div>
    );
}
