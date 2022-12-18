
export default function Footer({userName, caption}) {
    return (
        <div className="flex flex-row gap-1">
            <p className="font-bold">{userName}</p>
            <p>{caption}</p>
        </div>
    )
}