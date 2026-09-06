import {useState} from 'react'
import {
    Button,
    PageCard,
    PopConfirm,
    Message,
    Box,
    Notification,
    BalloonConfirm,
    Loading,
    Balloon,
    Icon,
    BatchInput
} from "../src/index";


function DemoBatchInput() {

    const [value, setValue]= useState("");
    const [value1, setValue1]= useState("");
    const [value2, setValue2]= useState("");

    return (
        <PageCard>

            <div style={{width: '300px'}}>
                openChineseInput= true

                <BatchInput value={value} onChange={(e) => setValue(e)} openChineseInput={true} composition={false}/>
            </div>

            <div style={{width: '300px', marginTop: '100px'}}>
                openChineseInput= false
                <BatchInput value={value1} onChange={(e) => setValue1(e)} openChineseInput={false} composition={false}/>
            </div>


            <div style={{width: '300px', marginTop: '100px'}}>
                Native Input
                <input value={value2} onChange={(e) => setValue2(e.target.value)} />
            </div>
        </PageCard>
    )
}

export {
    DemoBatchInput
}
