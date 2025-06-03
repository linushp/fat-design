
import {
    Upload
} from "../src/index";

const SimpleJSONUpload = Upload.SimpleJSONUpload

export default function DemoSimpleUpload(props) {
    return (
        <SimpleJSONUpload
            isPreview={true}
            isAutoStylePreview={true}
            value={'https://image.medstatistic.com/uploads/20250527/15052b1e96154620e8cb5f98ccd9754f.jpg'}
        />
    )
}