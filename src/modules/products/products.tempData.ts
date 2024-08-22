export type Product = {
    id?:string 

name: string

description: string

price: number

stock: boolean

imgUrl: string
}

export const products: Product[] = [
    {
        id: "c22f17c6-0122-4a2a-a9b7-bbefb46ab2b1",
        name: "Product One",
        description: "Description of Product One",
        price: 19.99,
        stock: true,
        imgUrl: "https://example.com/product1.jpg"
    },
    {
        id: "c22f17c6-0122-4a2a-a9b7-bbefb46ab2b2",
        name: "Product Two",
        description: "Description of Product Two",
        price: 29.99,
        stock: false,
        imgUrl: "https://example.com/product2.jpg"
    },
    {
        id: "c22f17c6-0122-4a2a-a9b7-bbefb46ab2b3",
        name: "Product Three",
        description: "Description of Product Three",
        price: 39.99,
        stock: true,
        imgUrl: "https://example.com/product3.jpg"
    },
    {
        id: "c22f17c6-0122-4a2a-a9b7-bbefb46ab2b4",
        name: "Product Four",
        description: "Description of Product Four",
        price: 49.99,
        stock: false,
        imgUrl: "https://example.com/product4.jpg"
    },
    {
        id: "c22f17c6-0122-4a2a-a9b7-bbefb46ab2b5",
        name: "Product Five",
        description: "Description of Product Five",
        price: 59.99,
        stock: true,
        imgUrl: "https://example.com/product5.jpg"
    }
];