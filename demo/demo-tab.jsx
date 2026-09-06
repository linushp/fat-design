import * as React from 'react';
import { Tab, Button } from '../src/libs';

function handleChange(key) {
    console.log(key);
}

function handleClick() {
    console.log('hello world');
}

const extraContent = (
    <Button type="primary" onClick={handleClick}>
        Hello world
    </Button>
);


const DemoTab = () => {
    return <div style={{marginLeft: '100px', paddingTop: '100px'}}>
        <div className="demo-item-title">Extra in Horizontal</div>
        {/*<Tab shape="wrapped" onChange={handleChange} extra={extraContent}>*/}
        {/*    <Tab.Item title="Tab 1" key="1">*/}
        {/*        Tab 1 Content*/}
        {/*    </Tab.Item>*/}
        {/*    <Tab.Item title="Tab 2" key="2">*/}
        {/*        Tab 2 Content*/}
        {/*    </Tab.Item>*/}
        {/*    <Tab.Item title="Tab 3" key="3">*/}
        {/*        Tab 3 Content*/}
        {/*    </Tab.Item>*/}
        {/*</Tab>*/}

        <div className="demo-item-title" style={{marginBottom:'100px'}}>Extra in Vertical</div>
        <div style={{paddingTop: '0', border: '1px solid #1c1f2314'}}>
            <Tab
                shape="shape_line"
                tabPosition="left"
                onChange={handleChange}
                // extra={extraContent}
                contentClassName="custom-tab-content"
            >
                <Tab.Item title="Tab 1111 " key="1">
                    Tab 1 Content
                </Tab.Item>
                <Tab.Item title="Tab 2222" key="2">
                    Tab 2 Content
                </Tab.Item>
                <Tab.Item title="Tab 3333" key="3">
                    Tab 3 Content
                </Tab.Item>
            </Tab>
        </div>


        <div className="demo-item-title" style={{marginBottom:'100px'}}></div>
        <Tab
            shape="wrapped"
            tabPosition="left"
            onChange={handleChange}
            // extra={extraContent}
            contentClassName="custom-tab-content"
        >
            <Tab.Item title="Tab 1" key="1">
                Tab 1 Content
            </Tab.Item>
            <Tab.Item title="Tab 2" key="2">
                Tab 2 Content
            </Tab.Item>
            <Tab.Item title="Tab 3" key="3">
                Tab 3 Content
            </Tab.Item>
        </Tab>
        <div className="demo-item-title" style={{marginBottom:'100px'}}></div>
    </div>;
};

export {
    DemoTab
}