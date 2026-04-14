import Button from './Button';

const Card = () => {

	return (
		<div className="bg-white p-4 w-60 rounded-2xl">
			<div>
				<img
					src="http://localhost:5173/public/assets/produtos/tenis.jpg"
				></img>
			</div>
			<div className="p-4">
				<div className="flex justify-center items-center mb-2">
					<h3>Name Product</h3>
				</div>
				<div className="flex justify-center items-center">
					<span>Valor do Produto</span>
				</div>
			</div>
			<Button>Adicionar no Carrinho</Button>
		</div>
	)
}

export default Card;