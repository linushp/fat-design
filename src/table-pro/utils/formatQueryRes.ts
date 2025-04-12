import {pickResArray, pickTotalCount} from "../../util/pick-res-data";




// 推荐使用：{data:[],total:999 }
function getDataSource(res) {
    // {data: []}
    const dataSource1 = pickResArray(res, null);
    if (Array.isArray(dataSource1)) {
        return dataSource1;
    }
    if (res && res.data) {
        return pickResArray(res.data, []);
    }
    return [];
}


// 推荐使用：{data:[],total:999 }
function getTotalCount(res) {
    const totalCount1 = pickTotalCount(res, null);
    if (typeof totalCount1 === 'number') {
        return totalCount1;
    }
    if (res && res.data) {
        return pickTotalCount(res.data, 0);
    }
    return 0
}


export default function formatQueryRes(res: any): any {

    if (!res || typeof res !== 'object') {
        return null;
    }

    if (!res.tableProps) {
        res.tableProps = {};
    }

    if (!res.paginationProps) {
        res.paginationProps = {};
    }


    if (!res.tableProps.dataSource) {
        res.tableProps.dataSource = getDataSource(res);
    }

    if (typeof res.paginationProps.total !== "number") {
        res.paginationProps.total = getTotalCount(res);
    }


    return res;
}

