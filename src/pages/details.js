import Link from 'next/link';

export default function details({productList}) {

return (

    <div>
    {productList.map((e,index) => (


        <div key={index}>

        <Link as={`${e.id}/${e.title}`} href="/[products]/[product-details]">

        <a>
        Navigate to{e.title}'s {e.products}
        </a>
        </Link>
        </div>
    ))}
    </div>

);
}

details.getInitialProps = async() => {
    const response = await fetch('http://localhost:8001/products');
    const productList = await response.json();

    return {productList: productList}
}