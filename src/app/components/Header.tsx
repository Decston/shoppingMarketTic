import { type ProductProps } from '../interfaces/Product';
import Input from './Input';
import { useQuery } from 'react-query';
import ProductService from '../services/product.service';
import { useRef, useState, type ChangeEvent } from 'react';
import { debounce } from 'lodash';
import List from './List';
import { useOnClickOutside } from '../hooks/useClickOutside';

const Header = () => {
	const [productName, setProductName] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const refDropdown = useRef<HTMLUListElement>(null!);

	const {
		data: productsByName,
		isLoading,
		error 
	} = useQuery<ProductProps[],Error>(
		["query-products-by-name", productName],
		async () => {
			return await ProductService.SearchName(productName);
		},{
			enabled: productName.length > 0,
			onSuccess: (res) => {
				setIsOpen(res?.length > 0);
			}
		}
  );

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setProductName(value);
	}

	useOnClickOutside(refDropdown, () => {
		setIsOpen(false);
	})

	const debounceHandleOnChange = debounce(handleInput, 500);

	return (
		<header className="flex fixed justify-center top-0 right-0 w-full bg-white py-3">
			<div className="mx-auto flex items-center justify-between w-11/12 gap-52">
				<div>
					<a href="/">
						<img
							src="http://localhost:5173/public/assets/logo.png"
							alt="Company Logo"
							className="max-w-36"
						></img>
					</a>
				</div>
				<div className="w-4/5 relative">
					<Input onChange={debounceHandleOnChange}/>
					{isOpen &&
						<ul 
							ref={refDropdown}
						 	className='absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4 shadow-lg'
						>
							{productsByName?.map((product: ProductProps) => {
								return (
									<List className='items-center justify-between'>
										{product.name} 
										<div>
											<img
												src={`http://localhost:5173/public/assets/produtos/${product.image}.jpg`}
												className='h20 rounded-t-lg object-cover'
											></img>
											<span>R$ {product.price}</span>
										</div>
									</List>
								);
							})}
						</ul>
					}
				</div>
				<div>Carrinho</div>
			</div>
		</header>
	);
};

export default Header;