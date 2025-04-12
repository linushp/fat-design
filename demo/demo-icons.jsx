
import ReactDOM from 'react-dom';
import { Message, Icon } from "../src/index";

const types = [
    'smile',
    'cry',
    'success',
    'warning',
    'prompt',
    'error',
    'help',
    'clock',
    'success-filling',
    'delete-filling',
    'favorites-filling',
    'add',
    'minus',
    'arrow-up',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'arrow-double-left',
    'arrow-double-right',
    'switch',
    'sorting',
    'descending',
    'ascending',
    'select',
    'semi-select',
    'loading',
    'search',
    'close',
    'ellipsis',
    'picture',
    'calendar',
    'ashbin',
    'upload',
    'download',
    'set',
    'edit',
    'refresh',
    'filter',
    'attachment',
    'account',
    'email',
    'atm',
    'copy',
    'exit',
    'eye',
    'eye-close',
    'toggle-left',
    'toggle-right',
    'lock',
    'unlock',
    'chart-pie',
    'chart-bar',
    'form',
    'detail',
    'list',
    'dashboard',
];


export default function DemoIcons(){
    return (
        <div>
            <ul className="icon-list">
                {types.map((type, index) => (
                    <li>
                        <Icon type={type} size="xl" />
                        <span>{type}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
