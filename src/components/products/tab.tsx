import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllProducts } from "@/services/product"
import { Product } from "@/types/product";
import { ProductEmpty } from "@/components/products/empty";
import { ProductItem } from "./item";

type Tab = {
    title: string;
    value: string;
    products: Product[]
}

export const ProductsTab = async () => {

    const products = await getAllProducts()

    const tabs: Tab[] = [
        {
            title: 'Guitarras',
            value: 'guitar',
            products: products.filter(item => item.category === 'guitar')
        },
        {
            title: 'Baterias',
            value: 'drum',
            products: products.filter(item => item.category === 'drum')
        },
        {
            title: 'Baixos',
            value: 'bass',
            products: products.filter(item => item.category === 'bass')
        },
        {
            title: 'Cordas',
            value: 'strings',
            products: products.filter(item => item.category === 'strings')
        }
    ]

    return (
        <Tabs defaultValue="guitar">
            <TabsList className="flex">
                {tabs.map( item => (
                    <TabsTrigger key={item.value} value={item.value} className="flex-1" >{item.title}</TabsTrigger>
                ))}
            </TabsList>

                {tabs.map((item)=>(
                    <TabsContent key={item.value} value={item.value} className="mt-6">
                        {item.products.length > 0 &&
                            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                {item.products.map((product)=>(
                                    <ProductItem key={product.id} item={product} />
                                ))}
                            </div>
                        }
                        {item.products.length === 0 && <ProductEmpty />}
                    </TabsContent>
                ))}
        </Tabs>
    )
}