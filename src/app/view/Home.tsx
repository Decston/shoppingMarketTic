import { useState } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card"
import ProductService from "../services/product.service"; 
import { type ProductProps } from "../interfaces/Product";
import Button from "../components/Button";
import List from "../components/List";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const menuListVariants = tv({
	variants: {
		variant: {
			menuList: "absolute z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg"
		}
	}
})

const Home = () => {
	const [typeFilter, setTypeFilter] = useState("");
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const listOptionsFilter = [
		{
		value: "desc",
		name: "Maior Preço",
		class: "flex justify-center w-full"
		},
		{
		value: "asc",
		name: "Menor Preço",
		class: "flex justify-center w-full"
		}
	];

	const {
		data: products,
		error,
		isLoading
	} = useQuery<ProductProps[], Error>({
		queryKey: ["query-products", typeFilter],
		queryFn: () => ProductService.findAll(typeFilter),
	} as any);

	const handleFilter = (value: string) => {
		setTypeFilter(value);
	};

	const handleFilterButton = () => {
		setIsOpenMenu(!isOpenMenu);
	}

	const menuListClass = twMerge(
		menuListVariants(), 
		isOpenMenu ? 
		"flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44" 
		: "hidden",
	);

	return (
		<div className="mt-32 h-4/5 w-full flex flex-col items-center justify-center gap-16">
			
			<div className="flex w-4/5 flex-col items-end">
				<Button className="w-24" onClick={() => handleFilterButton()}>Filtro</Button>
				<ul className={menuListClass}>
					{listOptionsFilter.map((item) => {
						return (
							<List 
								key={item.name}
								className={item.class} 
								onClick={(e) => {e.stopPropagation(); handleFilter(item.value)}}
							>
								{item.name}
							</List>
						)
					})}
				</ul>
			</div>
			
			<div className="grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
				{Array.isArray(products) && products.map((product: ProductProps) => (
						<div >
							<Card key={product.id} item={product} />
						</div>
				))}
			</div>
		</div>
	);
};

export default Home;