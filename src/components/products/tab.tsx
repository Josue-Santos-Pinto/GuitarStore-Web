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
            title: 'Encordoamentos',
            value: 'string',
            products: products.filter(item => item.category === 'string')
        },
        {
            title: 'Cabos',
            value: 'cable',
            products: products.filter(item => item.category === 'cable')
        },
        {
            title: 'Pedais',
            value: 'pedal',
            products: products.filter(item => item.category === 'pedal')
        },
        {
            title: 'Afinadores',
            value: 'tuner',
            products: products.filter(item => item.category === 'tuner')
        }
    ]

    return (
        <Tabs defaultValue="string">      
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