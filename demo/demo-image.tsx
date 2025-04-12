import {Image} from '../src/index';

const imageSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imageSrc2 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
export function DemoImage() {
    return (
        <div>
            <h1>Image</h1>
            <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={imageSrc1} />
            <hr/>
            <h1>PreviewGroup</h1>
            <Image.PreviewGroup
                // icons={icons}
                preview={{
                    countRender: (current, total) => `第 ${current} 张 / 总共 ${total} 张`,
                    onChange: (current, prev) =>
                        console.log(`当前第${current}张，上一次第${prev === undefined ? '-' : prev}张`),
                }}
            >

                <Image wrapperStyle={{ marginRight: 24, width: 200 }}
                       src={imageSrc1} />

                <Image
                    wrapperStyle={{ marginRight: 24, width: 200 }}
                    preview={false}
                    src={imageSrc1}
                />

                <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={imageSrc2} />

                <Image wrapperStyle={{ marginRight: 24, width: 200 }}
                       src={imageSrc1}
                       preview={{src: imageSrc2}} />

                <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={imageSrc2} />
            </Image.PreviewGroup>
        </div>
    );
}
