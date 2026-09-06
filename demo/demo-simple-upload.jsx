
import {
    Upload,
    Button
} from "../src/index";

const SimpleJSONUpload = Upload.SimpleJSONUpload

const valueStr = JSON.stringify({
    imgURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg',
    downloadURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg',
});

const valueObj = {
    state:'done',
    name: 'xxx.jpg',
    thumbnailURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg',
    imgURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg',
    downloadURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg',
}

const valuePdgObj = {
    name:'xxx.pdf',
    downloadURL: 'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.pdf',
}


const valueArray = [valueObj, valueObj, valueObj];
const valueArrayStr = JSON.stringify([valueObj, valueObj, valueObj]);
const valuePdgObjArrayStr = JSON.stringify([valuePdgObj, valuePdgObj, valuePdgObj]);
const valuePdgObjArrayStr2 = JSON.stringify([valuePdgObj,valueObj, valuePdgObj, valueObj, valueObj]);


export default function DemoSimpleUpload(props) {


    return (
        <div style={{padding:'20px'}}>
            <h5>单个图片：字符串形式</h5>
            <SimpleJSONUpload
                isPreview={true}
                value={'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg'}
            />
            <hr/>

            <h5>单个图片：JSON字符串形式</h5>
            <SimpleJSONUpload
                isPreview={true}
                value={valueStr}
            />
            <hr/>

            <h5>单个图片：对象形式</h5>
            <SimpleJSONUpload
                isPreview={true}
                value={valueObj}
            />


            <h5>多个个图片：对象数组形式：previewMode={'auto'}</h5>
            <SimpleJSONUpload
                listType="image"
                isPreview={true}
                previewMode={'auto'}
                value={valueArray}
            />

            <h5>多个个图片：对象数组JSON字符串形式： 只读</h5>
            <SimpleJSONUpload
                isPreview={true}
                value={valueArrayStr}
            />

            <h5>多个图片：对象数组JSON字符串形式： 可上传</h5>
            <SimpleJSONUpload
                isPreview={false}
                accept={'image/*'}
                value={valueArrayStr}
                listType="image"
            >
                <Button type="primary" style={{ margin: '0 0 10px' }}>
                    Upload File
                </Button>
            </SimpleJSONUpload>


            <h5>多个普通文件：对象数组JSON字符串形式： 只读</h5>
            <SimpleJSONUpload
                previewMode={'auto'}
                isPreview={true}
                value={valuePdgObjArrayStr}
            />


            <h5>多个普通文件：对象数组JSON字符串形式： 只读  previewMode={'auto'}</h5>
            <SimpleJSONUpload
                previewMode={'auto'}
                isPreview={true}
                value={valuePdgObjArrayStr2}
            />

            <h5>多个普通文件：对象数组JSON字符串形式： 只读  previewMode={'download'}</h5>
            <SimpleJSONUpload
                previewMode={'download'}
                isPreview={true}
                value={valuePdgObjArrayStr2}
            />


            <h5>多个普通文件：对象数组JSON字符串形式： 只读  previewMode={'image'}</h5>
            <SimpleJSONUpload
                previewMode={'image'}
                isPreview={true}
                value={valuePdgObjArrayStr2}
            />

            <h5>多个普通文件：对象数组JSON字符串形式： 只读  previewMode={'auto-list'}</h5>
            <SimpleJSONUpload
                previewMode={'auto-list'}
                isPreview={true}
                value={valuePdgObjArrayStr2}
            />


        </div>

    )
}