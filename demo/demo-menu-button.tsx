import {MenuButton, Menu, PageCard, Box, Button, Drawer} from "../src/index";


const { Item } = MenuButton;


const menu = ["Undo", "Redo", "Cut", "Copy", "Paste"].map(item => (
    <Item key={item}>{item}</Item>
));

export function DemoMenuButton(){

    const menuChildren = (
        <>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item disabled key="2">
                Disabled option 2
            </Menu.Item>
            <Menu.Item key="3" helper="CTRL+P">
                Option 3
            </Menu.Item>
            <Menu.Item disabled key="4">
                <a href="https://www.taobao.com/" target="__blank">
                    Disabled Option Link
                </a>
            </Menu.Item>
            <Menu.Item key="5">
                <a href="https://www.taobao.com/" target="__blank">
                    Option Link
                </a>
            </Menu.Item>
        </>
    );

    return (
        <PageCard>
            Menu
            <Box direction="row" spacing={20}>

                <MenuButton text label="Document Edit">
                    {menu}
                </MenuButton>

                <Button onClick={(e:any) => {
                    e.preventDefault();

                    const target = e.target;
                    const { top, left } = target.getBoundingClientRect();

                    Menu.create({
                        target: e.target,
                        offset: [e.clientX - left, e.clientY - top],
                        defaultOpenKeys:"sub-menu",
                        children: menuChildren
                    });
                }}>
                    Create
                </Button>


            </Box>
        </PageCard>

    )
}
