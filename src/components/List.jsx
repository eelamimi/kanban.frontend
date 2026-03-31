import { Link } from 'react-router'

const List = ({
    items,
    getKey,
    toLink,
    itemName,
    itemSubName
}) => {
    return (
        <div className='list'>
            {items && items.map((item) => (
                <div key={getKey ? getKey(item) : item.id} className='list-item'>
                    <Link
                        className='item-name'
                        to={toLink && toLink(item)}
                    >
                        {itemName && itemName(item)}
                    </Link>
                    <div className='item-sub-name'>
                        {itemSubName && itemSubName(item)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List