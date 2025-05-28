import { T_Product } from "@/lib/Api/api";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";

const ProductCard: FC<{ product: T_Product }> = ({ product }) => {
  return (
    <Card className="w-64  shadow-none border-none hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <CardContent className="px-0 py-5 ">
        <div className="relative">
          <Image
            height={200}
            width={256}
            src={product.listingAttachments[0].attachment}
            alt="product"
            className="rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <div className="font-[500]">{product.title}</div>
          <div className="flex text-sm font-[500] items-center">
            <BadgeDollarSign size={16} color="green" /> {product.pricePerUnit} /{" "}
            {product.unit}
          </div>
        </div>
        <div className="text-sm text-slate-600 break-words">
          {product.description}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
