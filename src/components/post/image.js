
export default function Image({imageSource, caption}) {

    const image = require(`../../assets/images/${imageSource.split('/').pop()}`)

    return (
        <img src={image} alt={caption} className="max-h-fit"/>
    )
}