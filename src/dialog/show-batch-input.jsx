import {useEffect, useRef, useState} from 'react'
import {ComponentsStore} from "../util/comp";
import {assignDefault} from "../util/object";
import {str} from "../util";

function pickerIds(v) {
    if (!v) {
        return v
    }
    const array1 = v.split(/[\n\s,;]/gm)
    const array2 = array1.map((a) => {
        return a.trim()
    }).filter((a) => {
        return a.length > 0
    })
    return `${array2.join('\n')}`
}


function pickValidIdsArray(text, matchPattern) {
    if (!text) {
        return []
    }
    const arr = text.split('\n').map((t) => {
        return t.trim()
    }).filter((a) => {
        return a.length > 0 && matchPattern.test(a)
    })
    // 去重
    return [...new Set(arr)]
}


function BatchInputDialog({dialogRef}) {
    const {placeholder, matchPattern, countMessage, topTips} = dialogRef;

    const [editValue, setEditValue] = useState('')
    const pasteFlag = useRef(false)

    useEffect(() => {
        dialogRef.currentValue = editValue
    }, [editValue, dialogRef])

    const Input = ComponentsStore.getBuildIn('Input');

    const count = pickValidIdsArray(editValue, matchPattern).length;
    const countMsgText = str.template(countMessage, {count: `${count}`});

    return (
        <div style={{width: '500px'}}>
            {topTips}
            <Input.TextArea
                style={{width: '100%'}}
                rows={14}
                value={editValue}
                onPaste={() => {
                    pasteFlag.current = true
                }}
                placeholder={placeholder}
                onChange={(v, e) => {
                    if (pasteFlag.current) {
                        const str = pickerIds(v)
                        pasteFlag.current = false
                        setEditValue(str)
                    } else {
                        setEditValue(v)
                    }
                }}
            />
            <div style={{marginTop: '5px'}}>{countMsgText}</div>
        </div>
    )
}


const defaultConfig = {
    title: '批量输入ID',
    placeholder: '请输入多个ID；支持黏贴输入; ID只能是字母或数字; 多个ID请以换行分割',
    requiredMessage: '没有输入任何正确的ID',
    countMessage: '识别到 {count} 个不重复的ID',
    matchPattern: /^[0-9a-zA-Z]+$/
}

function buildShowBatchInput(show) {

    return (config) => {

        const Message = ComponentsStore.getBuildIn('Message');
        const {
            title,
            placeholder,
            requiredMessage,
            countMessage,
            matchPattern,
            topTips,
            onOk,
            ...otherConfig
        } = assignDefault(config, defaultConfig);

        const dialogRef = {currentValue: '', placeholder, matchPattern, countMessage, topTips}

        return show({
            title: title,
            content: (
                <BatchInputDialog dialogRef={dialogRef}/>
            ),
            onOk: () => {
                const {currentValue} = dialogRef
                const ids = pickValidIdsArray(currentValue, matchPattern)
                if (!ids || ids.length === 0) {
                    Message.error(requiredMessage)
                    return false
                }
                return onOk({value: currentValue, ids: ids});
            },
            ...otherConfig
        })
    }
}


export {
    buildShowBatchInput
}
