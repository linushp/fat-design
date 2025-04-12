import {Filter, PageCard} from "../src/index";
import filter from "../src/filter";


const filters = [
    {
        label: "全部",
        value: "ALL",
        count: 9999
    },
    {
        label: "电视",
        value: "tv",
        count: 11
    },
    {
        label: "冰箱",
        value: "bx",
        count: 12
    }
];

export function DemoFilter(){
    return (
        <PageCard >
            <Filter dataSource={filters} defaultValue={'ALL'}/>
        </PageCard>
    )
}
