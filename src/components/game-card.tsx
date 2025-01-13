interface GameCardProps {
  img: string;
  title: string;
}

function GameCard({ img, title }: GameCardProps) {
  return (
    <div className='mx-auto max-w-xs cursor-pointer'>
      <div className='card aspect-[16/9] max-h-[230px] overflow-hidden rounded-lg shadow-lg'>
        <img
          className='card-image h-full w-full object-cover'
          src={img}
          alt='Game Image'
        />
        <div className='card-overlay bg-gray-900 bg-opacity-75'>
          <h1 className='text-2xl font-bold text-white'>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default GameCard;