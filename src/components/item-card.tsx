import { FaEdit } from "react-icons/fa";
import { Button } from "./ui/button";

interface ItemCardProps {
    picture: string;
    name: string;
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <div className='border p-2'>
      <img src={props.picture} alt={props.name} className='w-full h-20 object-scale-down' />
      <div className='flex justify-between items-center mt-'>
        <h3 className='text-sm font-bold'>{props.name}</h3>
        <Button className='mt-2 flex justify-center items-center bg-transparent hover:bg-transparent' size='icon'>
          <FaEdit className='text-primary' />
        </Button>
      </div>
    </div>
  );
}
