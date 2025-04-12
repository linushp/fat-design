import {DialogDoc1} from "./dialog-doc1.js";
import {
    DocPage,
    DocSection,
    DocCard,
    DocText,
    DocCode,
    DocApi,
} from '../../doc-utils/DocUtils.js'

function DialogDoc(){
    return (
        <DocPage title={'Dialog'}>

            <DocSection title={'代码演示'}>
                <DocCard title={'基本用法'} >
                    <DocText> `Dialog` 提供 `alert` 和 `confirm` 的快掉调用方式，以及更底层的 `show` 方式。</DocText>
                    <DocCode component={DialogDoc1} path={'@/doc/comp-docs/dialog-doc/dialog-doc1.jsx'}/>
                </DocCard>
                <DocCard title={'快捷调用'} >
                    <DocText> `Dialog` 提供 `alert` 和 `confirm` 的快掉调用方式，以及更底层的 `show` 方式。</DocText>
                    <DocCode component={DialogDoc2} path={'@/doc/comp-docs/dialog-doc/dialog-doc2.jsx'}/>
                </DocCard>
            </DocSection>

            <DocSection title={'API'}>
                <DocApi src={'@/doc/comp-docs/dialog-doc/dialog-api.md'}/>
            </DocSection>

        </DocPage>
    );
}
export {
    DialogDoc
}
